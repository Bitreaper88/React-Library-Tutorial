import { Schema, Model, Document, model } from "mongoose";
import { createSalt, createHash } from "./utils";
import { compare } from "bcrypt";

interface IUserSchema extends Document {
    _id: string;
    name: string;
    password: string;
    email: string;
    comparePassword(passwordToCompare?: string): Promise<boolean>;
}

export interface IUser extends IUserSchema {}

export interface IUserModel extends Model<IUser> {
}

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

UserSchema.methods.comparePassword = async function(passwordToCompare?: string): Promise<boolean> {
    return compare(passwordToCompare, this.password)
        .then(isMatch => {
            if (!isMatch)
                throw new Error("Wrong password!");
            return isMatch;
        });
};

export default model<IUser, IUserModel>("User", UserSchema);
