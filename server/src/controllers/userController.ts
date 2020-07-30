import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";
import { IBook } from "../types";

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
    return User.findById(userId).select("-password")
        .then(user => user ?
            res.status(200).json(user) :
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