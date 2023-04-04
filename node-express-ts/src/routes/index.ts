import { Express, Request, Response, NextFunction } from 'express'
import { middleware } from '../middleware';
import { getBook } from '../controllers/books.controller'
import todosRouter from './todos.route';
import usersRouter from './users.route'

const routes = (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
        return res.send('Hello')
    })

    app.use('/api/v1/todos', todosRouter);
    app.use('/api/v1/users', usersRouter);

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