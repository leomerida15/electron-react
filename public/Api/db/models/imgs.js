module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const imgs = sequelize.define(
		'imgs',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			path: { type: STRING, unique: true },
			id_relation: { type: INTEGER },
			origin: { type: STRING },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return imgs;
};
