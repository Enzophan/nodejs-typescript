import User, { IUser } from '../models/users.model';

interface ICreateUserInput {
    email: IUser['email'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
}

async function CreateUser({
    email,
    firstName,
    lastName
}: ICreateUserInput): Promise<IUser> {
    return User.create({
        email,
        firstName,
        lastName
    }).then((data: IUser) => {
        return data
    }).catch((error: Error) => {
        throw error
    })
}

async function GetUsers(): Promise<IUser[]> {
    return User.find()
        .then((data: IUser[]) => {
            return data
        }).catch((error: Error) => {
            throw error
        })
}

export default {
    CreateUser,
    GetUsers
}