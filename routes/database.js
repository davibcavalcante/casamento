const express = require('express')
const ConvidadoController = require('../controllers/convidado-controller')

const router = express.Router()

router.get('/convidados', ConvidadoController.listGuests)
router.get('/convidados/:name', ConvidadoController.searchGuestByName)
router.post('/convidados', ConvidadoController.registerGuest)
router.delete('/convidados/:id', ConvidadoController.removeGuestById)

module.exports = router
