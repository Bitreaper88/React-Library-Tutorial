import express from "express";
import { setupDatabase } from "./database";
import { PORT } from "./constants";

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", (_req, res) => res.send("Hello from the libary server!"));

setupDatabase()
    .then(() => console.log("Database setup completed!"))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
