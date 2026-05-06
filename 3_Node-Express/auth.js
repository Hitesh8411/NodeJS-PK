const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username });

      if (!user) {
        return done(null, false, { message: "user not found" });
      }

      const isMatch = await user.comparePassword(password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "invalid password" });
      }

    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;