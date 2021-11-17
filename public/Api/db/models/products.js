module.exports = (sequelize, type) => {
	const { INTEGER, STRING, BOOLEAN } = type;

	const products = sequelize.define(
		'products',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_user: { type: INTEGER },
			id_category: { type: INTEGER },
			id_vendor: { type: INTEGER },
			name: { type: STRING(80) },
			price: { type: INTEGER },
			description: { type: STRING },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return products;
};
