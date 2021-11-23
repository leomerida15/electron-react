/* eslint-disable no-throw-literal */
const { Users, Imgs, Imgs_Users } = require('../db');
const bcrypt = require('bcrypt');
const valid = require('validator');
// const { Op } = require('sequelize');
const JWT = require('../hooks/token');

const Auth = {};

Auth.register = async (data) => {
	try {
		console.log('data', data);

		// return data;
		if (!data) throw { message: 'la data es requerida' };

		const { email, password, image } = data.body;

		if (!valid.isEmail(email)) throw { message: 'El email no es valido' };

		//
		if (!valid.isStrongPassword(password, { minLength: 6, minNumbers: 1, minLowercase: 1 })) {
			throw { message: 'El password no es valido' };
		}

		// ecript password with bcrypt
		data.body.password = await bcrypt.hash(password, 10);
		data.body.id_rol = 1;

		const user = await Users.create(data.body);

		const photo = await Imgs.create({ path: image });

		Imgs_Users.create({ id_user: user.id, id_img: photo.id });

		const info = await Users.findOne({ where: { id: user.id }, include: [{ model: Imgs_Users }] });

		// return data;

		return { message: 'registro ok', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

Auth.login = async (data) => {
	try {
		if (!data) throw { message: 'la data es requerida' };
		// define data
		const { email, password } = data.body;

		// query SELECT
		const user = await Users.findOne({ where: { email } });
		if (!user) throw { message: `Usuario no Registrado` };

		// valid password with bcryt
		const valid_password = await bcrypt.compare(password, user.password);
		if (!valid_password) throw { message: `El password no coinside` };

		// token
		console.log({ id_user: user.id, email: user.email });
		const token = JWT.create({ id_user: user.id, email: user.email });

		return { message: 'usuario logeado', token, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

Auth.getUser = async (data) => {
	try {
		if (!data) throw { message: 'la data es requerida' };
		// define data
		const { email } = JWT.valid(data.headers.token);

		// query SELECT
		const info = await Users.findOne({ where: { email }, include: [{ model: Imgs_Users }] });

		if (!info) throw { message: `Usuario no Registrado` };

		return { message: 'usuario logeado', status: true };
	} catch (err) {
		return { err, status: false };
	}
};

module.exports = Auth;
