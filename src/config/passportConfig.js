const passport = require("passport");
const local = require("passport-local");
const { userModel } = require("../manager/mongo/models/user.model");
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const { create } = require("connect-mongo");

const LocalStrategy = local.Strategy;
const GithubStrategy = require("passport-github2");

// Configuro passport de register y login
const initPassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const {first_name, last_name} = req.body;
        try {
            let userDB = await userModel.findOne({email: username});

            if (userDB) {
                return done(null, false);
            }

            let newUser = {
                first_name,
                last_name,
                email: username, 
                role: "user",
                password: createHash(password)
            }

            let result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done("error al obtener el usuario" + error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findOne({_id: id});
        done(null, user);
    });

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (username, password, done) => {
        const userDB = await userModel.findOne({email: username});
        try {
            if (!userDB) {
                return done(null, false);
            }

            if (!isValidPassword(password, userDB)) {
                return done(null, false);
            }

            return done(null, userDB);
        } catch (error) {
            return done(error);
        }
    }));
};

// COnfiguro passport de github
require("dotenv").config();

const initPassportGithub = () => {
    passport.use("github", new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, async (accesToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            let user = await userModel.findOne({email: profile._json.email});

            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: "",
                    email: profile._json.email,
                    role: "user",
                    password: ""
                }
                let result = await userModel.create(newUser);
                return done(null, result);
            }
            return done(null, user);
        } catch (error) {
            console.log(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findOne({_id: id});
        done(null, user);
    });
}

module.exports = {
    initPassport,
    initPassportGithub
}