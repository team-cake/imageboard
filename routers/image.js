const { Router } = require('express')
const router = new Router()

const Image = require('../models').image

// get all images
router.get('/', async (req, res) => {
	const images = await Image.findAll()
	res.send(images)
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
		res.status(404).send('Image not found')
	} else {
		res.send(image)
	}
})

module.exports = router
