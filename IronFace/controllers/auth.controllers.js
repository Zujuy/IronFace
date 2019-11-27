const User = require("../models/User");
const passport = require("passport");






exports.signupGet = (req, res) => {
  const templateConfig = {
    action: "/signup",
    title: "Sign up",
    register: true
  };
  res.render('auth/signup', templateConfig);
};

exports.signupPost = async (req, res, next) => {
  const { username, email, password, lastName, genre, birthdate, wFrom, bootCamp, courseMode, role } = req.body;
  const userCreated = await User.register(
    { username, email, password, lastName, genre, birthdate, wFrom, bootCamp, courseMode, role  },
    password
  ).catch(err => {
    const templateConfig = {
      action: "/signup",
      title: "Sign up",
      register: true,
      err: "User already exists"
    };
    res.render('auth/feeds', templateConfig);
  });
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, err => {
      if (err) return next(err);
      req.user = user;
      return res.redirect("/ironhacker/feeds");
    });
  })(req, res, next);
};











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
      return res.redirect(`/feeds`);
    });
  })(req, res, next);
};













exports.logOut = (req, res, next) => {
  req.logout();
  res.redirect("/");
};










exports.feedsGet = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).populate({
    path: "favors",
    options: { sort: { createdAt: -1 } }
  });
  res.render("auth/feeds", { user });
};

exports.feedsPost = async (req, res, next) => {
  let userUpdated;
  const { _id } = req.user;
  const { username, telephone_number } = req.body;
  if (req.file) {
    userUpdated = await User.findByIdAndUpdate(_id, {
      $set: { username, telephone_number, photoURL: req.file.secure_url }
    });
  } else {
    userUpdated = await User.findByIdAndUpdate(_id, {
      $set: { username, telephone_number }
    });
  }
  req.user = userUpdated;
  res.redirect(`/${userUpdated.username.toLowerCase()}/feeds`);
};






// exports.profileGet = async (req, res) => {
//   const { _id } = req.user;
//   const user = await User.findById(_id).populate({
//     path: "favors",
//     options: { sort: { createdAt: -1 } }
//   });
//   res.render("auth/feeds", { user });
// };

// exports.profilePost = async (req, res, next) => {
//   let userUpdated;
//   const { _id } = req.user;
//   const { username, telephone_number } = req.body;
//   if (req.file) {
//     userUpdated = await User.findByIdAndUpdate(_id, {
//       $set: { username, telephone_number, photoURL: req.file.secure_url }
//     });
//   } else {
//     userUpdated = await User.findByIdAndUpdate(_id, {
//       $set: { username, telephone_number }
//     });
//   }
//   req.user = userUpdated;
//   res.redirect(`/${userUpdated.username.toLowerCase()}/feeds`);
// };

