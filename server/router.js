const router = require('express').Router();

const users = require('./controllers/users.controller.js');
const listings = require('./controllers/listings.controller.js');
const skills = require('./controllers/skills.controller.js');

router.get('/users', users.getAll);
router.post('/users', users.post);

router.get('/listings', listings.getAll);
router.post('/listings', listings.post);

router.get('/skills', skills.getAll);
router.post('/skills', skills.post);

router.get('/*', () => res.status(404).send('Page not found')); // Catchall for not found

module.exports = router;
