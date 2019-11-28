const router = require("express").Router();
const {

  postPost,
  commentPost

} = require("../controllers/student.controllers");


const { profileGet, profilePost } = require("../controllers/auth.controllers");
const upload = require("../config/cloudinary");

router.get("/profile", profileGet);
router.post("/profile", upload.single("photoURL"), profilePost);


router.post("/post", upload.single("photoURL"), postPost);


router.post("/comment", upload.single("photoURL"), commentPost);



module.exports = router;