import { Prisma } from "@prisma/client";
import { PrismaService } from '../../prisma/prisma-service'

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
            where: { id: id },
        })

        return data
    }

    async create(project: Prisma.ProjectCreateInput) {
        const data = await PrismaService.project.create({ data: project })

        return data
    }

    async update(id: string, project: Prisma.ProjectUpdateInput) {
        const data = await PrismaService.project.update({
            where: { id },
            data: project,
        })

        return data
    }
}