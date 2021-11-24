module.exports = (sequelize, type) => {
	const { INTEGER, STRING, BOOLEAN } = type;

	const users = sequelize.define(
		'users',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			email: { type: STRING, unique: true },
			password: { type: STRING },
			id_img: { type: INTEGER },
			id_rol: { type: INTEGER, defaultValue: 3 },
			active: { type: BOOLEAN, defaultValue: true },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return users;
};
