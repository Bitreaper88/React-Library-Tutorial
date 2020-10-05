import { Router } from "express";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import bookRoutes from "./bookRoutes";
import { refreshTokenHandler } from "../controllers/refreshTokenController";
import { logoutHandler } from "../controllers/loginController";

export const createRoutes = (): Router => {
    const router = Router();
    router.use("/login", loginRoutes());
    router.use("/user", userRoutes());
    router.use("/book", bookRoutes());
    router.use("/logout", logoutHandler);
    router.get("/refreshToken", refreshTokenHandler);
    return router;
};
