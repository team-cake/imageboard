const { Router } = require('express')
const { toJWT, toData } = require('../auth/jwt')

const User = require('../models').user
const authMiddleware = require('../auth/middleware')
const bcrypt = require('bcrypt')

const router = new Router()

router.get('/test-auth', authMiddleware, (req, res) => {
	res.send({
		message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
	})
})

router.post('/login', async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		res.status(400).send({
			message: 'Please supply a valid email and password',
		})
	} else {
		const user = await User.findOne({ where: { email: email } })
		if (!user) {
			res.status(400).send({
				message: 'Please supply a valid email',
			})
		}
		const userPassword = await user.password
		const isPassword = bcrypt.compareSync(password, userPassword)
		if (!isPassword) {
			res.status(400).send({
				message: 'Please supply a valid password',
			})
		}
		console.log('Is password:', isPassword)
		console.log('The password is: ', userPassword)
		console.log('Password: ', password)
		console.log('The user is: ', user)
		res.send({
			jwt: toJWT({ userId: user && user.id }),
		})
	}
})

module.exports = router
