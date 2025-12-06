import { PrismaService } from '../../prisma/prisma-service'
import { AboutType } from './interfaces/about-type'

function calculateAge(birthDate: Date): number {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
}

export default class AboutService {

    async getAbout() {
        const data = await PrismaService.about.findFirst()

        if (data) {
            return {
                ...data,
                age: calculateAge(data.birthDate)
            }
        }

        return data
    }

    async getAboutById(id: string) {
        const data = await PrismaService.about.findUnique({ where: { id } })

        return data
    }

    async create(about: AboutType) {
        const data = await PrismaService.about.create({ data: about })

        return data
    }

    async update(id: string, about: Partial<AboutType>) {
        const data = await PrismaService.about.update({ where: { id }, data: about })

        return data
    }
}

