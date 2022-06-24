const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/user-events');
const slug = '/user-event';
router.post(`${slug}/create`, controllers.createUserEvent);

module.exports = router;