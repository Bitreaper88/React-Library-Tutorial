import { Request, Response } from "express";
import { IUser } from "../schemas/User";
import passport from "passport";
import jwt from "jsonwebtoken"; 

const authenticate = (req: Request, res: Response): Promise<IUser> => 
    new Promise((resolve, reject) => {
    // eslint-disable-next-line
    passport.authenticate("local", { session: false }, (err: Error, user: IUser) => {
            if (!user)
                reject(new Error("Wrong username or password!"));
            if(err)
                reject(err);
            if(user) 
                resolve(user);
            
        })(req, res);
    });

export const loginHandler = async (
    req: Request,
    res: Response
): Promise<Response> => authenticate(req, res)
    .then(user => user ?
        jwt.sign(
            {
                user: user._id, 
                email: user.email
            }, 
            process.env.SECRET_KEY || "SECRET_KEY") :
        null)
    .then(token => res.status(200).json({ token }))
    .catch((err: Error) => res.status(500).send(err.message));

