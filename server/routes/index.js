const express = require('express');
const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/welcome', function (req, res, next) {
	res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

module.exports = router;
