import { Express, Request, Response, NextFunction } from 'express'


export const getBook = (req: Request, res: Response, next: NextFunction) => {
    console.log('Req.params: ', req.params)
    // @ts-ignore
    console.log('Req.role: ', req.role)
    // @ts-ignore
    console.log('Req.name: ', req.name)
    // @ts-ignore
    let response = { ...req.params, name: req.name, role: req.role }
    return res.send(response)
}


