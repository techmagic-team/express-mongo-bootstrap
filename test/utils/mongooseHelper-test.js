'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const path = require('path')
const mocha = require('mocha')
const mongoose = require('mongoose')
const expect = chai.expect
chai.use(chaiHttp)

const mongooseHelper = require('./../../app/utils/mongooseHelper')

describe('mongooseHelper:', () => {
  describe('#seedDatabase()', () => {
    mocha.before((done) => {
      const seedsPath = path.join(__dirname, '../../app/seeds')
      mongooseHelper.seedDatabase(seedsPath, null, (err) => {
        expect(err).to.not.exist
        done()
      })
    })
    it('should seed database', (done) => {
      mongoose.model('user').count((err, count) => {
        expect(err).to.not.exist
        done()
      })
    })
  })
})
