module.exports = (model) => {
	const { Users, Imgs } = model;
	// usuarios at Roles_has_usuarios
	Imgs.hasOne(Users, { foreignKey: 'id_img' });
};
