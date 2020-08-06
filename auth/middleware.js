const User = require('../models').user
const { toData } = require('./jwt')

async function auth(req, res, next) {
	const auth = req.headers.authorization && req.headers.authorization.split(' ')
	if (auth && auth[0] === 'Bearer' && auth[1]) {
		try {
			const data = toData(auth[1])
			const user = User.findByPk(data.userId)
			if (!user) {
				res.status(404).send({ message: 'No user found' })
			}
			req.user = user
			next()
		} catch (e) {
			res.status(400).send({ message: 'JWT invalid' })
		}
	} else {
		res.status(400).send({ message: 'Please provide valid credentials' })
	}
}

module.exports = auth
