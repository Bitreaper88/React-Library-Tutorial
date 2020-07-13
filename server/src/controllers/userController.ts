import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";

const saveUserIfNotExists = async (user: IUser) =>
    User.findOne({ email: user.email })
        .then(userFound => {
            if (userFound)
                throw new Error("User already registered!");
            return user.save();
        });

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
    return saveUserIfNotExists(user)
        .then(() => res.status(200).send(`User ${name} created!`))
        .catch((err: Error) => res.status(500).send(err.message));
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
