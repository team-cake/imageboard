const { Router } = require('express')
const router = new Router()
const bcrypt = require('bcrypt')

const User = require('../models').user

// get all users
router.get('/', async (req, res) => {
	const users = await User.findAll()
	res.send(users)
})

// create user
router.post('/', async (req, res, next) => {
	try {
		const { email, password, fullName } = req.body
		if (!email || !password || !fullName) {
			res.status(400).send({ message: 'missing parameters partner' })
		} else {
			const newUser = await User.create({
				email,
				password: bcrypt.hashSync(password, 10),
				fullName,
			})
			res.json(newUser)
		}
	} catch (e) {
		next(e)
	}
})

// get one specific user
router.get('/:userId', async (req, res) => {
	const userId = parseInt(req.params.userId)
	const user = await User.findByPk(userId)
	if (!user) {
		res.status(404).send({ message: 'User not found' })
	} else {
		res.send(user)
	}
})

module.exports = router
