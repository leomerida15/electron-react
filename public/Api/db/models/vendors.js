module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const vendors = sequelize.define(
		'vendors',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_client: { type: INTEGER },
			id_user: { type: STRING },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return vendors;
};
