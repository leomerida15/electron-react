module.exports = (sequelize, type) => {
	const { INTEGER, STRING, DATE } = type;

	const clients = sequelize.define(
		'clients',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			email: { type: STRING, unique: true },
			name: { type: STRING },
			last_name: { type: STRING },
			document: { type: INTEGER },
			phone: { type: STRING },
			direction: { type: STRING },
			date_birth: { type: DATE },
			id_rol: { type: INTEGER },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return clients;
};
