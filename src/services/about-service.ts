import { Prisma } from '@prisma/client'
import { PrismaService } from '@prisma/prisma-service'

export default class AboutService {

    async getAbout() {
        const data = await PrismaService.about.findFirst()

        return data
    }

    async getAboutById(id: string) {
        const data = await PrismaService.about.findUnique({ where: { id } })

        return data
    }

    async create(about: Prisma.AboutCreateInput) {
        const data = await PrismaService.about.create({ data: about })

        return data
    }

    async update(id: string, about: Prisma.AboutUpdateInput) {
        const data = await PrismaService.about.update({ where: { id }, data: about })

        return data
    }
}