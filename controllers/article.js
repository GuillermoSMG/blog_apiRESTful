const Article = require("../templates/Article");
const { validateArticle } = require("../helper/validate");
const fs = require("fs");
const path = require("path");

const saveArticle = (req, res) => {
  let parameters = req.body;
  try {
    validateArticle(parameters);
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
    validateArticle(parameters);
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

const uploadImage = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      message: "Petición inválida.",
    });
  }

  let fileName = req.file.originalname;

  //file extension
  let fileNameSplit = fileName.split(".");
  let fileExt = fileNameSplit[1];

  if (
    fileExt != "png" &&
    fileExt != "jpg" &&
    fileExt != "jpeg" &&
    fileExt != "gif"
  ) {
    fs.unlink(req.file.path, (err) => {
      return res.status(400).json({
        status: "error",
        message: "Archivo inválido.",
      });
    });
  } else {
    let id = req.params.id;
    const options = {
      new: true,
    };

    Article.findOneAndUpdate(
      { _id: id },
      { image: req.file.filename },
      options,
      (err, updated) => {
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
      }
    );
  }
};

const getImage = (req, res) => {
  let file = req.params.file;
  let filePath = `./images/articles/${file}`;

  fs.stat(filePath, (err, exists) => {
    if (exists) {
      return res.sendFile(path.resolve(filePath));
    } else {
      return res.status(404).json({
        status: "error",
        message: "No se ha podido encontrar el archivo.",
      });
    }
  });
};

const search = (req, res) => {
  let searchString = req.params.searchString;

  Article.find({
    $or: [
      {
        title: {
          $regex: searchString,
          $options: "i",
        },
      },
      {
        content: {
          $regex: searchString,
          $options: "i",
        },
      },
    ],
  })
    .sort({ fecha: -1 })
    .exec((err, findArticles) => {
      if (err || !findArticles || findArticles.length <= 0) {
        return res.status(404).json({
          status: "error",
          message: "No se ha encontrado el artículo.",
        });
      }

      return res.status(200).json({
        status: "success",
        findArticles,
      });
    });
};

module.exports = {
  saveArticle,
  getArticles,
  getAnArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
  getImage,
  search,
};
