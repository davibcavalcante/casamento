const config = require('../../../config.json')

module.exports.authorize = (req, res, next) => {
    const pass = req.params.pass

    if (pass === config.authorization) {
        next()
    } else {
        res.status(401).json({ error: 'Não autorizado' })
    }
}