const mongoose = require('mongoose')
const env = require('dotenv')

const connectDataBase = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING)
		console.log('Conexão com o Banco de dados feita com sucesso')
	} catch (error) {
		console.error('\nErro de conexão com o banco de dados!\n', error)
	}
}

module.exports = connectDataBase
