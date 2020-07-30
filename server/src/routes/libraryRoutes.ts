import { Router } from "express";
import { getBook, borrowBook, returnBook } from "../controllers/libraryController";
import passport from "passport";

export default (): Router => {
    const router = Router();
    router.get("/:isbn", getBook);
    router.post(
        "/:isbn/borrow/:id",
        passport.authenticate("jwt", { session: false }),
        borrowBook
    )
    router.post(
        "/:isbn/return/:id",
        passport.authenticate("jwt", { session: false }),
        returnBook
    )
    return router;
};
