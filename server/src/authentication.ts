import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import User, { IUser } from "./schemas/User";
import { secretOrKey, REFRESH_SECRET } from "./constants";
import { Request, Response } from "express";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// LocalStrategy is used to check that user has provided correct password for logging in.
const localStartegy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => {
    User.findOne({ email })
        .then(async user => {
            if (!user)
                return done(null, false);
            const isMatch = await user.comparePassword(password);
            return isMatch && done(null, user);
        })
        .catch(err => done(err));
});

// JWTStrategy is used to check if user is authorized to access requested resources.
const jwtStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey 
}, (payload, done) => {
    // eslint-disable-next-line
    User.findOne({ id: payload.sub })
        .then(user => {
            if (user)
                return done(null, user);
        
            return done(null, false, { message: "Not authorized" });
        })
        .catch(err => done(err));
});

// refreshStrategy is used to check that user has logged in and his refreshToken is still valid.
// If refreshToken is valid new accessToken can be requested, 
// accessToken should be requested before it has expired.
// If refresh has expired or is not valid, user will not be able to access resources.
// Refresh token is stored in httpOnly cookie so that client javascript cannot access it.
// It should be sent to the server with every request.
const refreshStrategy = new JWTStrategy(
    {
        jwtFromRequest: req => 
            // eslint-disable-next-line
             req.cookies.refreshToken
        ,
        secretOrKey: REFRESH_SECRET
    }, (payload, done) => {
        // eslint-disable-next-line
        User.findOne({ id: payload.sub })
            .then(user => {
                if (user)
                    return done(null, user);
        
                return done(null, false, { message: "Not authorized" });
            })
            .catch(err => done(err));
    });

export const checkRefreshtoken = (req: Request, res: Response): Promise<IUser> => 
    new Promise((resolve, reject) => 
    // eslint-disable-next-line
    passport.authenticate("refresh", { session: false }, (err: Error, user: IUser) => {
            if (!user) 
                reject(new Error("User not found"));
            if (err)
                reject(err);
            resolve(user);
        })(req, res)
    );

export const authenticate = (req: Request, res: Response): Promise<IUser> => 
    new Promise((resolve, reject) => {
    // eslint-disable-next-line
    passport.authenticate("local", { session: false }, (err: Error, user: IUser) => {
            if (!user)
                reject(new Error("Wrong username or password!"));
            if(err)
                reject(err);
            if(user) 
                resolve(user);
            
        })(req, res);
    });

export const setupAuthenticationStrategies = (): void => {
    passport.initialize();  
    passport.use(localStartegy);
    passport.use(jwtStrategy);
    passport.use("refresh", refreshStrategy); 
};
