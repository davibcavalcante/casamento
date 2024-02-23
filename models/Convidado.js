const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema(
	{
		id: { type: mongoose.Schema.Types.ObjectId },
		nome: { type: String, required: true },
	},
	{ versionKey: false },
)

const guest = mongoose.model('convidados', guestSchema)

module.exports = guest
