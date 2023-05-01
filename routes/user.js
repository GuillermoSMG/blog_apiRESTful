const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const multer = require("multer");

//upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, `avatar${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage });

//define routes
router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.get("/profile/:id", auth, UserController.profile);
router.get("/user/:id/:page?", auth, UserController.user);
router.put("/update", auth, UserController.updateUser);
router.post("/upload", [auth, uploads.single("file0")], UserController.upload);
router.get("/avatar/:file", auth, UserController.avatar);
router.get("/counters", auth, UserController.counters);


//export router
module.exports = router;