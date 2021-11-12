/* eslint-disable no-throw-literal */
const { Users } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Auth = {};

Auth.register = async (data) => {
	try {
		await Users.create(data);

		return { msg: 'registro ok' };
	} catch (err) {
		return err;
	}
};

Auth.login = async (data) => {
	try {
		return 'hola soy login';
		// define data
		const { email, password } = data.body;

		// query SELECT
		const user = await Users.findOne({ where: { email } });
		if (!user) throw { message: `Usuario no Registrado` };

		// valid password with bcryt
		const valid_password = await bcrypt.compare(password, user.password);
		if (!valid_password) throw { message: `El password no coinside` };

		// filter respues

		// token
		const token = jwt.sign({ id: user.id, email: user.email }, 'secret');

		return { message: 'usuario logeado', info: user, token };
	} catch (err) {
		return err;
	}
};

module.exports = Auth;
