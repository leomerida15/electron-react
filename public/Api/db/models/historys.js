module.exports = (sequelize, type) => {
	const { INTEGER, STRING, JSON } = type;

	const historys = sequelize.define(
		'historys',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_client: { type: INTEGER },
			id_user: { type: INTEGER },
			//
			esferea: { type: JSON, defaultValue: `{ oi:'', od:'' }` }, // { oi:'', od:'' }
			//
			eje: { type: JSON, defaultValue: `{ oi:'', od:'' }` },
			//
			cilindro: { type: JSON, defaultValue: `{ oi:'', od:'' }` },
			//
			add: { type: JSON, defaultValue: `{ oi:'', od:'' }` },
			//
			dp: { type: JSON, defaultValue: `{ oi:'', od:'' }` },
			//
			note: { type: STRING },
		},
		{ freezeTableName: true, timestamps: true },
	);

	return historys;
};
