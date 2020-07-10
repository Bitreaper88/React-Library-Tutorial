import mongoose, { Schema, Model, Document } from "mongoose";
import { createSalt, createHash } from "./utils";
import { compareSync } from "bcrypt";

export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
}

export default (db: typeof mongoose): Model<Document> => {
    const UserSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    });

    UserSchema.pre<IUser>("save", function(next) {
        if (!this.isModified("password")) next();
        const salt = createSalt();
        const hash = createHash(this.password, salt);

        this.password = hash;
        next();
    });

    const User = db.model("User", UserSchema); 

    UserSchema.methods.comparePassword = 
        function(passwordToCompare: string): boolean {
            return compareSync(passwordToCompare, this.password);
        };
    return User;
};
