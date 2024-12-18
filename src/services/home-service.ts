import { PrismaService } from '../../prisma/prisma-service'
import { HomeCreateInput, HomeUpdateInput } from './interfaces/home-type'

export default class HomeService {
    async getHome() {
        const data = await PrismaService.home.findFirst()

        return data
    }

    async getHomeById(id: string) {
        const data = await PrismaService.home.findUnique({ where: { id } })

        return data
    }

    async create(home: HomeCreateInput) {
        const data = await PrismaService.home.create({ data: home })

        return data
    }

    async update(id: string, home: HomeUpdateInput) {
        const data = await PrismaService.home.update({ where: { id }, data: home })

        return data
    }
}