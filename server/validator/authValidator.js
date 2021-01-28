const userService = require('../service/userService');

const duplicateUserName = (userName) => {
	if (!userName) return Promise.reject('User Name is empty');
	return userService.findByUserName(userName)
		.then(user => {
			if (user) return Promise.reject('User Name already in use');
		});
};

const duplicateEmail = async (email) => {
	if (!email) return Promise.reject('Email is empty');
	const user = await userService.findByEmail(email);
	if (user.length > 0) return Promise.reject('E-mail already in use');
};


module.exports.duplicateUserName = duplicateUserName;
module.exports.duplicateEmail = duplicateEmail;