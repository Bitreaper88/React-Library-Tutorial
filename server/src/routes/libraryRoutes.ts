import { Router } from "express";
import { getBook } from "../controllers/libraryController";

export default (): Router => {
    const router = Router();
    router.get("/:isbn", getBook);
    return router;
};
