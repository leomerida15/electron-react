module.exports = (sequelize, type) => {
	const { INTEGER } = type;

	const products_categorys = sequelize.define(
		'products_categorys',
		{
			id_product: { type: INTEGER },
			id_categoria: { type: INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		},
	);

	return products_categorys;
};
