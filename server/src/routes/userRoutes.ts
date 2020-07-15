import { Router } from "express";
import { postUserHandler, getUserHandler } from "../controllers/userController";
import passport from "passport";

export default (): Router => {
    const router = Router();
    router.post("/", postUserHandler);
    router.get(
        "/:userId",
        passport.authenticate("jwt", { session: false }),
        getUserHandler
    );
    return router;
};
