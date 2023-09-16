import express from "express";
import cors from "cors";
import compression from "compression";

import os from "node:os";
import config from "./config";
import router from "./router";
import sseRoute from "./router/sse.route";
import serverRender from "./render";

console.log({ config });

const server = express();
server.use(express.static("dist"));
server.set("view engine", "ejs");

server.use(cors({ origin: config.origin, credentials: true }));
server.use(compression());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(sseRoute);
server.use("/api", router);
server.get(
  [
    "/",
    "/contest/:contestId",
    "/login",
    "/guestbook",
    "/writing",
  ],
  async (req, res) => {
    // Server render
    const { initialMarkup, initialData } = await serverRender(
      req
    );

    res.render("index", {
      // content: "EJS is <em>cool</em>!",
      // initialContent: "Loading...",
      initialMarkup,
      initialData,
    });
  }
);

server.listen(config.PORT, config.HOST, () => {
  console.info(
    `Server in listening at ${config.SERVER_URL}`,
    `Free mem: ${os.freemem() / 1024 / 1024}`
  );
});
