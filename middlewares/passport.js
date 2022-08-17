const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/inputModels/user');

module.exports = passport => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: process.env.JWT_SECRET
    }, (payload, done) => {
        try {
            const user = User.findById(payload.sub)._conditions;
            return done(null, user);
        }
        catch (err) {
            done(err,false);
        }
    }));
}

