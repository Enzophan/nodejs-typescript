import { Express, Request, Response, NextFunction } from 'express'
import { middleware } from '../middleware';
import { getBook } from '../controllers/books.controller'
import todosRouter from './todos.route'

const routes = (app: Express) => {
    app.use('/api/v1', todosRouter)

    app.get('/', (req: Request, res: Response) => {
        return res.send('Hello')
    })

    app.post('/api/data', (req: Request, res: Response) => {
        console.log("Req", req.body)
        return res.sendStatus(200)
    })

    app.all('/api/all', (req: Request, res: Response) => {
        return res.sendStatus(200)
    })

    app.get('/api/books/:bookId/:authorId', [middleware], getBook)

    app.get('/error', async (req: Request, res: Response) => {
        try {
            await throwError()
            return res.sendStatus(200)
        } catch (error) {
            return res.status(400).send("Somthing went wrong!")
        }
    })


}


//Handle Error
async function throwError() {
    throw new Error('Boom!')
}

export default routes