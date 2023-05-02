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
router.post("/", UserController.signUp);
router.get("/:id", auth, UserController.profile);
router.patch("/", auth, UserController.updateUser);

router.post("/upload", [auth, uploads.single("file0")], UserController.upload);
// 👇 returns articles by an user
router.get("/articles/:id/:page?", auth, UserController.user);
router.get("/articles-amount", auth, UserController.counters);
router.get("/avatar/:file", auth, UserController.avatar);
router.post("/login", UserController.logIn);

//export router
module.exports = router;
