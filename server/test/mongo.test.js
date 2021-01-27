const app = require("../app.js");

const mongoose = require('mongoose');
const { expect } = require("chai");

describe('Test mongoose object', () => {
    it('test mongoose object', () => {
        expect(mongoose).to.be.a('object');
    })
    
    it('test mongoose connection fine', ()=>{
        const db = mongoose.connection;
        expect(db.readyState).equal(mongoose.STATES.connected);
    })
})

describe('test query/ save/ delete mongo', () => {
    const kittySchema = new mongoose.Schema({
        name: String
      });
    const Kitten = mongoose.model('Kitten', kittySchema);
    const silence = new Kitten({ name: 'Silence' });
    it ('test save', () => {
        silence.save((err, silence) => {
            expect(err).to.be.null;
        });
    })
    it('test query', () => {
        Kitten.find({name: "Silence"}, (err, silences) => {
            expect(err).to.be.null;
            expect(silences).length(1);
        })
    });

    it('test delete', () => {
        Kitten.deleteMany({name: "Silence"}, (err, result) => {
            expect(err).to.be.null;
            expect(result).that.to.include({deletedCount:1})
        })
    })
})
