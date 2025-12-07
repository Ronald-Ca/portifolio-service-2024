import { MongoClient } from 'mongodb'
import 'dotenv/config'

async function seedSocialMedia() {
    console.log('🌱 Iniciando seed do SocialMedia...')

    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db()
    const socialMediaCollection = db.collection('SocialMedia')

    const socialMedias = [
        {
            name: 'WhatsApp',
            link: 'https://api.whatsapp.com/send?phone=5566984043892&text=Ol%C3%A1%20sou%20Ronald%20Camargo%2C%20iniciante%20em%20Front%20End!',
            icon: 'FaWhatsapp',
            color: '#25D366',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Instagram',
            link: 'https://instagram.com/ronald_camargo_?igshid=YmMyMTA2M2Y=',
            icon: 'FaInstagram',
            color: '#E4405F',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Email',
            link: 'mailto:ronaldcamargodev@gmail.com',
            icon: 'FaEnvelope',
            color: '#EA4335',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/ronald-camargo-04b942238',
            icon: 'FaLinkedin',
            color: '#0A66C2',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'GitHub',
            link: 'https://github.com/Ronald-Ca',
            icon: 'FaGithub',
            color: '#181717',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]

    // Limpar social medias existentes
    const existingCount = await socialMediaCollection.countDocuments()
    if (existingCount > 0) {
        console.log('🗑️ Removendo social medias existentes...')
        await socialMediaCollection.deleteMany({})
    }

    console.log('➕ Criando registros de SocialMedia...')
    await socialMediaCollection.insertMany(socialMedias)

    await client.close()
    console.log(`✅ Seed do SocialMedia concluído! ${socialMedias.length} redes sociais criadas.`)
}

seedSocialMedia()
    .catch((error) => {
        console.error('❌ Erro ao executar seed:', error)
        process.exit(1)
    })
