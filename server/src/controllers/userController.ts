
import { Request, Response, NextFunction } from "express";

export const postUserHandler = 
  async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => 
      res.status(200).send("User created");
