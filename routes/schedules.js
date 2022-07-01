const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/schedules');
const auth = require('../middlewares/auth');
const slug = '/schedule';
router.post(`${slug}/create`, controllers.createSchedules);
router.get(`${slug}/list`, auth.verifyTokenMiddleware, controllers.getSchedules);

module.exports = router;