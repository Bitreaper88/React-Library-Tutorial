import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import User from "./schemas/User";
import { secretOrKey } from "./constants";

const LocalStrategy = passportLocal.Strategy;
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

const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
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

export const setupAuthenticationStrategies = (): void => {
    passport.initialize();  
    passport.use(localStartegy);
    passport.use(jwtStrategy);
};
