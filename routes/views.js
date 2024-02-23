const express = require('express');
const router = express.Router();

const authorization = require('../api/v1/middlewares/authorization')

router.get('/convidados/admin/:pass', authorization.authorize, (req, res) => {
	res.render('convidados')
})

// HOME PAGE
router.get('/', (req, res, next) => {
	res.render('index');
});

module.exports = router;