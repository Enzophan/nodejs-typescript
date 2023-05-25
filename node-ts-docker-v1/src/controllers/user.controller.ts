import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    let userId = req.params.id;
    if (!userId) {
      userId = res.locals.user?._id;
    };
    const foundUser = await UserService.findUser({ _id: userId });
    if (!foundUser) return res.status(404).json({ message: "Not found" });
    return res.send({ user: foundUser });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    next();
  }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getAllUsers();
    return res.send({ users });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    next();
  }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    return res.send({ user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    next();
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;
    const update = req.body;

    const foundUser = await UserService.findUser({ _id: userId });
    if (!foundUser) return res.status(404).json({ message: "Not found" });

    const user = await UserService.updateUser({ _id: userId }, update, {
      new: true,
    });
    return res.send({ user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    next();
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;
    const foundUser = await UserService.findUser({ _id: userId });
    if (!foundUser) return res.status(404).json({ message: "Not found" });

    await UserService.deleteUser({ _id: userId });
    return res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    next();
  }
}

async function ResetPassword(req: Request, res: Response, next: NextFunction) {}

export default {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
