const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost");
const createHomeController = require("./controllers/createHome");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");

const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");

let ejsOptions = {
  // delimiter: '?', Adding this to tell you do NOT use this like I've seen in other docs, does not work for Express 4
  async: true,
};
const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/post/new");
  }
  next();
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use("/post/store", validateMiddleWare);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

app.get("/", createHomeController);

app.get("/post/new", newPostController);

app.get("/post/:id", getPostController);

app.post("/post/store", storePostController);
