import { Request, Response, NextFunction } from "express";

const requiredUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).send({ message: "You are not logged in" });
  }
  return next();
};

export default requiredUser;
