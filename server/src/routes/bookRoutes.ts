import { postUserHandler, getUserHandler, listBorrowedBooks } from "../controllers/userController";
import { searchHandler, getBookByIsbn, patchBorrowed} from "../controllers/bookController";
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
        patchBorrowed
    );

    router.patch(
        "/:isbn/return/:id",
        passport.authenticate("jwt", { session: false }),
    );

    return router;
};
