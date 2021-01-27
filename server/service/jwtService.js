const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRY;

const sign = (userName) => {
    return jwt.sign({
            userName: userName
        }, jwtSecret, {
            expiresIn: jwtExpiry
        });
}

exports.sign = sign;