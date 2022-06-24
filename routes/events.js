const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/events');
const slug = '/event';
router.post(`${slug}/create`, controllers.createEvent);
router.get(`${slug}/list`, controllers.getEvents);

module.exports = router;