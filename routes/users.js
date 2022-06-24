const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/users');
const slug = '/user';
router.post(`${slug}/register`, controllers.createUser);
router.post(`${slug}/login`, controllers.loginUser);

module.exports = router;