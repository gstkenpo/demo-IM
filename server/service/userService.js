const {User} = require("../model/user");
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
}

const findByEmail = async (email) => {
    if (!email) return Promise.reject();
    return await User.find({email: email}).exec();
}

const findByUserName = async (userName) => {
    if (!userName) return Promise.reject();
    return await User.find({userName: userName}).exec();
}

const deleteByEmail = async (email) => {
    if (!email) return Promise.reject();
    return await User.deleteOne({email: email}).exec();
}

exports.createUser = createUser;
exports.findByEmail = findByEmail;
exports.findByUserName = findByUserName;
exports.deleteByEmail = deleteByEmail;