import express from 'express'
import compression from 'compression'
import lusca from 'lusca'
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import productRouter from './routers/product'
import userRouter from './routers/user'
import cartRouter from './routers/cart'
import apiErrorHandler from './middlewares/apiErrorHandler'
import bodyParser from 'body-parser'

dotenv.config({ path: '.env' })
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use( cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

// Express configuration
app.set('port', process.env.PORT || 5000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/v1/users', userRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', cartRouter)
// Custom API error handler
app.use(apiErrorHandler)

export default app
