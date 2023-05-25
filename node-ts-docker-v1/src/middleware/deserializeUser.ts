import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import AuthService from "../services/auth.service";
import { verifyJwt } from "../utils/jwt.util";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh", "").toString();

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const { access_token } = await AuthService.reGenerateAccessToken({
      refreshToken,
    });

    if (access_token) {
      res.setHeader("x-access-token", access_token);
    }
    const result = verifyJwt(access_token as string);
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
