module.exports = {
  authorise: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log(req.session.passport.user);

      res.send(req.session.passport.user)
      return next();
    }
    res.status(401).send('You need to be logged in to view this page');
    // res.redirect('/users/login'); /// can't redirect!!!
  }
}