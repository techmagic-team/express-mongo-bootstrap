'use strict';

const async = require('async');
const _ = require('underscore');
const Helpers = (mongoose) => {
  this.mongoose = mongoose || require('mongoose');
  this.dropCollections = (callback) => {
    const collections = _.keys(mongoose.connection.collections);
    async.forEach(collections, (collectionName, done) => {
      const collection = mongoose.connection.collections[collectionName];
      collection.drop((err) => {
        if (err && err.message != 'ns not found') done(err);
        done(null);
      });
    }, callback);
  };
};

module.exports = Helpers;
