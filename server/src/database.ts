import mongoose from "mongoose";
import { DB_URL } from "./constants";
import createUserModel from "./schemas/User";

export const setupDatabase = (): Promise<typeof mongoose|void> =>
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(db => {
            console.log("Connected to database!");
            return db;
        })
        .catch(err => console.log(err));
