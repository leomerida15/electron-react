const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const init_models = require('./models');
const keys = require('./keys');
const contents = require('./contents');
const path = require('path');
// conet with database

const storage = path.resolve('public/Api/db/sql/DB.sqlite');

const sequelize = new Sequelize({ dialect: 'sqlite', storage, logging: false });

// inits
const model = init_models(sequelize, DataTypes);

keys(model);

const force = process.env.npm_lifecycle_event === 'DB:refresh';
sequelize.sync({ force: true }).then(async (resp) => {
	if (force) await contents(model);

	if (resp) console.log('Init DB SUCCESS');
	else console.log('Init DB err');
});

module.exports = model;
