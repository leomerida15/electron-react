module.exports = (sequelize, type) => {
	const { INTEGER } = type;

	const imgs = sequelize.define(
		'imgs_users',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_img: { type: INTEGER },
			id_user: { type: INTEGER },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return imgs;
};
