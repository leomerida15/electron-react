const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Users',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		email: { type: 'varchar', unique: true },
		password: { type: 'varchar' },
		id_img: { type: 'int' },
		id_rol: { type: 'int', default: 3 },
		active: { type: 'varchar', default: true },
	},
	relations: {
		imgs: {
			target: 'Imgs',
			type: 'one-to-one',
			joinColumn: { name: 'id_img' },
			cascade: true,
		},
		categorys: {
			target: 'Categorys',
			type: 'one-to-many',
			joinColumn: true,
		},
		products: {
			target: 'Products',
			type: 'one-to-many',
			joinColumn: true,
		},
	},
});
