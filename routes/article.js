const { Router } = require("express");
const router = Router();

const articleController = require("../controllers/article");

router.post("/saveArticle", articleController.saveArticle);
router.get("/articles/:latest?", articleController.getArticles);
router.get("/article/:id", articleController.getAnArticle);
router.delete("/article/:id", articleController.deleteArticle);
router.put("/article/:id", articleController.updateArticle);

module.exports = router;
