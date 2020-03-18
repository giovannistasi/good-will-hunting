module.exports = {
  authorise: function (req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('You need to be logged in to view this page');
    res.redirect('/users/login');
  }
}