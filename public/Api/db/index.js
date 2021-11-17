const { Sequelize, DataTypes } = require('sequelize');

const init_models = require('./models/');
const keys = require('./keys/');
const contents = require('./contents');
const path = require('path');
// conet with database

const storage = path.resolve('src/db/sql/InitDB.sqlite');

const sequelize = new Sequelize({ dialect: 'sqlite', storage });

// inits
const model = init_models(sequelize, DataTypes);

keys(model);

const force = process.env.npm_lifecycle_event === 'DB:refresh';
sequelize.sync({ force }).then(async (resp) => {
	if (force) await contents(model);

	if (resp) console.log('Init DB SUCCESS');
	else console.log('Init DB err');
});

module.exports = model;
