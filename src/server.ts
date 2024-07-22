import express from 'express'
import routes from './routes'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DATABASE_URL as string).then(() => {
    console.log('Connected to database')
}).catch((error) => {
    console.log('Error connecting to database', error)
})

const app = express()
const PORT = process.env.PORT || 1818

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

app.use(fileUpload({ useTempFiles: false }))

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
