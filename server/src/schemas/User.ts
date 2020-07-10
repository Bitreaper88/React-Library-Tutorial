import mongoose, { Schema, Model, Document } from "mongoose";

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

    const User = db.model("User", UserSchema); 
    return User;
};
