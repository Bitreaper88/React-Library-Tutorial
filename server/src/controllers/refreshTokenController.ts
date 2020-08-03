import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretOrKey } from "../constants";
import { checkRefreshtoken } from "../authentication";

export const refreshTokenHandler = (req: Request, res: Response): Promise<Response> => 
    checkRefreshtoken(req, res).then(user => {
        const token = jwt.sign({ id: user.id }, secretOrKey || "SECRET_KEY");
        return res.status(200).json(token);
    }).catch((_err: Error) => res.status(500).send("Something went wrong refreshing token"));

