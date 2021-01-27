const userService = require('../service/userService');

const duplicateEmail = async (email) => {
    if (!email) return Promise.reject('Email is empty');
    const user = await userService.findByEmail(email);
    if (user.length > 0) return Promise.reject('E-mail already in use');
}

module.exports = duplicateEmail;