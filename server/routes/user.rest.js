const express = require("express");
const { body, validationResult } = require('express-validator');
const userService = require("../service/userService");
const jwtService = require("../service/jwtService");
const duplicateEmail = require("../validator/emailValidator");
const userNameValidator = require("../validator/userNameValidator");
const router = express.Router();
const url = '/user';

//ES2017 standard
/**
 * create user restful API
 * @param email
 * @param userName
 * @param password
 * @returns a jwt token with code 201
 */
router.post(url,
body('email').isEmail().custom(duplicateEmail),
body('userName').not().isEmpty().withMessage('user name can\'t be empty ').custom(userNameValidator.duplicateUserName),
body('password').isLength({min: 7}),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const {userName, email, password} = req.body;
    try {
        const user = await userService.createUser(userName, email, password);
        try {
            const jwtToken = jwtService.sign(user.userName)
            return res.status(201).json({token: jwtToken});
        } catch (err) {
            console.log('jwt signing error: ' + err)
            return res.status(400).json({ errors: {msg: 'unexpected error occur'}});
        }
    } catch (err) {
        console.log('error occur in creation: ' + err);
        return res.status(400).json({ errors: {msg: 'unexpected error occur'}});
    }
});

/**
 * @param email
 * @returns user id and userName JSON format
 */
router.get(url, (req, res) => {
    const body = req.body;
    userService.findByEmail(body.email)
    .then(user => {
        return res.json(user);
    }).catch(err => {
        console.log('error occur: ' + err);
        return res.json('unexpected error occur');
    });
});

module.exports = router;