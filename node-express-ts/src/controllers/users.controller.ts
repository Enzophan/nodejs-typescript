import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users.service';


async function CreateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserService.CreateUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        return res.send({ user });
    } catch (error) {
        next();
    }
}

async function GetUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UserService.GetUsers();
        return res.send({ users });
    } catch (error) {
        next();
    }
}

export default {
    CreateUser,
    GetUsers
}