import { Router } from "express";
import { postUserHandler, getUserHandler, listBorrowedBooks } from "../controllers/userController";
import passport from "passport";

export default (): Router => {
    const router = Router();
    
    //Search for a book with GET
    router.get( 
        "/books/?search=SearchQuery",
     
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
