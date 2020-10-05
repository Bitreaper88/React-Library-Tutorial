import { Router } from "express";
import { postUserHandler, getUserHandler, listBorrowedBooks } from "../controllers/userController";
import passport from "passport";

export default (): Router => {
    const router = Router();
    router.post("/", postUserHandler);
    router.get(
        "/:userId",
        passport.authenticate("jwt", { session: false }),
        getUserHandler
    );
    router.get(
        "/:userId/books",
        passport.authenticate("jwt", { session: false }),
        listBorrowedBooks
    );
    return router;
};

/*
Note to get this working with postman

First 
POST
http://localhost:3001/api/login
{
    "email": "test@buutti.com",
    "password": "test"
}

Then use the response (which may or may not change each time you restart the server, havent figgured out that yet)
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4OTJhMzYwLWQ3MjAtMTFlYS04N2QwLTAyNDJhYzEzMDAwMyIsImlhdCI6MTYwMTg1MzQ1MCwiZXhwIjoxNjAxODU0MzUwfQ.L5G3Byege9e6qtga_wGZmy_JteNCgfyYPavrAFR2WSA"
}

copy whats inside the ""
go to to the Postman request and click on the "Authorization" tab, its between the "Param" and "Headers"

Select the "Bearer Token" from the dropdown
On the left there will be a field labled "Token"
Paste the long string you copied earlier into that field and the Authorization should now be active for the session

*/