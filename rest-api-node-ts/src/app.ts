import express from 'express';
import config from 'config';
import cors from 'cors';

import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser'

const port = config.get<number>('port');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:5173'],
    exposedHeaders: ["x-access-token"]
}));

app.use(express.json());


app.use(deserializeUser);


// Remove "x-powered-by"
// app.disable('x-powered-by');
app.use(function (req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});

app.listen(port, async () => {
    logger.info(`Server is running on Port as ${port}`)
    await connect();
    routes(app)
})