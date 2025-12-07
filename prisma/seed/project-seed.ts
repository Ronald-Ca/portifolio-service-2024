import { v2 as cloudinary } from 'cloudinary'
import { MongoClient, ObjectId } from 'mongodb'
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

async function seedProject() {
    console.log('🌱 Iniciando seed do Project...')

    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    const projectCollection = db.collection('projects')
    const projectSkillCollection = db.collection('project_skills')
    const skillCollection = db.collection('skills')

    // Buscar skills de HTML5 e CSS3
    console.log('🔍 Buscando skills HTML5 e CSS3...')
    const htmlSkill = await skillCollection.findOne({ name: 'HTML5' })
    const cssSkill = await skillCollection.findOne({ name: 'CSS3' })

    if (!htmlSkill || !cssSkill) {
        console.error('❌ Skills HTML5 ou CSS3 não encontradas. Execute seed:skill primeiro.')
        await client.close()
        process.exit(1)
    }

    console.log('✅ Skills encontradas:', htmlSkill.name, cssSkill.name)

    const assetsPath = path.join(__dirname, 'assets')
    const imagePath = path.join(assetsPath, 'primeira-pagina-html.png')

    console.log('📤 Fazendo upload da imagem para o Cloudinary...')
    const imageUpload = await uploadImageFromFile(imagePath, 'project/image')
    console.log('✅ Imagem enviada:', imageUpload.secure_url)

    // Limpar projetos existentes
    const existingCount = await projectCollection.countDocuments()
    if (existingCount > 0) {
        console.log('🗑️ Removendo projetos existentes...')
        await projectCollection.deleteMany({})
        await projectSkillCollection.deleteMany({})
    }

    const projectId = new ObjectId()

    const projectData = {
        _id: projectId,
        name: 'Primeira Página HTML',
        image: imageUpload.secure_url,
        video: null,
        description: 'Meu primeiro contato com HTML e CSS em 2021. Esta foi a primeira página que desenvolvi sozinho, marcando o início da minha jornada como desenvolvedor web.',
        link: 'https://ronald-ca.github.io/primeira-pagina.github.io/',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    console.log('➕ Criando registro do Project...')
    await projectCollection.insertOne(projectData)

    // Criar vínculos com as skills
    console.log('🔗 Vinculando skills ao projeto...')
    const projectSkills = [
        {
            projectId: projectId.toString(),
            skillId: htmlSkill._id.toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            projectId: projectId.toString(),
            skillId: cssSkill._id.toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]

    await projectSkillCollection.insertMany(projectSkills)

    await client.close()
    console.log('✅ Seed do Project concluído! 1 projeto criado com 2 skills vinculadas.')
}

seedProject()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
