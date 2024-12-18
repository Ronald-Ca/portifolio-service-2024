import { PrismaService } from '../../prisma/prisma-service'
import { ExperienceCreateInput, ExperienceUpdateInput } from './interfaces/experience-type'

export default class ExperienceService {

    async getExperience() {
        const data = await PrismaService.experience.findMany({
            include: {
                experienceSkill: {
                    include: {
                        skill: true
                    }
                }
            }
        })

        return data
    }

    async getById(id: string) {
        const data = await PrismaService.experience.findUnique({ where: { id } })

        return data
    }

    async create(experience: ExperienceCreateInput) {
        const data = await PrismaService.experience.create({ data: experience })

        return data
    }

    async update(id: string, experience: ExperienceUpdateInput) {
        const data = await PrismaService.experience.update({ where: { id }, data: experience })

        return data
    }
}