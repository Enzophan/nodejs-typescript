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