import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import _ from "lodash";
import User, { IUser } from "../models/User";

interface ICreateUserInput {
  email: IUser["email"];
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  password: IUser["password"];
}

async function findUser(
  query: FilterQuery<IUser>,
  options: QueryOptions = { lean: true }
) {
  return User.findOne(query, { password: 0, __v: 0 }, options);
}

async function getAllUsers(): Promise<IUser[]> {
  return User.find({}, { password: 0, __v: 0 })
    .then((data: IUser[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function createUser({
  email,
  firstName,
  lastName,
  password,
}: ICreateUserInput): Promise<IUser> {
  return User.create({ email, firstName, lastName, password })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });  
}

async function updateUser(
  query: FilterQuery<IUser>,
  update: UpdateQuery<IUser>,
  options: QueryOptions = { lean: true }
) {
  return User.findOneAndUpdate(query, update, options);
}

async function deleteUser(query: FilterQuery<IUser>) {
  return User.deleteOne(query);
}

async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return _.omit(user.toJSON(), "password");
}

export default {
  findUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  validatePassword,
};
