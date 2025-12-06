import { MongoClient } from 'mongodb'
import 'dotenv/config'

async function seedExperience() {
    console.log('🌱 Iniciando seed do Experience...')

    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    const experienceCollection = db.collection('experiences')

    const experiences = [
        {
            company: 'Tav Web Ltda',
            role: 'Desenvolvedor Full Stack Júnior',
            yearInitial: 2024,
            mothInitial: 'Agosto',
            yearFinal: 2025,
            mothFinal: 'Presente',
            activities: [
                'Desenvolvimento Front-End com React, TypeScript, Tailwind CSS e Next.js',
                'Implementação de soluções Back-End utilizando Node.js, Fastify, TypeScript e Prisma ORM',
                'Integração com PostgreSQL para gestão de dados',
                'Utilização de bibliotecas modernas como Material UI, Recharts, Zod, e outras',
                'Trabalho em arquitetura MVC e desenvolvimento de APIs RESTful'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            company: 'ATM Soluções em Serviços LTDA / BSN Solutions',
            role: 'Desenvolvedor Full Stack Júnior',
            yearInitial: 2022,
            mothInitial: 'Novembro',
            yearFinal: 2024,
            mothFinal: 'Agosto',
            activities: [
                'Desenvolvimento de soluções Full Stack com React, TypeScript e Node.js',
                'Integração com MongoDB, MySQL, SQLite, SQL Server, Evolution API',
                'Experiência na configuração de AWS S3 para armazenamento de arquivos',
                'Implementação de WebSocket e webhooks para comunicação em tempo real',
                'Utilização de ferramentas como Postman, Docker, Trello e metodologias ágeis'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            company: 'Enactus UFMT',
            role: 'Gestor de Parcerias (Voluntário)',
            yearInitial: 2022,
            mothInitial: 'Setembro',
            yearFinal: 2023,
            mothFinal: 'Junho',
            activities: [
                'Gestão de parcerias e planejamento financeiro',
                'Secretário responsável por atas de reuniões'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]

    // Limpar experiências existentes
    const existingCount = await experienceCollection.countDocuments()
    if (existingCount > 0) {
        console.log('🗑️ Removendo experiências existentes...')
        await experienceCollection.deleteMany({})
    }

    console.log('➕ Criando registros de Experience...')
    await experienceCollection.insertMany(experiences)

    await client.close()
    console.log(`✅ Seed do Experience concluído! ${experiences.length} experiências criadas.`)
}

seedExperience()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
