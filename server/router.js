const router = require('express').Router();

const authMiddleWare = require('./middlewares/authentication');

const users = require('./controllers/users.controller.js');
const listings = require('./controllers/listings.controller.js');
const skills = require('./controllers/skills.controller.js');

// router.get('/login', users.login)

router.post('/login', users.login)
router.post('/register', users.register);

router.get('/logout', users.logout);

router.get('/login',
  function (req, res) {
    res.render('login')
  });

router.get('/users', users.getAll);

router.get('/listings', listings.getAll);
router.post('/listings', listings.post); // , authMiddleWare.authorise

router.get('/skills', skills.getAll);
router.post('/skills', skills.post); //, authMiddleWare.authorise

router.get('/*', (req, res) => res.status(404).send('Page not found')); // Catchall for not found

module.exports = router;
