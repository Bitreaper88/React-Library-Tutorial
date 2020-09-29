import { createSalt, createHash } from "./utils";
import { compare } from "bcrypt";
import { v1 as uuidv1 } from 'uuid';

export interface IUser {
    id: string;
    name: string;
    password: string;
    email: string;
    comparePassword(passwordToCompare?: string): boolean;
}

class User {
    id: string;
    name: string;
    email: string;
    private hash: string; //private only in before compile; NOT AT RUNTIME! If you send this object to JSON.serialize as is, these will be present in the resulting string
    private salt: string; //https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/

    static findAll: () => Promise<User[]>;
    static findOne: (email: string | undefined, id: string | undefined) => Promise<User | undefined>;
    static findById: (id: string) => Promise<User>;
    static save: (user: User) => Promise<User>;

    constructor(name: string, email: string, password: string) {
        this.id = uuidv1();
        this.name = name;
        this.email = email;

        const rawPw = password;
        this.salt = createSalt();
        this.hash = createHash(rawPw, this.salt);
    };

    comparePassword (otherPw: string): Promise<boolean> {
        return compare(otherPw, this.hash);
    }
}

const testUser =  new User(
    "Teppo Testaaja", 
    "test@buutti.com", 
    "test"
);

//Testuser should have the same id every time as we dont want to change it in postman on every run
testUser.id = "a892a360-d720-11ea-87d0-0242ac130003";

const users = [
    testUser
];

const findAll = async (): Promise<User[]> => {
    return users;
};

const findOne = async (email: string | undefined, id: string | undefined): Promise<User | undefined> => {
    const user = users.find(user => user.email === email || user.id === id);

    return user ?
        Promise.resolve(user) :
        Promise.resolve(undefined);
};

const findById = async (id: string): Promise<User> => {
    const user = users.find(user => user.id === id);

    return user ?
        Promise.resolve(user) :
        Promise.reject();
};

const save = async (user: User): Promise<User> => {
    const alreadyExists = users.find((usr) => usr.email === user.email);
    if(alreadyExists) {
        return Promise.reject("User already exists");
    }

    users.push(user);
    return Promise.resolve(user);
};

User.findAll = findAll;
User.findOne = findOne;
User.findById = findById;
User.save = save;

export default User;
