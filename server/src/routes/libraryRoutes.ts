import { Router } from "express";
import { getBookHandler } from "../controllers/libraryController";

export default (): Router => {
    const router = Router();
    router.get("/:isbn", getBookHandler);
    return router;
};
