import { Router } from "express";
import { postUserHandler, getUserHandler, listBorrowedBooks } from "../controllers/userController";
import { searchHandler } from "../controllers/bookController";
import passport from "passport";

export default (): Router => {
    const router = Router();

    ///books/?search=SearchQuery
    router.get(
        "/",
        searchHandler
    );

    router.get(
        "/books/:isbn",
    );

    router.patch(
        "/books/:isbn/borrow/:id",
    );

    router.patch(
        "/books/:isbn/return/:id",
    );

    return router;
};
