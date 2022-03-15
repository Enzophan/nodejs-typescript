import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'


export const middleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.name = 'Kent'
    next()
}

export const middlewareGlobal = ({ role }: { role: string }) => (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.role = role;
    next()
}

export const handleValidationError = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json(error.array()[0]);
    }
    next();
}