import { v2 as cloudinary } from 'cloudinary'
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import 'dotenv/config'

const prisma = new PrismaClient()

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

async function seedHome() {
    console.log('🌱 Iniciando seed do Home...')

    const assetsPath = path.join(__dirname, 'assets')
    const profileImagePath = path.join(assetsPath, 'profile.jpg')
    const backgroundImagePath = path.join(assetsPath, 'office.png')

    console.log('📤 Fazendo upload da imagem de perfil para o Cloudinary...')
    const profileUpload = await uploadImageFromFile(profileImagePath, 'home')
    console.log('✅ Imagem de perfil enviada:', profileUpload.secure_url)

    console.log('📤 Fazendo upload da imagem de background para o Cloudinary...')
    const backgroundUpload = await uploadImageFromFile(backgroundImagePath, 'home')
    console.log('✅ Imagem de background enviada:', backgroundUpload.secure_url)

    const existingHome = await prisma.home.findFirst()

    const homeData = {
        title: 'Ronald Camargo',
        role: 'Desenvolvedor de Software Pleno',
        description: 'Apaixonado por tecnologia e programação, transformo ideias em código e desafios em soluções. Cada linha de código é uma oportunidade de criar algo que faz a diferença.',
        image: profileUpload.secure_url,
        imageBackground: backgroundUpload.secure_url,
        colorBackground: 'rgba(0, 0, 0, 0.6)'
    }

    if (existingHome) {
        console.log('🔄 Atualizando registro existente do Home...')
        await prisma.home.update({
            where: { id: existingHome.id },
            data: homeData
        })
    } else {
        console.log('➕ Criando novo registro do Home...')
        await prisma.home.create({
            data: homeData
        })
    }

    console.log('✅ Seed do Home concluído com sucesso!')
}

seedHome()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
