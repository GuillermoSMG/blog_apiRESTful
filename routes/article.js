const { Router } = require("express");
const multer = require("multer");
const articleController = require("../controllers/article");
const { auth } = require("../middlewares/auth");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/articles");
  },
  filename: function (req, file, cb) {
    cb(null, `article${Date.now()}${file.originalname}`);
  },
});

const uploaded = multer({
  storage,
});

router.get("/:page?", articleController.getArticles);
router.post("/", auth, articleController.saveArticle);
router.delete("/:id", auth, articleController.deleteArticle);
router.patch("/:id", auth, articleController.updateArticle);

//refactor
router.get("/article/:id", articleController.getAnArticle);
router.post(
  "/upload-image/:id",
  [uploaded.single("file"), auth],
  articleController.uploadImage
);
router.get("/image/:file", articleController.getImage);
router.get("/search/:searchString?", articleController.search);

module.exports = router;
