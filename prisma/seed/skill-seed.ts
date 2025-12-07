import { MongoClient } from 'mongodb'
import 'dotenv/config'

async function seedSkill() {
    console.log('🌱 Iniciando seed do Skill...')

    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    const skillCollection = db.collection('skills')

    const skills = [
        // Front-End Skills
        {
            name: 'React',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'FaReact',
            color: '#61DAFB',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'TypeScript',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiTypescript',
            color: '#3178C6',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Next.js',
            level: 2,
            experience: 1,
            type: 'skill',
            icon: 'SiNextdotjs',
            color: '#000000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Tailwind CSS',
            level: 4,
            experience: 2,
            type: 'skill',
            icon: 'SiTailwindcss',
            color: '#06B6D4',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'JavaScript',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiJavascript',
            color: '#F7DF1E',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'HTML5',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiHtml5',
            color: '#E34F26',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'CSS3',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiCss3',
            color: '#1572B6',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Styled-Components',
            level: 4,
            experience: 2,
            type: 'skill',
            icon: 'SiStyledcomponents',
            color: '#DB7093',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Material UI',
            level: 4,
            experience: 1,
            type: 'skill',
            icon: 'SiMui',
            color: '#007FFF',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Ant Design',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiAntdesign',
            color: '#0170FE',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Shadcn/ui',
            level: 4,
            experience: 2,
            type: 'skill',
            icon: 'SiShadcnui',
            color: '#000000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Zustand',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiReact',
            color: '#443E38',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'React Query',
            level: 4,
            experience: 2,
            type: 'skill',
            icon: 'SiReactquery',
            color: '#FF4154',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'React Hook Form',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiReacthookform',
            color: '#EC5990',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Axios',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiAxios',
            color: '#5A29E4',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Vite',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiVite',
            color: '#646CFF',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        // Back-End Skills
        {
            name: 'Node.js',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'FaNodeJs',
            color: '#339933',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Express',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiExpress',
            color: '#000000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Fastify',
            level: 4,
            experience: 2,
            type: 'skill',
            icon: 'SiFastify',
            color: '#000000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Prisma ORM',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiPrisma',
            color: '#2D3748',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Drizzle ORM',
            level: 2,
            experience: 1,
            type: 'skill',
            icon: 'SiDrizzle',
            color: '#C5F74F',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Zod',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiZod',
            color: '#3E67B1',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        // Database Skills
        {
            name: 'PostgreSQL',
            level: 3,
            experience: 2,
            type: 'skill',
            icon: 'SiPostgresql',
            color: '#4169E1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'MongoDB',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiMongodb',
            color: '#47A248',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'MySQL',
            level: 2,
            experience: 1,
            type: 'skill',
            icon: 'SiMysql',
            color: '#4479A1',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        // Ferramentas Skills
        {
            name: 'Git',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'FaGitAlt',
            color: '#F05032',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'GitHub',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'FaGithub',
            color: '#181717',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Docker',
            level: 3,
            experience: 1,
            type: 'skill',
            icon: 'FaDocker',
            color: '#2496ED',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Postman',
            level: 4,
            experience: 3,
            type: 'skill',
            icon: 'SiPostman',
            color: '#FF6C37',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'AWS S3',
            level: 2,
            experience: 2,
            type: 'skill',
            icon: 'FaAws',
            color: '#FF9900',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Cloudflare R2',
            level: 3,
            experience: 1,
            type: 'skill',
            icon: 'SiCloudflare',
            color: '#F38020',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        // Competências
        {
            name: 'APIs RESTful',
            level: 4,
            experience: 3,
            type: 'competence',
            icon: 'FaServer',
            color: '#6DB33F',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'WebSocket',
            level: 2,
            experience: 2,
            type: 'competence',
            icon: 'FaPlug',
            color: '#010101',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Arquitetura MVC',
            level: 4,
            experience: 3,
            type: 'competence',
            icon: 'FaLayerGroup',
            color: '#7952B3',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Scrum',
            level: 4,
            experience: 2,
            type: 'competence',
            icon: 'FaTasks',
            color: '#009FDA',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Kanban',
            level: 4,
            experience: 3,
            type: 'competence',
            icon: 'FaTrello',
            color: '#0052CC',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]

    // Limpar skills existentes
    const existingCount = await skillCollection.countDocuments()
    if (existingCount > 0) {
        console.log('🗑️ Removendo skills existentes...')
        await skillCollection.deleteMany({})
    }

    console.log('➕ Criando registros de Skill...')
    await skillCollection.insertMany(skills)

    await client.close()
    console.log(`✅ Seed do Skill concluído! ${skills.length} skills criadas.`)
}

seedSkill()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
