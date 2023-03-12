import express, { Express, NextFunction, Request, Response } from 'express';
import db from './config/database.config'
import routes from './routes';
import mongoConnect from './config/mongo.connect';

import { middlewareGlobal } from './middleware';

// db.authenticate()

db.sync().then(() => {
    console.log("Connected to SQLite DB")
})

const app: Express = express();

const port = process.env.PORT || 8000;
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test";

app.use(express.json())

// app.use(express.urlencoded({ extended: true }))


app.use(middlewareGlobal({ role: 'admin' }))


mongoConnect({ db: mongoURL })
routes(app);

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})