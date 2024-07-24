import { Prisma } from '@prisma/client'
import { PrismaService } from '@prisma/prisma-service'

export default class HomeService {

    async getHome() {
        const data = await PrismaService.home.findMany()

        return data
    }

    async getHomeById(id: string) {
        const data = await PrismaService.home.findUnique({ where: { id } })

        return data
    }

    async create(home: Prisma.HomeCreateInput) {
        const data = await PrismaService.home.create({ data: home })

        return data
    }

    async update(id: string, home: Prisma.HomeUpdateInput) {
        const data = await PrismaService.home.update({ where: { id }, data: home })

        return data
    }
}