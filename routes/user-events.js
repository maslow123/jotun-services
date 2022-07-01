const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/user-events');
const auth = require('../middlewares/auth');
const slug = '/user-event';

router.post(`${slug}/create`, auth.verifyTokenMiddleware, controllers.createUserEvent);
router.get(`${slug}/get/:sub_event_id`, auth.verifyTokenMiddleware, controllers.getUserEventBySubEventID);

module.exports = router;