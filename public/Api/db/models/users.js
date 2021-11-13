module.exports = (sequelize, type) => {
	const { INTEGER, STRING, BOOLEAN } = type;

	const users = sequelize.define(
		'users',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			email: { type: STRING, unique: true },
			password: { type: STRING },
			id_rol: { type: INTEGER },
			active: { type: BOOLEAN },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return users;
};