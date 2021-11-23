module.exports = async (model) => {
	try {
		await model.Rols.bulkCreate([
			{
				name: 'clinet',
				description: 'cliente del sistema',
			},
			{
				name: 'admin',
				description: 'Administrador del sistema',
			},
			{
				name: 'user',
				description: 'usuario del sistema',
			},
		]);
	} catch (err) {
		console.log(err);
	}
};
