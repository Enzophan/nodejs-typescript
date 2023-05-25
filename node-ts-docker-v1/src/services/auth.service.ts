import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import _ from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt.util";
import Session, { ISession } from "../models/Session";
import UserService from "./user.service";

interface ISessionInput {
  userId: ISession["userId"];
  access_token: ISession["access_token"];
  refresh_token: ISession["refresh_token"];
  userAgent: ISession["userAgent"];
}

interface IToken {
  access_token: ISession["access_token"];
  refresh_token: ISession["refresh_token"];
}

async function createToken(userId: string): Promise<IToken> {
  // Create Token
  const accessToken = signJwt(
    { _id: userId },
    // { expiresIn: "5m" }
    { expiresIn: `${process.env["EXP_MIN_ACCESS"]}m` }
  );
  const newRefreshToken = signJwt(
    { _id: userId },
    { expiresIn: `${process.env["EXP_DATE_REFRESH"]} days` }
  );

  return {
    access_token: accessToken,
    refresh_token: newRefreshToken,
  };
}

async function findSession(
  query: FilterQuery<ISession>,
  options: QueryOptions = { lean: true }
) {
  return Session.findOne(query, {}, options);
}

async function createSession(input: ISessionInput) {
  return Session.create(input)
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function reGenerateAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<any> {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !_.get(decoded, "_id")) {
    return false;
  }

  const session = await Session.findOne({
    userId: _.get(decoded, "_id"),
    refresh_token: refreshToken,
  });
  if (!session || session.isExpired) {
    return false;
  }

  const user = await UserService.findUser({ _id: session.userId.toString() });
  if (!user) {
    return false;
  }

  const token = await createToken(user._id);

  await updateSession(
    { _id: session._id },
    { access_token: token.access_token, refresh_token: token.refresh_token }
  );

  return {
    access_token: token.access_token,
    refresh_token: token.refresh_token,
  };
}

async function updateSession(
  query: FilterQuery<ISession>,
  update: UpdateQuery<ISession>
) {
  return Session.updateOne(query, update);
}

export default {
  createToken,
  findSession,
  createSession,
  reGenerateAccessToken,
  updateSession,
};
