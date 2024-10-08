import express from "express";
import { healthRouter, calculatorRouter } from "./routes";
import {
  addTimestamp,
  errorHandler,
  logger,
  openApiValidator,
} from "./middlewares";

const app = express();
const port = 4000;

app.use(express.json());
app.use(addTimestamp);
app.use(logger);
app.use(openApiValidator);

app.use("/healthcheck", healthRouter);
app.use("/calculator", calculatorRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at PORT: ${port}`);
});
