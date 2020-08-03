import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";
import userRoutes from "../routes/userRoutes";

const saveUserIfNotExists = async (user: User) =>
    User.findOne(user.email, undefined)
        .then(userFound => {
            if (userFound)
                throw new Error("User already registered!");
            return User.save(user);
        }).catch((err) => console.log("CATCH"));

export const postUserHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { name, email, password } = req.body as IUser;

    const user = new User(
        name,
        email,
        password
    );
    return saveUserIfNotExists(user)
        .then(() => res.status(200).send(`User ${name} created!`))
        .catch((err: Error) => res.status(500).send(err.message));
};

export const getUserHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { userId } = req.params 
    
    /*
        If your project is not small, you should consider using something like
        class-transformer to guard against showing user information that they should
        not be able to see. https://github.com/typestack/class-transformer
    */

    return User.findById(userId)
        .then(user => user ?
            res.status(200).json({
                ...user, 
                hash: undefined,
                salt: undefined
            }) :
            res.status(404).send("User not found.")
        )
        .catch((err: Error) => res.status(500).send(err.message));
};
