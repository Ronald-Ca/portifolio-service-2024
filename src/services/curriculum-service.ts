import { PrismaService } from '../../prisma/prisma-service'
import { CurriculumCreateInput, CurriculumUpdateInput } from './interfaces/curriculum-type'

export default class CurriculumService {

    async getCurriculum() {
        const data = await PrismaService.curriculum.findFirst()

        return data
    }

    async getCurriculumById(id: string) {
        const data = await PrismaService.curriculum.findUnique({ where: { id } })

        return data
    }

    async create(curriculum: CurriculumCreateInput) {
        const data = await PrismaService.curriculum.create({ data: curriculum })

        return data
    }

    async update(id: string, curriculum: CurriculumUpdateInput) {
        const data = await PrismaService.curriculum.update({ where: { id }, data: curriculum })

        return data
    }
}