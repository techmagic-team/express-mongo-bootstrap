'use strict';

const env = process.env.NODE_ENV || 'development';
const _config = require('../config/_config.json')[env];
const errorHelper = require('./errorHelper');
const pug = require('pug');
const ses = require('node-ses');
const client = ses.createClient({
  key: _config.aws.accessKeyId,
  secret: _config.aws.secretAccessKey
});

module.exports.client = client;

module.exports.sendEmail = (emailBody) => {
  return new Promise((resolve, reject) => {
    this.client.sendEmail(emailBody, (err) => {
      if (err) {
        const error = errorHelper.serverError(err);
        return reject(error);
      }
      return resolve(true);
    });
  });
};

module.exports.sendWelcomeEmail = (obj) => {
  try {
    const data = {
      email: obj.email,
    };
    const html = pug.renderFile('views/emails/welcome.pug', data);
    const email = {
      to: obj.email,
      from: _config.email,
      subject: 'Welcome.',
      message: html
    };
    return this.sendEmail(email);
  } catch (err) {
    const error = errorHelper.serverError(err);
    throw (error);
  }
};
