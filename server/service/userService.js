const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const saltRound = Number(process.env.SALT_ROUND);

const createUser = async (userName, email, password) => {
	const hashedPw = await bcrypt.hash(password, saltRound);
	const user = new User({userName: userName, email: email, password: hashedPw});
	try {
		return await user.save();
	} catch (err) {
		console.log('err: ' + err);
		throw err;
	}
};

const findByEmail = async (email) => {
	if (!email) return Promise.reject();
	return await User.find({email: email}).exec();
};

const findByUserName = async (userName) => {
	if (!userName) return Promise.reject();
	return await User.findOne({userName: userName}).exec();
};

const deleteByEmail = async (email) => {
	if (!email) return Promise.reject();
	return await User.deleteOne({email: email}).exec();
};

const validateUser = async(userName, password) => {
	if (!userName) return false;
	const user = await this.findByUserName(userName);
	if (!user) return false;
	try {
		return await bcrypt.compare(password, user.password);
	} catch (err) {
		console.log('validateUser error: ' + err);
		return false;
	}
};

exports.createUser = createUser;
exports.findByEmail = findByEmail;
exports.findByUserName = findByUserName;
exports.deleteByEmail = deleteByEmail;
exports.validateUser = validateUser;