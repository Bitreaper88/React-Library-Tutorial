import { Router } from "express";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import { refreshTokenHandler } from "../controllers/refreshTokenController";
import { logoutHandler } from "../controllers/loginController";

export const createRoutes = (): Router => {
    const router = Router();
    router.use("/login", loginRoutes());
    router.use("/user", userRoutes());
    router.use("/logout", logoutHandler);
    router.get("/refreshToken", refreshTokenHandler);
    return router;
};
