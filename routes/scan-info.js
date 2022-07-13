const { Router } = require('express');
const auth = require('../middlewares/auth');
const router = Router();
const controllers = require('../controllers/scan-info');
const slug = '/scan-info';
router.put(`${slug}/update`, auth.verifyTokenMiddleware, controllers.updateScanInfo);

module.exports = router;