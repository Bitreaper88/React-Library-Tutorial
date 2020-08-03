import { Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import { AT_EXPIRATION_TIME, REFRESH_SECRET, RT_EXPIRATION_TIME } from "../constants";
import { authenticate, checkRefreshtoken } from "../authentication";
import { IUser } from "../schemas/User";


const setRefreshCookie = (res: Response, refreshToken: string) => 
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/api/"
    });

const createToken = ( user: IUser ) => ({
    token: jwt.sign({ id: user.id }, process.env.SECRET_KEY || "SECRET_KEY", {
        expiresIn: AT_EXPIRATION_TIME
    }),
    refreshToken: jwt.sign({ id: user.id }, REFRESH_SECRET, {
        expiresIn: RT_EXPIRATION_TIME
    })
});

export const loginHandler = async (
    req: Request,
    res: Response
): Promise<Response> => authenticate(req, res)
    .then(user => user ?
        createToken(user) :
        { token: null, refreshToken: null })
    .then(tokens => tokens.refreshToken ?
        setRefreshCookie(res, tokens.refreshToken)
            .status(200)
            .json({ token: tokens.token }) : 
        res.status(403).send("Unauthorized"))
    .catch((err: Error) => res.status(500).send(err.message));

export const logoutHandler = async (
    req: Request,
    res: Response
): Promise<Response> => checkRefreshtoken(req, res).then(_user => {
    req.logout();
    return res
        .clearCookie("refreshToken", { path: "/api/" })
        .status(200)
        .send("Logged out");
}).catch(err => res.status(500).send(err));
