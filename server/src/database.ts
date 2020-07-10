import mongoose from "mongoose";
import { DB_URL } from "./constants";
import createUserModel from "./schemas/User";

const setupModels = (db: typeof mongoose) => {
    createUserModel(db);
    return db;
};

export const setupDatabase = (): Promise<typeof mongoose|void> =>
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(db => {
            console.log("Connected to database!");
            return db;
        })
        .then(db => {
            console.log("Setting up database models");
            return setupModels(db);
        })
        .catch(err => console.log(err));
