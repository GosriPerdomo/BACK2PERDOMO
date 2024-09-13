const express = require('express');
const router = express.Router();
const sessionsController = require('../controller/sessions.controller');

router.get('/current', sessionsController.current);

module.exports = router;
