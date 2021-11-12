module.exports = (sequelize, type) => {
	const { INTEGER, STRING, BOOLEAN } = type;

	const categorys = sequelize.define(
		'categorys',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_user: { type: INTEGER },
			name: { type: STRING(45) },
			path: { type: STRING(250) },
			id_public: { type: STRING(45) },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return categorys;
};
