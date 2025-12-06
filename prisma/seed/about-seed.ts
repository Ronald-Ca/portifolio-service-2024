import { v2 as cloudinary } from 'cloudinary'
import { MongoClient } from 'mongodb'
import * as fs from 'fs'
import * as path from 'path'
import 'dotenv/config'

interface CloudinaryUploadResult {
    secure_url: string
}

async function uploadImageFromFile(filePath: string, folder: string): Promise<CloudinaryUploadResult> {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })

    const fileBuffer = fs.readFileSync(filePath)
    const fileData = fileBuffer.toString('base64')
    const extension = path.extname(filePath).slice(1)
    const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg'

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            `data:${mimeType};base64,${fileData}`,
            { folder: folder, resource_type: 'image' },
            (error: any, result: any) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        )
    })
}

async function seedAbout() {
    console.log('🌱 Iniciando seed do About...')

    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    const aboutCollection = db.collection('abouts')

    const assetsPath = path.join(__dirname, 'assets')
    const imagePath = path.join(assetsPath, 'dev.jpg')

    console.log('📤 Fazendo upload da imagem para o Cloudinary...')
    const imageUpload = await uploadImageFromFile(imagePath, 'about')
    console.log('✅ Imagem enviada:', imageUpload.secure_url)

    const aboutData = {
        name: 'Ronald Camargo',
        birthDate: new Date('2001-01-18'),
        city: 'Cuiabá',
        state: 'Mato Grosso',
        image: imageUpload.secure_url,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const existingAbout = await aboutCollection.findOne({})

    if (existingAbout) {
        console.log('🔄 Atualizando registro existente do About...')
        await aboutCollection.updateOne(
            { _id: existingAbout._id },
            { $set: { ...aboutData, updatedAt: new Date() } }
        )
    } else {
        console.log('➕ Criando novo registro do About...')
        await aboutCollection.insertOne(aboutData)
    }

    await client.close()
    console.log('✅ Seed do About concluído com sucesso!')
}

seedAbout()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
