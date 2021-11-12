module.exports = (model) => {
	const { Categorys, Products, Users, Products_categorys } = model;
	// usuarios at Roles_has_usuarios
	Categorys.hasMany(Products_categorys, { foreignKey: 'id_categoria' });
	Products.hasMany(Products_categorys, { foreignKey: 'id_product' });
	//
	Users.hasMany(categorys, { foreignKey: 'id_user' });
	Users.hasMany(Products, { foreignKey: 'id_user' });
};
