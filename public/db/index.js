const { Sequelize, DataTypes } = require('sequelize');

const init_models = require('./models/');
const keys = require('./keys/');
const pre_into = require('./contents');
const path = require('path');
// conet with database

const storage = path.resolve('src/db/sql/InitDB.sqlite');

const sequelize = new Sequelize({ dialect: 'sqlite', storage });

// inits
const model = init_models(sequelize, DataTypes);

keys(model);

const force = false;
sequelize.sync({ force }).then((resp) => {
	if (resp) console.log('Init DB SUCCESS');
	else console.log('Init DB err');

	if (force) pre_into(model);
});

module.exports = model;
