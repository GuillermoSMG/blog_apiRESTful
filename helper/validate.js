const validator = require("validator");

const validateArticle = (params) => {
  let validate_title =
    !validator.isEmpty(params.title) &&
    validator.isLength(params.title, { min: 1, max: 480 });
  let validate_content = !validator.isEmpty(params.content);

  if (!validate_content || !validate_title) {
    throw new Error("Información no valida.");
  }
};

module.exports = {
  validateArticle,
};
