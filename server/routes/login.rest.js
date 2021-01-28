const express = require('express');
const createError = require('http-errors');
const {body} = require('express-validator');
const userService = require('../service/userService');
const jwtService = require('../service/jwtService');
const router = express.Router();
const url = '/login';

/**
 * @param userName
 * @param password
 * @returns JWT token
 */
router.post(url, 
	body('userName').not().isEmpty().withMessage('user name can\'t be empty '),
	async(req, res, next) => {
		const {userName, password} = req.body;
		if (await userService.validateUser(userName, password)) {
			try {
				const jwtToken = jwtService.sign(userName);
				return res.status(200).cookie('Authorization', jwtToken, {httpOnly: true }).send();
			} catch (err) {
				console.log('jwt signing error: ' + err);
				next(createError(400, 'unexpected error occur'));
			}
		} else next(new Error('login failed, please try again'));
	});
module.exports = router;