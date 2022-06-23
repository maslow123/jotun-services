const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/users');
const slug = '/user';
router.post(`${slug}/register`, controllers.createUser);

module.exports = router;