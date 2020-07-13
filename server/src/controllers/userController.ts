import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";

export const postUserHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { name, email, password } = req.body as IUser;
    const user = new User({
        name,
        email,
        password
    });
    return user.save()
        .then(() => res.status(200).send(`User ${name} created!`))
        .catch(_err => res.status(500).send("Something went wrong"));
};

export const getUserHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { userId } = req.params;
    return User.findById(userId)
        .then(user => user ?
            res.status(200).json(user) :
            res.status(404).send("User not found.")
        )
        .catch((err: Error) => res.status(500).send(err.message));
};
