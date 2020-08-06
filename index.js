const express = require('express')
const app = express()
const jsonParser = express.json()

app.use(jsonParser)

const userRouter = require('./routers/user')
const imageRouter = require('./routers/image')

app.use('/users', userRouter)
app.use('/images', imageRouter)

const port = process.env.port | 4000

app.listen(port, () => {
	console.log(`🚀 Server started at port ${port}!`)
})
