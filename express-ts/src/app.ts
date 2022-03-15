import express, { NextFunction, Request, Response } from 'express';
import db from './config/database.config'
import routes from './routes';

import { middlewareGlobal } from './middleware';

// db.authenticate()

db.sync().then(() => {
    console.log("Connect to DB")
})

const app = express();

const port = process.env.PORT || 8000

app.use(express.json())

// app.use(express.urlencoded({ extended: true }))


app.use(middlewareGlobal({ role: 'admin' }))

routes(app)

app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})