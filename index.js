const express = require("express");
const path = require("path");
const BlogPost = require("./models/BlogPost");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");

let ejsOptions = {
  // delimiter: '?', Adding this to tell you do NOT use this like I've seen in other docs, does not work for Express 4
  async: true,
};

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", { blogposts });
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

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/store", async (req, res) => {
  await BlogPost.create(req.body, (error, blogpost) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
