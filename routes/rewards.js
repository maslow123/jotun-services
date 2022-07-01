const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/rewards');
const slug = '/rewards';
router.post(`${slug}/create`, controllers.createReward);
router.get(`${slug}/list`, controllers.getRewards);

module.exports = router;