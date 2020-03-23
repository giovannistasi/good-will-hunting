module.exports = {
  authorise: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('You need to be logged in to view this page');
  },
  authoriseAndRespond: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.send(req.session.passport.user)
      return
    }
    res.status(401).send('You need to be logged in to view this page');
  }
}