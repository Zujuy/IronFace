const router = require("express").Router();
const {
  feedsGet,
  postPost,
  commentPost,
  editUserGet,
  editUserPost,
  deleteUserPost,
  commentsGet,
  eventGet,
  eventPost,
  alleventGet,
  allusersGet,
  profileDetailGet
} = require("../controllers/staff.controllers");
const { profileGet } = require("../controllers/auth.controllers");
const upload = require("../config/cloudinary");

router.get("/feeds", feedsGet);
router.get("/comments/:id", commentsGet)
router.get("/profile", profileGet);
// router.post("/profile", upload.single("photoURL"), profilePost);
router.post("/post", upload.single("photoURL"), postPost);
router.post("/comment", upload.single("photoURL"), commentPost);


router.get("/edit", editUserGet);
router.post("/edit", upload.single("photoURL"), editUserPost);

router.get("/event", eventGet);
router.post("/event", eventPost);

router.get("/allUsers", allusersGet);


router.get("/allevents", alleventGet);

router.post("/delete", deleteUserPost);

router.get("/ironhacker/:id", profileDetailGet);


const User = require("../models/User");




module.exports = router;