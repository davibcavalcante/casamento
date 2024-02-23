const guest = require('../models/Convidado')

class GuestController {
	static async listGuests(req, res) {
		try {
			const guestList = await guest.find({})
			res.status(200).json(guestList)
		} catch (error) {
			res.status(500).json({ message: `${error.message} - Falha na requisição dos convidados.` })
		}
	}

	static async searchGuestByName(req, res) {
		const name = req.params.name
		try {
			const guestByName = await guest.find({ nome: name })
			res.status(200).json(guestByName)
		} catch (error) {
			res.status(500).json({ message: 'Falha ao obter convidado', error})
		}
	}

	static async registerGuest(req, res) {
		const newGuest = req.body
		try {
			const guestCreated = await guest.create(newGuest)
			res.status(201).json({ message: `Presença confirmada com sucesso.`, guestCreated })
		} catch (error) {
			res.status(500).json({ message: `Falha ao confirmar presença.`, error })
		}
	}

	static async removeGuestById(req, res) {
		try {
			const id = req.params.id
			await guest.findByIdAndDelete(id)
			res.status(200).json({ message: 'Usuário excluído com sucesso!'})
		} catch (error) {
			res.json({ message: "Erro ao excluir convidado", error})
		}
	}
}

module.exports = GuestController
