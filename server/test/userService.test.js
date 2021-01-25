const { expect, assert} = require("chai");
const app = require("../app.js");
const userService = require("../service/userService.js");

describe('User Registation Test', () => {
    it('create user', () => {
        userService.createUser('userName', 't@t.com', 'password')
        .then((user) => {
            expect(user, 'create user').to.be.a('object')
                        .that.to.include({userName: 'userName',
                                        email: 't@t.com',
                                        password: 'password'});
        }).catch((err) => {
            if (err) console.log(err);
            expect(err).to.be.null;
        });
    });
    
    it('query user by email', () => {
        userService.findByEmail('t@t.com')
        .then(user => {
            expect(user[0], 'error occur in query').to.be.a('object')
                        .that.to.include({userName: 'userName',
                                        email: 't@t.com',
                                        password: 'password'});
        }).catch((err) => {
            if (err) console.log(err);
            expect(err).to.be.null;
        });
    })

    it('delete user by email', () => {
        userService.deleteByEmail('t@t.com')
        .then(msg => {
            expect(msg, 'delete user by email').to.include({deletedCount:1})
        }).catch(err => {
            if (err) console.log(err);
            expect(err).to.be.null;
        })
    })
})