import { PrismaService } from '../../prisma/prisma-service'
import { ProjectCreateInput, ProjectUpdateInput } from "./interfaces/project-type";

export default class ProjectService {

    async getProjects() {
        const data = await PrismaService.project.findMany({
            include: {
                projectSkills: {
                    include: {
                        skill: true,
                    },
                },
            },
        })

        return data
    }

    async getById(id: string) {
        const data = await PrismaService.project.findUnique({
            where: { id },
            include: {
                projectSkills: {
                    include: {
                        skill: true,
                    },
                },
            },
        })

        return data
    }

    async create(project: ProjectCreateInput, skillIds: string[] = []) {
        return PrismaService.$transaction(async (tx) => {
            const created = await tx.project.create({ data: project })

            if (skillIds.length) {
                await tx.projectSkill.createMany({
                    data: skillIds.map((skillId) => ({ projectId: created.id, skillId })),
                })
            }

            return tx.project.findUnique({
                where: { id: created.id },
                include: {
                    projectSkills: {
                        include: { skill: true },
                    },
                },
            })
        })
    }

    async update(id: string, project: ProjectUpdateInput, skillIds?: string[]) {
        const updated = await PrismaService.$transaction(async (tx) => {
            const base = await tx.project.update({
                where: { id },
                data: project,
            })

            if (skillIds !== undefined) {
                await tx.projectSkill.deleteMany({ where: { projectId: id } })
                if (skillIds.length) {
                    await tx.projectSkill.createMany({
                        data: skillIds.map((skillId) => ({ projectId: id, skillId })),
                    })
                }
            }

            return tx.project.findUnique({
                where: { id: base.id },
                include: {
                    projectSkills: {
                        include: { skill: true },
                    },
                },
            })
        })

        return updated
    }
}