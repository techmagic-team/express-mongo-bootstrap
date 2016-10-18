'use strict';

const async = require('async');
const fs = require('fs');

module.exports.dropCollections = (mongoose) => {
  if (!mongoose) {
    mongoose = require('mongoose');
  }
  return async.forEachOf(mongoose.connection.collections, (value, collectionName, done) => {
    mongoose.connection.collections[collectionName].drop(done);
  }, (err) => {
    if (err) {
      console.log('Clean collection failed to process');
      console.error(err);
    } else {
      console.log('All collections have been cleaned successfully');
    }
  });
};

module.exports.seedDatabase = (seeds, mongoose) => {
  if (!mongoose) {
    mongoose = require('mongoose');
  }
  const seeders = fs.readdirSync(seeds);
  return async.each(seeders, (file, callback) => {
    const seeder = require(seeds + '/' + file);
    mongoose.model(seeder.model).create(seeder.data, callback);
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
