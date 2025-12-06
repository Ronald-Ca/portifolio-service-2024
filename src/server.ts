import express from 'express'
import routes from './routes'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { env } from './utils/env'
import { errorHandler } from './middlewares/error-handler'

const app = express()
const PORT = env.PORT

const origins = env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)

app.use(cors({
    origin: origins.includes('*') ? '*' : origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(fileUpload({ useTempFiles: false }))

app.use(express.json())
app.use(routes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
