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
const expressSession = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");
const flash = require("connect-flash");

const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");

let ejsOptions = {
  // delimiter: '?', Adding this to tell you do NOT use this like I've seen in other docs, does not work for Express 4
  async: true,
};
global.loggedIn = null;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use("/post/store", validateMiddleWare);
app.use(
  expressSession({
    secret: "astigago",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
app.use("*", (req, res, next) => {
  loggedIn = req.session.userID;
  next();
});

app.get("/", createHomeController);
app.get("/post/new", authMiddleware, newPostController);
app.get("/post/:id", getPostController);
app.get("/auth/logout", logoutController);
app.post("/post/store", authMiddleware, storePostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.post(
  "/user/register",
  redirectIfAuthenticatedMiddleware,
  storeUsercontroller
);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post("/user/login", redirectIfAuthenticatedMiddleware, loginUserController);

app.use((req, res) => res.render("notfound"));
