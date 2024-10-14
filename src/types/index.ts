import { Request } from "express";
export interface UserRequest extends Request {
  user?: any; // You can replace 'any' with a more specific type if you have one
}