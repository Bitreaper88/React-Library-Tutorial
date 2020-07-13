import { Router } from "express";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";

export const createRoutes = (): Router => {
    const router = Router();
    router.use("/login", loginRoutes());
    router.use("/user", userRoutes());
    return router;
};
