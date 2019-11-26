require("dotenv").config();
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const hbs = require("hbs");
const bcrypt = require("bcrypt");


mongoose.connect(process.env.DB, { useNewUrlParser: true });

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  session({
    secret: (process.env.SECRET),
    resave: false,
    saveUninitialized: true,
    useUnifiedTopology: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});





//login
// passport.use(
//   "local-login",
//   new LocalStrategy((req,res, next) => {
//     const {email} = req.body 
//     const {password} = req.body 

//     console.log(email)
//     console.log(password)


//     User.findOne(email, (err, user) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return next(null, false, { message: "Incorrect email" });
//       }
//       if (!bcrypt.compareSync(password, user.password)) {
//         return next(null, false, { message: "Incorrect password" });
//       }

//       return next(null, user);
//     });
//   })
// );







// passport.use('local-login', new LocalStrategy({
//   // Fields to accept
//   usernameField: 'email', // default is username, override to accept email
//   passwordField: 'password',
//   passReqToCallback: true // allows us to access req in the call back
// }, async (req, email, password, done) => {
//   // Check if user and password is valid
//   let User = await User.findBy('email', email)
//   let passwordValid = user && bcrypt.compareSync(password, user.password)

//   // If password valid call done and serialize user.id to req.user property
//   if (passwordValid) {
//     return done(null, {
//       id: user.id
//     })
//   }
//   // If invalid call done with false and flash message
//   return done(null, false, {
//     message: 'Invalid email and/or password'
//   });
// }))












//signup
passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, email, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        User.findOne(
          {
            email: email
          },
          (err, user) => {
            if (err) {
              return next(err);
            }

            if (user) {
              return next(null, false);
            } else {

              const { username, email, password, lastName, genre, birthdate, wFrom, bootCamp, courseMode, role } = req.body;
              console.log(username, email, password, lastName, genre, birthdate, wFrom, bootCamp, courseMode, role)
              const hashPass = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(8),
                null
              );
              const newUser = new User({
                username,
                email,
                password: hashPass,
                lastName,
                genre,
                birthdate,
                wFrom,
                bootCamp,
                courseMode,
                role
              });

              newUser.save(err => {
                if (err) {
                  next(null, false, { message: newUser.errors });
                }
                return next(null, newUser);
              });
            }
          }
        );
      });
    }
  )
);








app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const index = require("./routes/index");
const authRoutes = require("./routes/authentication");
app.use("/", index);
app.use("/", authRoutes);
app.use("/posts", require('./routes/postRoutes'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'IronFace';
module.exports = app;











