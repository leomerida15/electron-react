module.exports = (model) => {
	const { Imgs, Imgs_Users } = model;
	// usuarios at Roles_has_usuarios
	Imgs.hasOne(Imgs_Users, { foreignKey: 'id_img' });
	Imgs_Users.belongsTo(Imgs, { foreignKey: 'id_img' });
};
