module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const imgs = sequelize.define(
		'imgs',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			note: { type: STRING, unique: true },
			origin: { type: STRING },
		},
		{ freezeTableName: true, timestamps: true },
	);

	return imgs;
};
