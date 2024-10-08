import express from "express";
import * as http from "http"; // We import http for init the server
import cors from "cors";
import * as dotenv from "dotenv";
import ScrapeCountroller from "./controllers/scrape";

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Puppeteer Server is up and running!");
});

app.get("/scrape", ScrapeCountroller.scrapeLogic);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
