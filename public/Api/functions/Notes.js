const { Notes } = require('../db/models');

const notes = {};

notes.CREATE = async ({ note, origin }) => {
	try {
		// await Notes.create({ note, origin });
	} catch (err) {
		console.error(err);
	}
};

module.exports = notes;
