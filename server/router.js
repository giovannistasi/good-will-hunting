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
router.get('/user-listings', authMiddleWare.authorise, listings.getListingByUserId);
router.delete('/user-listings', authMiddleWare.authorise, listings.delete);
router.post('/listings', authMiddleWare.authorise, listings.post);

router.get('/skills', skills.getAll);
router.get('/user-skills', skills.getSkillByUserId);
router.delete('/user-skills', authMiddleWare.authorise, skills.delete);
router.post('/skills', authMiddleWare.authorise, skills.post);

router.post('/volunteer', authMiddleWare.authorise, listings.volunteer)

router.get('/auth', authMiddleWare.authoriseAndRespond)

module.exports = router;
