const { Router } = require('express')
const router = new Router()
// const authMiddleware = require('../auth/middleware')
const { toJWT, toData } = require('../auth/jwt')
const Image = require('../models').image

// get all images
router.get('/', async (req, res) => {
	try {
		const images = await Image.findAll()
		res.json(images)
	} catch (e) {
		next(e)
	}
})

// show images with valid credentials
router.get('/auth/messy', async (req, res, next) => {
	const auth = req.headers.authorization && req.headers.authorization.split(' ')
	if (auth && auth[0] === 'Bearer' && auth[1]) {
		try {
			const data = toData(auth[1])
		} catch (e) {
			res.status(400).send('Invalid JWT token, sketchy.')
		}
		const allImages = await Image.findAll()
		res.json(allImages)
	} else {
		res.status(401).send({
			message: 'Please supply some valid credentials, partner..',
		})
	}
})

// get all images with limit, offset and findAndCountAll
router.get('/', (req, res, next) => {
	const limit = Math.min(req.query.limit || 25, 500)
	const offset = req.query.offset || 0

	Image.findAndCountAll({ limit, offset })
		.then((result) => res.send({ images: result.rows, total: result.count }))
		.catch((error) => next(error))
})

// post new image
router.post('/', async (req, res, next) => {
	try {
		const images = await Image.create(req.body)
		res.json(images)
	} catch (e) {
		next(e)
	}
})

// get one specific image
router.get('/:imageId', async (req, res) => {
	const imageId = parseInt(req.params.imageId)
	const image = await Image.findByPk(imageId)
	if (!image) {
		res.status(404).send('Image not found, weird stuff, try again!')
	} else {
		res.send(image)
	}
})

module.exports = router
