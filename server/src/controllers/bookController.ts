import { Request, Response } from "express";
import fs from 'fs';
import { IBook, ICopy } from '../../../server/src/types';
import path from 'path';

export const searchHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    if (!req.query.search) return res.sendStatus(400);
    const searchQuery = String(req.query.search);
    const multiQuery = searchQuery.split(' ');
    
    // Search all string-type fields, filter out sensitive data from public search
    const hits = global.books
        .filter(book => {
            for (const [_key, value] of Object.entries(book)) { 
                if (typeof value === 'string') {
                    const matchFound = multiQuery.find(term => {
                            return value.toLowerCase().includes(term.toLowerCase());
                        });
                    if (matchFound) return book;
                }
            }
        }).map(book => {
            const { copies, ...restOfTheValues } = book;
            return {
                ...restOfTheValues,
                available: copies.map(copy => {
                    return {id: copy.id, status: copy.status, home_library: copy.home_library, due_date: copy.due_date};
                })
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
/**
* Handles the borrowing of books
*/
export const patchBorrow = async (
    req: Request,
    res: Response,

): Promise<Response> => {
    const isbn = req.params.isbn;
    const id = req.params.id;
    const userId = req.user?.id

    if (!userId) return res.status(500).send("User not found, Try login in again");
    // "borrowed" status is passed to the handler when returning books
    let hits = bookJSONHandler(isbn, id, userId, "borrowed");
    if (hits.length) return res.status(200).send(hits);
    else return res.status(400).send({ error: "invalid operation" });
}

/**
* Handles the returning of books
*/
export const patchReturn = async (
    req: Request,
    res: Response

): Promise<Response> => {
    const isbn = req.params.isbn;
    const id = req.params.id;
    const userId = req.user?.id

    if (!userId) return res.status(500).send("User not found, Try login in again");
    // "in_library" status is passed to the handler when returning books
    let hits = bookJSONHandler(isbn, id, userId, "in_library");
    if (hits.length) return res.status(200).send(hits);
    else return res.status(400).send({ error: "invalid operation" });
}

/**
* Gets called form either patchReturn or patchBorrow and finds the desired target from the JSON
*/
export function bookJSONHandler(isbn: string, id: string, userId: string, status: any)  {
    let statusBoolean: boolean = false;
    const hits = global.books
    .filter(book => book.isbn === isbn)
        .map(book => {
        const { copies, ...restOfTheValues } = book;
        return {
            ...restOfTheValues,
            operationValid: in_libraryCheck(copies, userId, status),
        }
    });
    function in_libraryCheck(copies: ICopy[], userId: string, targetStatus: string){
        const copy = copies.find(copy => copy.id === id);
            if (!copy) return status = false;
            //console.log("Error! targetStatus: " + targetStatus); 
            if (copy.status !== targetStatus) {
                statusBoolean = true;
                return status = saveToJSON(isbn, id, userId, targetStatus);
            }
            else return status = false;
        
    }
    return hits;
}

/**
* Wirtes the new status to the Dummy JSON file that has been set in bookJSONHandler
*/
export function saveToJSON(isbn: string, id: string, userId: string, status: any): boolean {
    global.books.forEach((books: IBook) => {
        if (books.isbn === isbn) {
            books.copies.forEach((copies: ICopy) => {
                if (copies.id === id) {
                    copies.status = status;
                    if (status === "borrowed") {
                        const dueDate = new Date();
                        dueDate.setDate(dueDate.getDate() + 14);
                        copies.due_date = dueDate.toJSON();
                        copies.borrower_id = userId;
                    }
                    else if (status === "in_library") {
                        copies.due_date = null;
                        copies.borrower_id = null;
                    }
                    else return false
                }
            });
        }
    });
    try {
        fs.writeFileSync(path.join(__dirname, "..", "..", "db", "books-dummy.json"), JSON.stringify(global.books), 'utf8');
        //console.log('books-dummy.json saved!');
        return true;
    } catch (err) {
        console.log(err);
        console.log('Error saving to books-dummy.json');
        return false;
    }
}