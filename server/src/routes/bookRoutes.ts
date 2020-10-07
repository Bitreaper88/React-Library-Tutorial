import { Router } from "express";
import { postUserHandler, getUserHandler, listBorrowedBooks } from "../controllers/userController";
import { searchHandler, getBookByIsbn, patchBorrow, patchReturn} from "../controllers/bookController";
import passport from "passport";
import { authenticate } from "../authentication";

export default (): Router => {
    const router = Router();

    ///books/?search=SearchQuery
    router.get(
        "/",
        searchHandler
    );

    router.get(
        "/:isbn/",
        getBookByIsbn
    );

    router.patch(
        "/:isbn/borrow/:id",
        passport.authenticate("jwt", { session: false }),
        patchBorrow
    );

    router.patch(
        "/:isbn/return/:id",
        passport.authenticate("jwt", { session: false }),
        patchReturn
    );

    return router;
};
