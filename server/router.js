const router = require('express').Router();

const authMiddleWare = require('./middlewares/authentication');

const users = require('./controllers/users.controller.js');
const listings = require('./controllers/listings.controller.js');
const skills = require('./controllers/skills.controller.js');

router.post('/login', users.login)
router.post('/register', users.register);

router.get('/logout', users.logout);

router.get('/users', users.getAll);

router.get('/listings', listings.getAll);
router.get('/user-listings', listings.getListingByUserId);
router.post('/listings', listings.post); // , authMiddleWare.authorise

router.get('/skills', skills.getAll);
router.get('/user-skills', skills.getSkillByUserId);
router.delete('/user-skills', skills.delete);
router.post('/skills', skills.post); //, authMiddleWare.authorise

router.get('/auth', authMiddleWare.authorise)

module.exports = router;
