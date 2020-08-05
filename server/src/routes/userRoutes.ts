import { Router } from "express";
import { postUserHandler, getUserHandler, listBorrowedBooks } from "../controllers/userController";
import passport from "passport";

export default (): Router => {
    const router = Router();
    router.post("/", postUserHandler);
    router.get(
        "/:userId",
        passport.authenticate("jwt", { session: false }),
        getUserHandler
    );
    router.get(
        "/:userId/books",
        passport.authenticate("jwt", { session: false }),
        listBorrowedBooks
    );
    return router;
};
