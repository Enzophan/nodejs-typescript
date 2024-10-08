import { Request, Response, NextFunction } from "express";
import { CalculatorRequestBody } from "../types";

export function validateCalculatorRequest(
  req: Request<{}, any, CalculatorRequestBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { operator, operand1, operand2 } = req.body;
    if (typeof operand1 !== "number" || typeof operand2 !== "number") {
      return res.status(400).send("Operands must be numbers");
    }
    if (
      operator !== "+" &&
      operator !== "-" &&
      operator !== "*" &&
      operator !== "/"
    ) {
      return res.status(400).send("Operator must be +, -, *, or /");
    }
    next();
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }
}

type ExpectedTypes = {
  [key: string]: "string" | "number" | "boolean" | "object" | "array";
};

export const validateRequestBody = (expectedTypes: ExpectedTypes) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    for (const key in expectedTypes) {
      const expectedType = expectedTypes[key];
      const actualType = Array.isArray(body[key]) ? "array" : typeof body[key];

      if (actualType !== expectedType) {
        return res.status(400).json({
          error: `Invalid type for ${key}: Expected ${expectedType}, got ${actualType}`,
        });
      }
    }
    next();
  };
};
