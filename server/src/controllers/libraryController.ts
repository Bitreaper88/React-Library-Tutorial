import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";
import fs from "fs";
import { IBook } from "../types";
//const books = global.books; books_json as IBook[];

export const getBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { isbn } = req.params;
    const books = global.books;
    const book = books.find((book) => book.isbn === isbn);
    return book ? 
        res.status(200).send(book) : 
        res.status(404).send({ error: "notfound" });
};

const findBook = (search: string | undefined) => (book: IBook) => 
    search && 
    (book.title.toLowerCase().includes(search.toLowerCase()) || 
    book.author.toLowerCase().includes(search.toLowerCase()));

export const searchBooks = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const books = global.books;
    const search = req.query.search as string | undefined;
    const found_books = books.filter(findBook(search));
    return found_books ? 
        res.status(200).send(found_books) : 
        res.status(404).send({ error: "notfound" });
};

export const borrowBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { isbn, id } = req.params;
    const books = global.books;
    const book = books.find((book) => book.isbn === isbn);

    const book_copy = book?.copies?.find((copy) => copy.id === id );

    if (!book_copy || !req.user) {
        return res
            .status(404)
            .send({ error: "notfound" });
    } else if (book_copy.status !== "in_library") {
        return res
            .status(404)
            .send({ error: "not eligible for borrowing", status: book_copy.status });
    } else {
        book_copy.borrower_id = req.user._id;
        book_copy.status = "borrowed";
        book_copy.due_date = "two weeks from now :D";
        //if this is not done, the library state is only stored when server is running
        fs.writeFile("./db/books-dummy.json", JSON.stringify(books), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        return res.status(200).send(book_copy);
    }
};

export const returnBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const usr = req.user as IUser; //"as IUser" should not be needed, type should already be correct here
    const { isbn, id } = req.params;
    const books = global.books;
    const book = books.find((book) => book.isbn === isbn);

    const book_copy = book?.copies?.find((copy) => copy.id === id );
    if (!book_copy) {
        return res
            .status(404)
            .send({ error: "notfound" });
    } else if (
        book_copy.status !== "borrowed" && 
        book_copy.borrower_id !== usr._id
    ) {
        return res
            .status(404)
            .send({ error: "not eligible for returning", status: book_copy.status });
    } else {
        book_copy.status = "in_library";
        book_copy.borrower_id = null;
        book_copy.due_date = null;
        //if this is not done, the library state is only stored when server is running
        fs.writeFile("./db/books-dummy.json", JSON.stringify(books), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        return res
            .status(200)
            .send(book_copy);
    }
}

