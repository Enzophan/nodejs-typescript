import { Request, Response } from 'express';
import config from 'config';
import { createSession, findSession, updateSession } from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';


export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate the user's password
    const user = await validatePassword(req.body)
    if (!user) return res.status(401).send({ errorCode: 401, errorMessage: 'Invalid email or password' })

    //Create session
    const session = await createSession(user._id, req.get("user-agent") || "")

    //Create token
    const accessToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('accessTokenTtl') });
    const refreshToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('refreshTokenTtl') });

    // return tokens
    return res.send({ accessToken, refreshToken })
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;

    const sessions = await findSession({ user: userId, valid: true });

    return res.send({ data: sessions })
}


export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}