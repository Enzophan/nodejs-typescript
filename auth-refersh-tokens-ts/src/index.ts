import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import "reflect-metadata";
import { createConnection } from 'typeorm'
import { routes } from './routes';

createConnection().then((connection) => {
    const app = express();

    app.use(express.json())
    app.use(cookieParser())


    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true
    }))

    routes(app);

    app.listen(8000, () => {
        console.log('listening to port 8000')
    })
}).catch(error => console.log(error));