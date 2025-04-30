import { PrismaService } from '../../prisma/prisma-service'
import { GraduationType } from './interfaces/gradution-type'

export default class GradutionService {

    async getAll() {
        const data = await PrismaService.graduation.findMany()   

        return data
    }

    async getById(id: string) {
        const data = await PrismaService.graduation.findUnique({ where: { id } })

        return data
    }

    async create(gradution: GraduationType) {
        const data = await PrismaService.graduation.create({ data: gradution })

        return data
    }

    async update(id: string, gradution: Partial<GraduationType>) {
        const data = await PrismaService.graduation.update({ where: { id }, data: gradution })

        return data
    }
}
