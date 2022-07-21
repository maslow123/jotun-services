const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/users');
const auth = require('../middlewares/auth');
const slug = '/user';
router.post(`${slug}/register`, controllers.createUser);
router.post(`${slug}/login`, controllers.loginUser);

router.get(`${slug}/qr-validate`, auth.verifyTokenMiddleware, auth.verifyHelpdeskPrevilege, controllers.qrValidate);

router.get(`${slug}/list`, auth.verifyTokenMiddleware, auth.verifyHelpdeskPrevilege, controllers.list);
router.put(`${slug}/update`, auth.verifyTokenMiddleware, auth.verifyHelpdeskPrevilege, controllers.updateUser);
router.post(`${slug}/helpdesk/login`, controllers.loginHelpdesk);

module.exports = router;