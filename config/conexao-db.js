const mongoose = require('mongoose')

const connectDataBase = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://indigitalDevelopment:indigitalAdmin@cluster0.ykoenvs.mongodb.net/?retryWrites=true&w=majority',
		)
		console.log('Conexão com o Banco de dados feita com sucesso')
	} catch (error) {
		console.error('\nErro de conexão com o banco de dados!\n', error)
	}
}

module.exports = connectDataBase
