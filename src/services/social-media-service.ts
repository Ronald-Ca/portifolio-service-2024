import { PrismaService } from '../../prisma/prisma-service'
import { SocialMediaCreateInput, SocialMediaUpdateInput } from './interfaces/social-media-type'

export default class SocialMediaService {

    async getSocialMedia() {
        const data = await PrismaService.socialMedia.findMany()

        return data
    }

    async getById(id: string) {
        const data = await PrismaService.socialMedia.findUnique({ where: { id } })

        return data
    }

    async create(stack: SocialMediaCreateInput) {
        const data = await PrismaService.socialMedia.create({ data: stack })

        return data
    }

    async update(id: string, stack: SocialMediaUpdateInput) {
        const data = await PrismaService.socialMedia.update({ where: { id }, data: stack })

        return data
    }
}