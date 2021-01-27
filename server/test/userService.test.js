const { expect, assert} = require("chai");
const app = require("../app.js");
const userService = require("../service/userService.js");
const prefix = "userService.test_"

describe('User Registation Test', () => {
    it('create user', async () => {
        try {
            const user = await userService.createUser(prefix + 'userName', prefix + 't@t.com', 'password');
            expect(user, 'create user').to.be.a('object')
                            .that.to.include({userName: prefix + 'userName', email: prefix + 't@t.com'});

        } catch (err) {
            if (err) console.log(err);
            expect(err).to.be.null;
        };
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
    })

    it('delete user by email', () => {
        userService.deleteByEmail(prefix + 't@t.com')
        .then(msg => {
            expect(msg, 'delete user by email').to.include({deletedCount:1})
        }).catch(err => {
            if (err) console.log(err);
            expect(err).to.be.null;
        })
    })
})