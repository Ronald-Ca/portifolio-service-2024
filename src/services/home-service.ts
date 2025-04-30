import { PrismaService } from '../../prisma/prisma-service'
import { HomeType } from './interfaces/home-type'

export default class HomeService {
    async getHome() {
        const data = await PrismaService.home.findFirst()

        return data
    }

    async getById(id: string) {
        const data = await PrismaService.home.findUnique({ where: { id } })

        return data
    }

    async create(home: HomeType) {
        const data = await PrismaService.home.create({ data: home })

        return data
    }

    async update(id: string, home: Partial<HomeType>) {
        const data = await PrismaService.home.update({ where: { id }, data: home })

        return data
    }
}