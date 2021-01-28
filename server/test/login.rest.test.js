const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const { User } = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const setCookie = require('set-cookie-parser');
const saltRound = Number(process.env.SALT_ROUND);
const jwtSecret = process.env.JWT_SECRET;
const prefix = 'login.test_';

chai.should();
chai.use(chaiHttp);

describe('/Login User', () => {
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

	it('it should return a jwt token with code 200', done => {
		chai
			.request(app)
			.post('/rest/login')
			.send(
				{
					'userName': prefix + 'userName',
					'password': 'password'
				}
			)
			.end((err, res) => {
				res.should.have.status(200);
				const cookies = setCookie.parse(res);
				const token = cookies[0].value;
				const decoded = jwt.verify(token, jwtSecret);
				assert.equal(decoded.userName, prefix + 'userName');
				done();
			});
	});

	it('it should return error 401, authentication failed', done => {
		chai
			.request(app)
			.post('/rest/login')
			.send(
				{
					'userName': prefix + 'userName-not-exit',
					'password': 'password'
				}
			)
			.end((err, res) => {
				res.should.have.status(401);
				res.body.error.should.have.property('message').eql('login failed, please try again');
				done();
			});
	});
});