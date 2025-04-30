import { PrismaService } from '../../prisma/prisma-service'
import { AboutType } from './interfaces/about-type'

export default class AboutService {

    async getAbout() {
        const data = await PrismaService.about.findFirst()

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

