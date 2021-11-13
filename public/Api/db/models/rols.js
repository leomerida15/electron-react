module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const rols = sequelize.define(
		'rols',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			name: { type: STRING, unique: true },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return rols;
};
