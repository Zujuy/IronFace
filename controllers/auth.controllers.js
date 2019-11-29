const User = require("../models/User");
const Post = require("../models/Post");
const passport = require("passport");

//SignUp
exports.signupGet = (req, res) => {
  const templateConfig = {
    action: "/signup",
    title: "Sign up",
    register: true
  };
  res.render('auth/signup', templateConfig);
};

exports.signupPost = async (req, res, next) => {
  const {
    username,
    email,
    password,
    lastName,
    genre,
    birthdate,
    wFrom,
    bootCamp,
    courseMode,
    role
  } = req.body;
  const userCreated = await User.register({
      username,
      email,
      lastName,
      genre,
      birthdate,
      wFrom,
      bootCamp,
      courseMode,
      role
    },
    password
  ).catch(err => {
    const templateConfig = {
      action: "/signup",
      title: "Sign up",
      register: true,
      err: "User already exists"
    };
    res.render('auth/signup', templateConfig);
  });
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, err => {

      console.log("hayerror")
      if (err) return next(err);
      req.user = user;
      return res.redirect(`/${user.role}/feeds`);
    });
  })(req, res, next);
};


//logIn
exports.loginGet = (req, res) => {
  const templateConfig = {
    action: "/login",
    title: "Login",
    register: false
  };
  res.render('auth/login', templateConfig);
};

exports.loginPost = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      const templateConfig = {
        action: "/login",
        title: "Login",
        register: false,
        err: "Email or password is incorrect"
      };
      return res.render('auth/signup', templateConfig);
    }
    req.logIn(user, err => {
      if (err) return next(err);
      req.user = user;
      return res.redirect(`/${user.role}/feeds`);
    });
  })(req, res, next);
};


//logOut
exports.logOut = (req, res, next) => {
  req.logout();
  res.redirect("/");
};


exports.profileGet = async (req, res) => {
  const {
    _id
  } = req.user;
  const user = await User.findById(_id).populate({
    path: "post",
    options: {
      sort: {
        createdAt: -1
      }
    }
  });
  const post = await Post.find({
    creatorId: _id
  })


  res.render("auth/profile", {
    user,
    post
  });
};




