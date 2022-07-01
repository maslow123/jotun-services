const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/master');
const slug = '/master';
router.get(`${slug}/list`, controllers.getMasterData);

module.exports = router;