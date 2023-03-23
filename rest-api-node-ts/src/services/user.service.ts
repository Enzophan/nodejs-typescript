import _ from 'lodash';
import { FilterQuery } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

interface ICreateUserInput {
    email: UserDocument['email'];
    firstname: UserDocument['firstname'];
    lastname: UserDocument['lastname'];
    password: UserDocument['password'];
}

export async function createUser(input: ICreateUserInput) {
    try {
        return await UserModel.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({ email });
    if (!user) return false;

    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    return _.omit(user.toJSON(), "password")
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean();
}