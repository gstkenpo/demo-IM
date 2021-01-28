const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const { User } = require('../model/user');
const setCookie = require('set-cookie-parser');
const prefix = 'user.test_';
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

chai.should();
chai.use(chaiHttp);

describe('/Create User', () => {
	it('it should return a jwt token with code 201', done => {
		chai
			.request(app)
			.post('/rest/user')
			.send(
				{
					'email': prefix + 'testing@t.com',
					'password': 'password',
					'userName': prefix + 'testingUserNmae'
				}
			)
			.end((err, res) => {
				res.should.have.status(201);
				const cookies = setCookie.parse(res);
				const token = cookies[0].value;
				const decoded = jwt.verify(token, jwtSecret);
				assert.equal(decoded.userName, prefix + 'testingUserNmae');
				done();
			});
	});

	it('it should return error, User Name already in use', done => {
		chai
			.request(app)
			.post('/rest/user')
			.send(
				{
					'email': prefix + 'testing@tx.com',
					'password': 'password',
					'userName': prefix + 'testingUserNmae'
				}
			)
			.end((err, res) => {
				res.should.have.status(400);
				res.body.errors[0].should.have.property('msg').eql('User Name already in use');
				done();
			});
	});

	it('it should return error 401', done => {
		chai
			.request(app)
			.get('/rest/user')
			.query(
				{
					'email': prefix + 'testing@tx.com'
				}
			)
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
});

after(async () => {
	await User.deleteMany({'email': prefix + 'testing@t.com'}).exec();
});