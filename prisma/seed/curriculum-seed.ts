import { MongoClient } from 'mongodb'
import * as fs from 'fs'
import * as path from 'path'
import 'dotenv/config'

async function seedCurriculum() {
    console.log('🌱 Iniciando seed do Curriculum...')

    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    const curriculumCollection = db.collection('curriculums')

    const templatesPath = path.join(__dirname, 'templates')
    const curriculumPath = path.join(templatesPath, 'curriculum.docx')

    console.log('📄 Convertendo arquivo para base64...')
    const fileBuffer = fs.readFileSync(curriculumPath)
    const base64Data = fileBuffer.toString('base64')
    const curriculumBase64 = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64Data}`
    console.log('✅ Arquivo convertido!')

    const curriculumData = {
        curriculum: curriculumBase64,
        fileName: 'Currículo',
        publicId: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const existingCurriculum = await curriculumCollection.findOne({})

    if (existingCurriculum) {
        console.log('🔄 Atualizando registro existente do Curriculum...')
        await curriculumCollection.updateOne(
            { _id: existingCurriculum._id },
            { $set: { ...curriculumData, updatedAt: new Date() } }
        )
    } else {
        console.log('➕ Criando novo registro do Curriculum...')
        await curriculumCollection.insertOne(curriculumData)
    }

    await client.close()
    console.log('✅ Seed do Curriculum concluído com sucesso!')
}

seedCurriculum()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
