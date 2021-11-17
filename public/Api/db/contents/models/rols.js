module.exports = async (model) => {
	try {
		await model.Rols.bulkCreate([
			{
				name: 'admin',
				description: 'Administrador del sistema',
			},
			{
				name: 'clinet',
				description: 'cliente del sistema',
			},
		]);
	} catch (err) {
		console.log(err);
	}
};
