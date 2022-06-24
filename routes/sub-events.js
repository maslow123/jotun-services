const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/sub-events');
const slug = '/sub-event';
router.post(`${slug}/create`, controllers.createSubEvent);

module.exports = router;