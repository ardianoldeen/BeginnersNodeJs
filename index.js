const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost");
const createHomeController = require("./controllers/createHome");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const validateMiddleWare = require("./middleware/validationMiddleware");
const newUserController = require("./controllers/newUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUsers");
const storeUsercontroller = require("./controllers/storeUser");
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
app.use(fileUpload());
app.use("/post/store", validateMiddleWare);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

app.get("/", createHomeController);

app.get("/post/new", newPostController);

app.get("/post/:id", getPostController);

app.get("/auth/register", newUserController);

app.post("/post/store", storePostController);

app.post("/user/register", storeUsercontroller);

app.get("auth/login", loginController);

app.post("/users/login", loginUserController);
