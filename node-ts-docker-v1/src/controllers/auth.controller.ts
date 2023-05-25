import { Request, Response, NextFunction } from "express";
import { signJwt } from "../utils/jwt.util";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.validatePassword(req.body);
    if (!user)
      return res.status(401).send({ message: "Invalid email or password" });

    const token = await AuthService.createToken(user._id);

    const session = await AuthService.createSession({
      userId: user._id,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      userAgent: req.get("user-agent") || "",
    });

    return res.send({ auth: session, user });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
    next();
  }
}

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.body;
    const foundUser = await UserService.findUser({ email: query.email });
    if (foundUser) return res.status(404).send({ message: "Email is existed" });

    const user = await UserService.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    return res.send({ user });
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
    next();
  }
}

async function Refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await AuthService.reGenerateAccessToken({
      refreshToken: req.body.refresh_token,
    });
    return res.send({ auth: session });
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
    next();
  }
}

async function ResetPassword(req: Request, res: Response, next: NextFunction) {}

async function ForgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export default {
  Login,
  Register,
  Refresh,
};
