module.exports = (model) => {
	const { Categorys, Products, Users, Rols, Sales_Products, Sales, Historys, Clients } = model;
	// usuarios at Roles_has_usuarios
	Clients.hasMany(Sales, { foreignKey: 'id_client' });
	Users.hasMany(Sales, { foreignKey: 'id_user' });
	//
	Clients.hasMany(Historys, { foreignKey: 'id_client' });
	Users.hasMany(Historys, { foreignKey: 'id_user' });
	//
	Categorys.hasMany(Products, { foreignKey: 'id_categoria' });
	//
	Products.hasMany(Sales_Products, { foreignKey: 'id_product' });
	Sales.hasMany(Sales_Products, { foreignKey: 'id_sale' });
	//
	Rols.hasMany(Clients, { foreignKey: 'id_rol' });
	Rols.hasMany(Users, { foreignKey: 'id_rol' });
	Users.hasMany(Products, { foreignKey: 'id_user' });
	// Users.hasMany(Products, { foreignKey: 'id_user' });
};
