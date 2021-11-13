module.exports = (sequelize, type) => {
	const { INTEGER, STRING, DATE, FLOAT } = type;

	const sales = sequelize.define(
		'sales',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_client: { type: STRING },
			id_user: { type: STRING },
			id_produc: { type: INTEGER },
			taxes: { type: STRING },
			net: { type: STRING },
			id_pay_method: { type: DATE },
			dollar_day: { type: FLOAT },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return sales;
};
