import express from "express";
import { setupDatabase } from "./database";
import { PORT } from "./constants";
import { createRoutes } from "./routes/routes";
import { setupAuthenticationStrategies } from "./authentication";
import cors from "cors";
import cookieParser from "cookie-parser";
import { IUser } from "./schemas/User";
import books_json from "../db/books-dummy.json";
import { IBook } from "./types";

 //Alter express User type to match ours. Enables us to use the right type in controllers.
 //https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23976
declare global {
    namespace Express {
        interface User extends IUser {}
    }
    namespace NodeJS {
        interface Global {
            books: IBook[]
        }
    }
}
global.books = books_json as IBook[];

const app = express();

if (process.env.NODE_ENV !== "production")
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: "GET, PUT, POST, PATCH, DELETE"
    })); // Needed for development use for production set allowed origins and methods.
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use("/api", createRoutes());
app.get("/", (_req, res) => res.send("Hello from the library server!"));
setupAuthenticationStrategies();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
