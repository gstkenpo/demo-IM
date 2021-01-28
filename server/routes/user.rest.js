const express = require('express');
const { body, validationResult } = require('express-validator');
const userService = require('../service/userService');
const jwtService = require('../service/jwtService');
const authValidator = require('../validator/authValidator');
const createError = require('http-errors');
const router = express.Router();
const url = '/user';

/**
 * create user restful API
 * @param email
 * @param userName
 * @param password
 * @returns a jwt token with code 201
 */
router.post(url,
	body('email').isEmail().custom(authValidator.duplicateEmail),
	body('userName').not().isEmpty().withMessage('user name can\'t be empty ').custom(authValidator.duplicateUserName),
	body('password').isLength({min: 7}),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {userName, email, password} = req.body;
		try {
			const user = await userService.createUser(userName, email, password);
			try {
				const jwtToken = jwtService.sign(user.userName);
				return res.status(201).json({token: jwtToken});
			} catch (err) {
				console.log('jwt signing error: ' + err);
				next(createError(400, 'unexpected error occur'));
			}
		} catch (err) {
			console.log('error occur in creation: ' + err);
			next(createError(400, 'unexpected error occur'));
		}
	});

/**
 * @param email
 * @returns user id and userName JSON format
 */
router.get(url, (req, res, next) => {
	const email = req.params['email'];
	userService.findByEmail(email)
		.then(user => {
			return res.json(user);
		}).catch(err => {
			console.log('error occur: ' + err);
			next(createError(400, 'unexpected error occur'));
		});
});

module.exports = router;