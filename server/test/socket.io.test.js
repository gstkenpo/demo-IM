const { User } = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const setCookie = require('set-cookie-parser');
const saltRound = Number(process.env.SALT_ROUND);
const jwtSecret = process.env.JWT_SECRET;
const prefix = 'login.test_';
const io = require('socket.io-client');
const www = require('../bin/www');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const socketUrl = 'http://localhost:3001';

chai.should();
chai.use(chaiHttp);

const options = {  
    transports: ['websocket'],
    'force new connection': true
  };
  
  var room = 'lobby';
  
  describe('Test Sending Message With Socket', function () {
    let client1, client2, client3;
    let jwt;
    before(async () => {
		const hashedPw = await bcrypt.hash('password', saltRound);
		const user = new User({
			userName: prefix + 'userName1',
			email: prefix + 'email',
			password: hashedPw
		});
		await user.save();
	});

	after(async () => {
		await User.deleteMany({userName: prefix + 'userName1'}).exec();        
	});
  
    it('should be able to connect and disconnect with authentication', function (done) {
        chai
			.request(socketUrl)
			.post('/rest/login')
			.send(
				{
					'userName': prefix + 'userName1',
					'password': 'password'
				}
			)
			.end((err, res) => {
				res.should.have.status(200);
				const cookies = setCookie.parse(res);
				jwt = cookies[0].value;
        options.auth = {token: `Bearer ${jwt}`};
        client1 = io.connect(socketUrl, options);
        client1.on('connect', () => {
          client1.close();
        });
        client1.on('disconnect', () => {
          done();
        });
        });
      });
  });

  /**
   * source: https://alexzywiak.github.io/testing-socket-io-with-mocha-and-chai/index.html
   * https://socket.io/get-started/private-messaging-part-1/
  **/