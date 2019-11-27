const router = require("express").Router();
const {

  postPost,

} = require("../controllers/LT.controllers");


const { profileGet, profilePost } = require("../controllers/auth.controllers");
const upload = require("../config/cloudinary");

router.get("/profile", profileGet);
router.post("/profile", upload.single("photoURL"), profilePost);


router.post("/post", upload.single("photoURL"), postPost);



module.exports = router;