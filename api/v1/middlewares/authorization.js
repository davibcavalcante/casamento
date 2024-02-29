const config = require('../../../config.json').authorization

module.exports.authorize = (req, res, next) => {
    const pass = req.params.pass

    if (pass === config.password) {
        next()
    } else {
        res.status(401).json({ error: 'Não autorizado' })
    }
}