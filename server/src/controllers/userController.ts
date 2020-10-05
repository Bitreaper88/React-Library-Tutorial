import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { IBook, ICopy } from "../types";

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
        .then(() => res.status(200).json({user_id: user.id}))
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

const getMyCopies = (book: IBook, userId: string) => {
    return book.copies.filter((copy) => userId && copy.borrower_id === userId )
}

export const listBorrowedBooks = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { userId } = req.params;
    const found_books = global.books
    .filter(book => {
        const mycopies = getMyCopies(book, userId);
        return (mycopies.length > 0)
    }).map(book => {
        const mycopies = getMyCopies(book, userId);
        return {...book, copies: mycopies}
    })

    return found_books ? 
        res.status(200).send(found_books) : 
        res.status(404).send({ error: "notfound" });
}