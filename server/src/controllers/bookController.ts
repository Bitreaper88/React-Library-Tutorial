import { Request, Response } from "express";
//import User, { IUser } from "../models/User";
//import { IBook } from "../types";

export const searchHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    if (!req.query.search) return res.sendStatus(400);
    const searchQuery = String(req.query.search);

    // Search all string-type fields, filter out sensitive data from public search
    const hits = global.books
        .filter(book => {
            for (const [_key, value] of Object.entries(book)) {
                if (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return book;
                }
            }
        }).map(book => {
            const { copies, ...restOfTheValues } = book;
            return {
                ...restOfTheValues,
                available: copies.find(copy => copy.status === "in_library") ? true : false
            }
        });

    return hits.length !== 0 ?
        res.status(200).json(hits) :
        res.sendStatus(404);
}

export const getBookByIsbn = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { isbn } = req.params;
    const found_books = global.books.filter(book => book.isbn === isbn);

    return found_books.length > 0 ? res.status(200).send(found_books) : res.status(404).send({ error: "notfound" }); // ternary operator checks if found books array is longer then 0
}
