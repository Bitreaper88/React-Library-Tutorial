import { Router } from "express";
import { loginHandler } from "../controllers/loginController";

export default (router: Router): Router => {
    router.post("/", loginHandler);
    return router;
};
