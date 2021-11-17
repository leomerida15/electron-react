module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const imgs = sequelize.define(
		'imgs',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			note: { type: STRING },
			origin: { type: STRING },
		},
		{ freezeTableName: true, timestamps: true },
	);

	return imgs;
};
