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
        const data = await PrismaService.experience.findUnique({
            where: { id },
            include: {
                experienceSkill: {
                    include: {
                        skill: true,
                    },
                },
            },
        })

        return data
    }

    async create(experience: ExperienceCreateInput, skillIds: string[] = []) {
        return PrismaService.$transaction(async (tx) => {
            const created = await tx.experience.create({ data: experience })

            if (skillIds.length) {
                await tx.experienceSkill.createMany({
                    data: skillIds.map((skillId) => ({ experienceId: created.id, skillId })),
                })
            }

            return tx.experience.findUnique({
                where: { id: created.id },
                include: {
                    experienceSkill: {
                        include: { skill: true },
                    },
                },
            })
        })
    }

    async update(id: string, experience: ExperienceUpdateInput, skillIds?: string[]) {
        const updated = await PrismaService.$transaction(async (tx) => {
            const base = await tx.experience.update({ where: { id }, data: experience })

            if (skillIds !== undefined) {
                await tx.experienceSkill.deleteMany({ where: { experienceId: id } })
                if (skillIds.length) {
                    await tx.experienceSkill.createMany({
                        data: skillIds.map((skillId) => ({ experienceId: id, skillId })),
                    })
                }
            }

            return tx.experience.findUnique({
                where: { id: base.id },
                include: {
                    experienceSkill: {
                        include: { skill: true },
                    },
                },
            })
        })

        return updated
    }
}