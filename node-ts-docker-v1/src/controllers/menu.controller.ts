import { Request, Response, NextFunction } from "express";

async function GetMenu(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("TEST ", req.body);
    const data = {
      title: "General",
      icon: "bi-gear-fill",
      childrens: [
        {
          title: "Home",
          icon: "bi-house-fill",
          path: "/",
        },
        {
          title: "About",
          icon: "bi-info-circle-fill",
          path: "/about",
        },
        {
          title: "Contact",
          icon: "bi-phone-fill",
          childrens: [
            {
              title: "Facebook",
              icon: "bi-facebook",
            },
            {
              title: "Twitter",
              icon: "bi-twitter",
            },
            {
              title: "Instagram",
              icon: "bi-instagram",
            },
          ],
        },
        {
          title: "FAQ",
          icon: "bi-question-circle-fill",
        },
      ],
    };
    const admin = {
      title: "Account",
      icon: "bi-info-circle-fill",
      childrens: [
        {
          title: "Login",
          path: "/login",
        },
        {
          title: "Register",
          path: "/register",
        },
        {
          title: "Forgot Password",
          path: "/forgot-password",
        },
        {
          title: "Reset Password",
          path: "/reset-password",
        },
      ],
    };
    const report = {
      title: "Report",
      icon: "bi-database-fill-check",
      path: "/report",
    };
    return res.send([data, admin, report]);
  } catch (error) {
    next();
  }
}

export default {
  GetMenu,
};
