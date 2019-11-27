const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
// const User = require("../models/user");
const uploadCloud = require("../config/cloudinary");


router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("auth/profile", {
    user: req.user
  });
});


//login
router.get("/login", ensureLoggedOut, (req, res) => {

  res.render("auth/login", { message: req.flash("error") });
});

router.post("/login", ensureLoggedOut, passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
    
  })
);


//signup
router.get("/signup", (req, res) => {
  res.render("auth/signup", { message: req.flash("error") });

});

router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  }, 
)
);




















// router.get("/editPic", ensureLoggedIn("/login"), (req, res) => {
//   res.render("authentication/editPic", {
//     user: req.user
//   });
// });








// router.post("/editPic", ensureLoggedIn("/login"), uploadCloud.single("photo"), (req, res) => {
//     const { url } = req.file
//     const { id } = req.user
//     User.findByIdAndUpdate(id, { imgPath: url }, { new: true })
//       .then(() => res.redirect("/profile"))
//       .catch(err => console.log(err))
//    }
// )











router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;