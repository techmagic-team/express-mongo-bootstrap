'use strict';

const async = require('async');
const fs = require('fs');

module.exports.dropCollections = (mongoose) => {
  return async.forEachOf(mongoose.connection.collections, (value, collectionName, done) => {
    const collection = mongoose.connection.collections[collectionName];
    collection.drop((err) => {
      if (err && err.message != 'ns not found') done(err);
      done(null);
    });
  }, (err) => {
    if (err) {
      console.log('Clean collection failed to process');
      console.error(err);
    } else {
      console.log('All collections have been cleaned successfully');
    }
  });
};

module.exports.seedDatabase = (models, seeds) => {
  const seeders = fs.readdirSync(seeds);
  return async.each(seeders, (file, callback) => {
    const seeder = require(seeds + '/' + file);
    const modelPath = models + '/' + seeder.model;
    const model = require(modelPath);
    model.create(seeder.collection, (err) => {
      if (err) {
        callback(err);
      }
      callback();
    });
  }, (err) => {
    // if any of the file processing produced an error, err would equal that error
    if (err) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A seeder failed to process');
      console.error(err);
    } else {
      console.log('All seeders have been processed successfully');
    }
  });
};
