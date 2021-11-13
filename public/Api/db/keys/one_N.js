module.exports = (model) => {
	const { Categorys, Products, Users, Rols, Sales_Products, Sales, History, Clients } = model;
	// usuarios at Roles_has_usuarios
	//
	Categorys.hasMany(Products, { foreignKey: 'id_categoria' });
	//
	Products.hasMany(Sales_Products, { foreignKey: 'id_product' });
	Sales.hasMany(Sales_Products, { foreignKey: 'id_sale' });
	//
	Rols.hasMany(Clients, { foreignKey: 'id_rol' });
	Rols.hasMany(Users, { foreignKey: 'id_rol' });
	Users.hasMany(Products, { foreignKey: 'id_user' });
	Users.hasMany(History, { foreignKey: 'id_user' });
	// Users.hasMany(Products, { foreignKey: 'id_user' });
	Clients.hasMany(Sales, { foreignKey: 'id_client' });
};
