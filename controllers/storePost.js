const BlogPost = require("../models/BlogPost");
module.exports = async (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    console.log(error);
    await BlogPost.create({
      ...req.body,
      image: "/img/" + image.name,
      userid: req.session.userID,
    });
  });
  res.redirect("/");
};
