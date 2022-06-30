const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/confirm-invitation');
const slug = '/confirm-invitation';
router.post(`${slug}/resend`, controllers.resendConfirmInvitaion);

module.exports = router;