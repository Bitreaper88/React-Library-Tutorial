import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";
import books_json from "../../db/books-dummy.json";
const books = books_json.books;

export const getBookHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    console.log(req.params)
    const { isbn } = req.params;
    
    const book = books.find((book) => book.isbn === isbn);
    return book ? 
        res.status(200).send(book) : 
        res.status(404).send({ error: "notfound" });
};
/*
export const getBookInstanceHandler = async (

)*/