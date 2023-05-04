const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const article_routes = require("./routes/article");
const user_routes = require("./routes/user");

dotenv.config();

console.log("App started.");

//db connection
connection();

//create node app
const app = express();

//config cors
app.use(cors());

//body to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create routes

app.use("/api/articles", article_routes);
app.use("/api/user", user_routes);

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "hola",
  });
});

const port = process.env.PORT || 3000;

//create server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
