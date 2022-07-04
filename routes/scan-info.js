const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/scan-info');
const slug = '/scan-info';
router.put(`${slug}/update`, controllers.updateScanInfo);

module.exports = router;