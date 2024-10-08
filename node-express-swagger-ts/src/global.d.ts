import "express";

declare module "express" {
  interface Request {
    timestamp?: number;
  }
}

// declare global {
//   namespace Express {
//       interface Request {
//           id?: any;
//           loggedInUser: any;
//           oidc: any;
//       }
//   }
// }
