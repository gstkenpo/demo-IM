const { expect, assert} = require('chai');
const { User } = require('../model/user.js');
const userService = require('../service/userService.js');
const bcrypt = require('bcrypt');
const saltRound = Number(process.env.SALT_ROUND);
const prefix = 'userService.test_';

describe('User Registation Test', () => {
	it('create user', async () => {
		try {
			const user = await userService.createUser(prefix + 'userName', prefix + 't@t.com', 'password');
			expect(user, 'create user').to.be.a('object')
				.that.to.include({userName: prefix + 'userName', email: prefix + 't@t.com'});

		} catch (err) {
			if (err) console.log(err);
			expect(err).to.be.null;
		}
	});
    
	it('query user by email', () => {
		userService.findByEmail(prefix + 't@t.com')
			.then(user => {
				expect(user[0], 'error occur in query').to.be.a('object')
					.that.to.include({userName: prefix + 'userName',
						email: prefix + 't@t.com'});
			}).catch((err) => {
				if (err) console.log(err);
				expect(err).to.be.null;
			});
	});

	it('delete user by email', () => {
		userService.deleteByEmail(prefix + 't@t.com')
			.then(msg => {
				expect(msg, 'delete user by email').to.include({deletedCount:1});
			}).catch(err => {
				if (err) console.log(err);
				expect(err).to.be.null;
			});
	});
});

describe('Validate User Test', () => {
	before(async () => {
		const hashedPw = await bcrypt.hash('password', saltRound);
		const user = new User({
			userName: prefix + 'userName',
			email: prefix + 'email',
			password: hashedPw
		});
		await user.save();
	});

	after(async () => {
		await User.deleteMany({userName: prefix + 'userName'}).exec();        
	});
    
	it ('validate match', async() => {
		const userName = prefix + 'userName';
		const password = 'password';
		assert.ok(await userService.validateUser(userName, password));
	});

	it ('validate mismatch', async() => {
		const userName = prefix + 'userName';
		const password = 'wrong-password';
		assert.notOk(await userService.validateUser(userName, password));
	});

	it ('validate username missing', async() => {
		const password = 'password';
		assert.notOk(await userService.validateUser(null, password));
	});
});