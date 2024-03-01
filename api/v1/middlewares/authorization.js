const env = require('dotenv').config()

module.exports.authorize = (req, res, next) => {
    const pass = req.params.pass

    if (pass === process.env.PASSWORD) {
        next()
    } else {
        res.status(401).json({ error: 'Não autorizado' })
    }
}