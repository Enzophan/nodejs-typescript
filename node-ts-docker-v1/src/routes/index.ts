import { Express, Request, Response, NextFunction } from "express";
import SidebarRoute from "./Sidebar.route";
import AuthRoute from "./Auth.route";
import UserRoute from "./User.route";

const routes = (app: Express) => {
  app.get("/api", (req: Request, res: Response) => {
    return res.send("Hello to API server");
  });

  app.use("/api/v1/sidebar", SidebarRoute);
  app.use("/api/v1/auth", AuthRoute);
  app.use("/api/v1/user", UserRoute);

  app.get("/error", async (req: Request, res: Response) => {
    try {
      await throwError();
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).send("Somthing went wrong!");
    }
  });
};

//Handle Error
async function throwError() {
  throw new Error("Boom!");
}

export default routes;
