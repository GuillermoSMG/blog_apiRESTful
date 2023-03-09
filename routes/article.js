const { Router } = require("express");
const multer = require("multer");
const articleController = require("../controllers/article");

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

router.post("/save-article", articleController.saveArticle);
router.get("/articles/:latest?", articleController.getArticles);
router.get("/article/:id", articleController.getAnArticle);
router.delete("/article/:id", articleController.deleteArticle);
router.put("/article/:id", articleController.updateArticle);
router.post(
  "/upload-image/:id",
  [uploaded.single("file")],
  articleController.uploadImage
);
router.get("/image/:file", articleController.getImage);
router.get("/search/:searchString?", articleController.search);

module.exports = router;
