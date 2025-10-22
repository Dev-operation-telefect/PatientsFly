import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/users/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Passport configuration for Google OAuth 2.0
// Serialize and deserialize user instances to support persistent login sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }   catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails?.[0]?.value,
                    photo: profile.photos?.[0]?.value,
                    rawJson: profile._json
                });
            }
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    })
);
