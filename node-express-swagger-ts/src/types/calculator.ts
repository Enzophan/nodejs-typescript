import { components } from '../schemas';


export interface CalculatorRequestBody {
  operator: "+" | "-" | "*" | "/";
  operand1: number;
  operand2: number;
}

export type CalculatorCommandDto = components['schemas']['CalculatorCommand'];

export type CalculatorResultDto = components['schemas']['CalculatorResult'];