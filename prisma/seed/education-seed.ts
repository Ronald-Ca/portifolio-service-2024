import { MongoClient } from 'mongodb'
import 'dotenv/config'

async function seedEducation() {
    console.log('🌱 Iniciando seed do Education (Graduation)...')

    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    const graduationCollection = db.collection('graduations')

    const graduations = [
        {
            course: 'Ensino Médio',
            institution: 'Escola Estadual Alvarina Alves de Freitas',
            yearInit: '2015',
            yearFinal: '2017',
            city: 'Planalto da Serra',
            state: 'Mato Grosso',
            modality: 'Presencial',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            course: 'Bacharelado em Engenharia da Computação',
            institution: 'Universidade Federal de Mato Grosso (UFMT)',
            yearInit: '2018',
            yearFinal: '2023',
            city: 'Cuiabá',
            state: 'Mato Grosso',
            modality: 'Presencial',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            course: 'Pós Tech Developer 360',
            institution: 'Rocketseat',
            yearInit: '2025',
            yearFinal: '2026',
            city: 'Rio do Sul',
            state: 'Santa Catarina',
            modality: 'Online',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]

    // Limpar graduações existentes
    const existingCount = await graduationCollection.countDocuments()
    if (existingCount > 0) {
        console.log('🗑️ Removendo graduações existentes...')
        await graduationCollection.deleteMany({})
    }

    console.log('➕ Criando registros de Graduation...')
    await graduationCollection.insertMany(graduations)

    await client.close()
    console.log(`✅ Seed do Education concluído! ${graduations.length} formações criadas.`)
}

seedEducation()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
