import { safeParse } from "valibot";
import { connectClient } from "../db";
import {
  ContestFindByIdSchema,
  ContestSchema,
  ContestUpdateNameSchema,
} from "../validation/contest";
import { sse } from "../sse";

export const getAllContests = async (req, res) => {
  try {
    const client = await connectClient();
    const contests = await client
      .collection("contests")
      .find()
      .sort({ timestamp: -1 })
      .project({
        id: 1,
        categoryName: 1,
        contestName: 1,
        _id: 0,
      })
      .toArray();

    res.send({ contests });
  } catch (error) {
    res.status(404).send({ error, contests: [] });
  }
};

export const createContest = async (req, res) => {
  const client = await connectClient();
  const {
    contestName,
    categoryName,
    url,
    thumbnailUrl,
    description,
  } = req.body;

  const validateResult = safeParse(ContestSchema, req.body);

  if (!validateResult.success) {
    return res.status(400).send({ reason: validateResult });
  }

  const contestId = contestName
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s/g, "-");

  const contest = await client
    .collection("contests")
    .findOne({ id: contestId });

  if (contest) {
    return res
      .status(400)
      .send({ message: "Contest already exists" });
  }

  const result = await client.collection("contests").insertOne({
    id: contestId,
    contestName,
    categoryName,
    url,
    thumbnailUrl,
    description,
    names: [],
    timestamp: new Date(),
  });

  if (!result) {
    return res
      .status(400)
      .send({ message: "Something went wrong!" });
  }

  const contests = await client
    .collection("contests")
    .find()
    .sort({ timestamp: -1 })
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
      _id: 0,
    })
    .toArray();

  // Send to SSE
  console.log("SSE ", contests[0]);
  sse.send(contests[0], "contest");
  res.send({ contests });
};

export const getContestById = async (req, res) => {
  const client = await connectClient();

  const validateResult = safeParse(
    ContestFindByIdSchema,
    req.params
  );
  if (!validateResult.success) {
    return res.status(400).send({ reason: validateResult });
  }

  const contest = await client
    .collection("contests")
    .findOne({ id: req.params.contestId });

  return res.send({ contest });
};

export const updateContest = async (req, res) => {
  const client = await connectClient();
  const validateParams = safeParse(
    ContestFindByIdSchema,
    req.params
  );
  if (!validateParams.success) {
    return res.status(400).send({ reason: validateParams });
  }

  const validateBody = safeParse(
    ContestUpdateNameSchema,
    req.body
  );
  if (!validateBody.success) {
    return res.status(400).send({ reason: validateBody });
  }

  const { newNameValue } = req.body;
  const doc = await client
    .collection("contests")
    .findOneAndUpdate(
      { id: req.params.contestId },
      {
        $push: {
          names: {
            id: newNameValue.toLowerCase().replace(/\s/g, "-"),
            name: newNameValue,
            timestamp: new Date(),
          },
        },
      },
      {
        returnDocument: "after",
      }
    );

  // Send to SSE
  console.log("SSE ", doc.value);
  sse.send(doc.value, "contest_reaction");

  return res.send({ contest: doc.value });
};

export const deleteContest = async (req, res) => {
  const client = await connectClient();
  const validateParams = safeParse(
    ContestFindByIdSchema,
    req.params
  );
  if (!validateParams.success) {
    return res.status(400).send({ reason: validateParams });
  }
  const doc = await client
    .collection("contests")
    .findOneAndDelete({
      id: req.params.contestId,
    });

  //SSE
  const contestName = doc.value.contestName || "";
  const notify = `${contestName} has been deleted`;
  sse.send({ message: notify }, `notification_admin`);

  return res.send({ contest: doc.value });
};
