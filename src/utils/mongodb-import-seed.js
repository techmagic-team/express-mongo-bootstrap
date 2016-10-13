'use strict';

const fs = require('fs');

module.exports.f = (models, seeds) => {
  const seeders = fs.readdirSync(seeds);
  seeders.forEach((seeder) => {
    const see = require(seeds + '/' + seeder);
    const modelPath = models + '/' + see.model;
    const model = require(modelPath);
    model.create(see.collection);
  });
};
