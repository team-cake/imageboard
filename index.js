const express = require('express')
const app = express()
const jsonParser = express.json()

app.use(jsonParser)

const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const imageRouter = require('./routers/image')
const authMiddleware = require('./auth/middleware')

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/images', authMiddleware, imageRouter)

const port = process.env.port || 4000

app.listen(port, () => {
	console.log(`🚀 Server started at port ${port}!`)
})
