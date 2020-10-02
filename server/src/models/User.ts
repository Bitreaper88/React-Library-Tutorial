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
    //private only in before compile; NOT AT RUNTIME! If you send this object to 
    //JSON.serialize as is, these will be present in the resulting string, which 
    //might then end up in the frontend.
    private hash: string; 
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

    toJson = () => JSON.stringify({
        id: this.id,
        name: this.name,
        email: this.email
    });

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

const findAll = async (): Promise<User[]> => Promise.resolve(users);

const findOne = async (email: string | undefined, id: string | undefined): Promise<User | undefined> => {
    if (email) {
        const foundUser = users.find(user => { return user.email === email; });
        if (foundUser) return Promise.resolve(foundUser);
        else return Promise.resolve(undefined);
    }
    else if (id) {
        const foundUser = users.find(user => { return user.id === id; });
        if (foundUser) return Promise.resolve(foundUser);
        else return Promise.resolve(undefined);
    }
    else return Promise.resolve(undefined);
};

const findById = async (id: string): Promise<User> => {
    const user = users.find(entry => {return entry.id ===id});
    if(user) return Promise.resolve(user);
    else return Promise.reject("No user found.");
};

const save = async (user: User): Promise<User> => {
    try {
        users.push(user);
        return Promise.resolve(user);
    }
    catch (err){
        return Promise.reject("Couldn't save new user.");
    }
};

User.findAll = findAll;
User.findOne = findOne;
User.findById = findById;
User.save = save;

export default User;
