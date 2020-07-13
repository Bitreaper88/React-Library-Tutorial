import { Router } from "express";
import { loginHandler } from "../controllers/loginController";

export default (): Router => {
    const router = Router();
    router.post("/", loginHandler);
    return router;
};
