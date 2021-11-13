module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const historys = sequelize.define(
		'historys',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_client: { type: INTEGER },
			id_user: { type: STRING },
			//
			esferea_oi: { type: STRING },
			esferea_od: { type: STRING },
			//
			eje_oi: { type: STRING },
			eje_od: { type: STRING },
			//
			cilindro_oi: { type: STRING },
			cilindro_od: { type: STRING },
			//
			add_oi: { type: STRING },
			add_od: { type: STRING },
			//
			dp_oi: { type: STRING },
			dp_od: { type: STRING },
			//
			note: { type: STRING },
		},
		{ freezeTableName: true, timestamps: true },
	);

	return historys;
};
