import axios from "axios";
import { API_SERVER_URL, SERVER_URL } from "./public-config";

export const fetchContestList = async () => {
  const resp = await axios.get(`${API_SERVER_URL}/contests`);
  return resp.data.contests;
};

export const addNewContest = async ({
  contestName,
  categoryName,
  url,
  thumbnailUrl,
  description,
}) => {
  const resp = await axios.post(`${API_SERVER_URL}/contests`, {
    contestName,
    categoryName,
    url,
    thumbnailUrl,
    description,
  });

  return resp.data.contests;
};

export const fetchContest = async (id) => {
  const resp = await axios.get(
    `${API_SERVER_URL}/contest/${id}`
  );
  return resp.data.contest;
};

export const deleteContest = async (id) => {
  const resp = await axios.delete(
    `${API_SERVER_URL}/contest/${id}`
  );
  return resp.data.contest;
};

export const addNewNameToContest = async ({
  id,
  newNameValue,
}) => {
  const resp = await axios.post(
    `${API_SERVER_URL}/contest/${id}`,
    { newNameValue }
  );
  return resp.data.contest;
};

export const STREAM_URL = `${SERVER_URL}/stream`;

export const ssEvents =
  typeof window !== "undefined" &&
  new EventSource(STREAM_URL, {
    withCredentials: true,
  });
