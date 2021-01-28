const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		unique: true,
		required: [true, 'userName is required.']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'email is required.']
	},
	password: {
		type: String,
		//this would be the hash value of password, so no need to check password length here.
		required: [true, 'password is required.']
	}
});

const User = mongoose.model('User', UserSchema);
exports.User = User;