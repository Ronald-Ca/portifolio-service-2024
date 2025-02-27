import { PrismaService } from '../../prisma/prisma-service'
import { SkillCreateInput, SkillUpdateInput } from './interfaces/skill-type'

export default class SkillService {

    async getSkill() {
        const data = await PrismaService.skill.findMany()

        return data
    }

    async getById(id: string) {
        const data = await PrismaService.skill.findUnique({ where: { id } })

        return data
    }

    async create(skill: SkillCreateInput) {
        const data = await PrismaService.skill.create({ data: skill })

        return data
    }

    async update(id: string, skill: SkillUpdateInput) {
        const data = await PrismaService.skill.update({ where: { id }, data: skill })

        return data
    }
}