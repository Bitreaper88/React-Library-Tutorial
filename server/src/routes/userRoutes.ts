import { Router } from "express";
import { postUserHandler } from "../controllers/userController";

export default (router: Router): Router => {
    router.post("/", postUserHandler);
    return router;
};
