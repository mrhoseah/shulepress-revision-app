import { NextFunction, Request, Response } from "express";
import FormidableMiddleware from "express-formidable";
import { z, AnyZodObject } from "zod";

// Formidable middleware for parsing form data
const formidableMiddleware = FormidableMiddleware();

export const parseFormData = (req: Request, res: Response, next: NextFunction) => {
  formidableMiddleware(req, res, next);
};

const validateInput = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
    res.status(400).json({ errors: (error as z.ZodError).errors });
  }
};

export default validateInput;
