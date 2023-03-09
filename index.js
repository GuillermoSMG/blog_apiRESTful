const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

const PORT = 3000;

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

const article_routes = require("./routes/article");

app.use("/api", article_routes);

app.get("/", (req, res) => {
  return res.status(200).send({
    titulo: "Anaconda",
    categoria: "aventura",
  });
});

//create server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
