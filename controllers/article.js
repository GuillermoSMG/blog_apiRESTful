const validator = require("validator");
const Article = require("../templates/Article");

const saveArticle = (req, res) => {
  let parameters = req.body;

  try {
    let validate_title =
      !validator.isEmpty(parameters.title) &&
      validator.isLength(parameters.title, { min: 1, max: 32 });
    let validate_content = !validator.isEmpty(parameters.content);

    if (!validate_content || !validate_title) {
      throw new Error("Información no valida.");
    }
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Faltan datos.",
    });
  }

  const article = new Article(parameters);

  article.save((err, articleSaved) => {
    if (err || !articleSaved) {
      return res.status(400).json({
        status: "Error",
        mensaje: "No se ha guardado el artículo.",
      });
    }

    return res.status(200).json({
      status: "success",
      article: articleSaved,
      message: "Artículo guardado.",
    });
  });
};

const getArticles = (req, res) => {
  let query = Article.find({});

  if (req.params.latest) {
    query.limit(5);
  }

  query.sort({ date: -1 }).exec((err, articles) => {
    if (err || !articles) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado artículos.",
      });
    }

    return res.status(200).send({
      status: "success",
      param: req.params.latest,
      articles,
    });
  });
};

const getAnArticle = (req, res) => {
  let id = req.params.id;

  Article.findById(id, (err, article) => {
    if (err || !article) {
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado ese artículo.",
      });
    }

    return res.status(200).json({
      status: "success",
      article,
    });
  });
};

const deleteArticle = (req, res) => {
  let id = req.params.id;

  Article.findOneAndDelete({ _id: id }, (err, deletedArt) => {
    if (err || !deletedArt) {
      return res.status(509).json({
        status: "error",
        message: "No se ha podido eliminar el artículo.",
      });
    }

    return res.status(200).json({
      status: "success",
      deletedArt,
      message: "Se ha eliminado el artículo.",
    });
  });
};

const updateArticle = (req, res) => {
  let id = req.params.id;

  let parameters = req.body;

  try {
    let validate_title =
      !validator.isEmpty(parameters.title) &&
      validator.isLength(parameters.title, { min: 1, max: 32 });
    let validate_content = !validator.isEmpty(parameters.content);

    if (!validate_content || !validate_title) {
      throw new Error("Información no valida.");
    }
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Faltan datos.",
    });
  }

  const options = {
    new: true,
  };

  Article.findOneAndUpdate({ _id: id }, parameters, options, (err, updated) => {
    if (err || !updated) {
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar.",
      });
    }

    return res.status(200).json({
      status: "success",
      updated,
      message: "Se ha actualizado el artículo.",
    });
  });
};

module.exports = {
  saveArticle,
  getArticles,
  getAnArticle,
  deleteArticle,
  updateArticle,
};
