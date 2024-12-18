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
            where: { id: id },
        })

        return data
    }

    async create(project: ProjectCreateInput) {
        const data = await PrismaService.project.create({ data: project })

        return data
    }

    async update(id: string, project: ProjectUpdateInput) {
        const data = await PrismaService.project.update({
            where: { id },
            data: project,
        })

        return data
    }
}