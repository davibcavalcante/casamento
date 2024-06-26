const mongoose = require('mongoose')
const config = require('../config.json').database

const connectDataBase = async () => {
	try {
		await mongoose.connect(config.connectionString)
		console.log('Conexão com o Banco de dados feita com sucesso')
	} catch (error) {
		console.error('\nErro de conexão com o banco de dados!\n', error)
	}
}

module.exports = connectDataBase