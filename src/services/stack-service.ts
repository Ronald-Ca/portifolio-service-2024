import { Prisma } from '@prisma/client'
import { PrismaService } from '@prisma/prisma-service'

export default class StackService {

    async getStack() {
        const data = await PrismaService.stack.findMany()

        return data
    }

    async getById(id: string) {
        const data = await PrismaService.stack.findUnique({ where: { id } })

        return data
    }

    async create(stack: Prisma.StackCreateInput) {
        const data = await PrismaService.stack.create({ data: stack })

        return data
    }

    async update(id: string, stack: Prisma.StackUpdateInput) {
        const data = await PrismaService.stack.update({ where: { id }, data: stack })

        return data
    }
}