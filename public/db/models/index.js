const users = require('./users');
//
const products = require('./products');
const categorys = require('./categorys');
//
const products_categorys = require('./products_categorys');
//
const imgs = require('./imgs');

module.exports = (Sequelize, DataTypes) => {
	return {
		Users: users(Sequelize, DataTypes),
		Products: products(Sequelize, DataTypes),
		Categorys: categorys(Sequelize, DataTypes),
		Products_categorys: products_categorys(Sequelize, DataTypes),
		Imgs: imgs(Sequelize, DataTypes),
	};
};
