const router = require("express").Router();
const {
  feedsGet,
  postPost,
  commentPost,
  editUserGet,
  editUserPost
} = require("../controllers/staff.controllers");
const { profileGet } = require("../controllers/auth.controllers");
const upload = require("../config/cloudinary");

router.get("/feeds", upload.single("photoURL"), feedsGet);
router.get("/profile", profileGet);
// router.post("/profile", upload.single("photoURL"), profilePost);
router.post("/post", upload.single("photoURL"), postPost);
router.post("/comment", upload.single("photoURL"), commentPost);
router.get("/edit", editUserGet);
router.post("/edit", upload.single("photoURL"), editUserPost);


module.exports = router;