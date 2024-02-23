const env = require('dotenv')

module.exports.authorize = (req, res, next) => {
    const pass = req.params.pass

    if (pass === process.env.AUTHORIZATION) {
        next()
    } else {
        res.status(401).json({ error: 'Não autorizado' })
    }
}