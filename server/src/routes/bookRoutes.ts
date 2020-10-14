import { Router } from "express";
import { searchHandler, getBookByIsbn, patchBorrow, patchReturn} from "../controllers/bookController";
import passport from "passport";

export default (): Router => {
    const router = Router();

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
