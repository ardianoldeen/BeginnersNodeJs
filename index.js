const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydatabase", { useNewUrlParser: true });

const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
  //res.sendFile(path.resolve(__dirname, "pages/index.html"));
});
app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/about.html"));
  res.render("about");
});
app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/contact.html"));
  res.render("contact");
});
app.get("/post", (req, res) => {
  // res.sendFile(pgitath.resolve(__dirname, "pages/post.html"));
  res.render("post");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
