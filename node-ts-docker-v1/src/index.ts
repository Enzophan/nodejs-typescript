import express from 'express';

import mongoConnect from './config/mongo';

const app = express();
const port = process.env.PORT || 8000;
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test";

app.use(express.json())

mongoConnect({ db: mongoURL });

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});