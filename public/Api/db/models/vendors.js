module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const vendors = sequelize.define(
		'vendors',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			name: { type: INTEGER },
			rif: { type: STRING },
			email: { type: STRING },
			phone: { type: STRING },
			direction: { type: STRING },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return vendors;
};
