const router = require("express").Router();
const { feedsGet, feedsPost } = require("../controllers/auth.controllers");

const upload = require("../config/cloudinary");

router.get("/feeds", feedsGet);
// router.post("/feeds", upload.single("photoURL"), feedsPost);

// router.get("/favor/:id", favorGet);
// router.post("/favor/:id", favorPost);

// router.get("/active", activeGet);
// router.post("/favor/active", activePost);

module.exports = router;
