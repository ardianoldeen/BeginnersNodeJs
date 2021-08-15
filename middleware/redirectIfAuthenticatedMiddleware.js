module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect("/"); // if user logged in, redirect to home page
  }
  next();
};
