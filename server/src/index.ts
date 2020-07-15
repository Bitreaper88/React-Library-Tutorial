import express from "express";
import { setupDatabase } from "./database";
import { PORT } from "./constants";
import { createRoutes } from "./routes/routes";
import { setupAuthenticationStrategies } from "./authentication";
import cors from "cors";
import cookieParser from "cookie-parser";

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
app.get("/", (_req, res) => res.send("Hello from the libary server!"));
setupAuthenticationStrategies();

setupDatabase()
    .then(() => console.log("Database setup completed!!"))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
