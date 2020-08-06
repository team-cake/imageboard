const express = require('express')
const app = express()

const port = process.env.port | 4000

app.listen(port, () => {
	console.log(`🚀 Server started at port ${port}!`)
})
