import { PrismaService } from '../../prisma/prisma-service'
import { UserCreateInput, UserUpdateInput } from './interfaces/user-type'
export default class UserService {
    async getByEmail(email: string) {
        const user = await PrismaService.user.findFirst({ where: { email } })

        return user
    }

    async getById(id: string) {
        const user = await PrismaService.user.findUnique({ where: { id } })

        return !!user
    }

    async getUser() {
        const users = await PrismaService.user.findMany()

        return users
    }

    async create(user: UserCreateInput) {
        const data = await PrismaService.user.create({ data: user })

        return data
    }

    async update(id: string, user: UserUpdateInput) {
        const data = await PrismaService.user.update({ where: { id }, data: user })

        return data
    }
}