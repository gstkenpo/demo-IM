const app = require("../app.js");

const { expect, assert } = require("chai");
const { User } = require("../model/user");

describe("/Test Save User Validation", () => {
    it ('validate empty', () => {
        const user = new User();
        const err = user.validateSync();
        assert.ok(err);
        assert.equal(err.errors['userName'].message, 'userName is required.');
        assert.equal(err.errors['email'].message, 'email is required.');
        assert.equal(err.errors['password'].message, 'password is required.');
    })
});