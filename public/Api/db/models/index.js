const users = require('./users');
const clients = require('./clients');
//
const products = require('./products');
const categorys = require('./categorys');
//
const sales = require('./sales');
//
const imgs = require('./imgs');
const rols = require('./rols');
//
const historys = require('./historys');
const sales_products = require('./sales_products');
//
const vendors = require('./vendors');
const notes = require('./notes');

module.exports = (Sequelize, DataTypes) => {
	return {
		Users: users(Sequelize, DataTypes),
		Products: products(Sequelize, DataTypes),
		Categorys: categorys(Sequelize, DataTypes),
		Imgs: imgs(Sequelize, DataTypes),
		Rols: rols(Sequelize, DataTypes),
		Clients: clients(Sequelize, DataTypes),
		Sales: sales(Sequelize, DataTypes),
		Sales_Products: sales_products(Sequelize, DataTypes),
		Historys: historys(Sequelize, DataTypes),
		Vendors: vendors(Sequelize, DataTypes),
		Notes: notes(Sequelize, DataTypes),
	};
};
