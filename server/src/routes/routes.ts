import { Router } from "express";
import loginRoutes from "./loginRoutes";

export const createRoutes = (): Router => {
    const router = Router();
    router.use("/login", loginRoutes(router));
    return router;
};
