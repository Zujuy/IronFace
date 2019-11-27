const router = require("express").Router();
const passport = require("passport");
const {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logOut
} = require("../controllers/auth.controllers");
const { canLogin } = require("../middlewares");

// Local Signup & Login
router.get("/signup", canLogin, signupGet);
router.post("/signup", signupPost);
router.get("/login", canLogin, loginGet);
router.post("/login", loginPost);


// Logout no matter which user
router.get("/logout", logOut);

module.exports = router;
