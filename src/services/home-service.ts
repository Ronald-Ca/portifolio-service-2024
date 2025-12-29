import { PrismaService } from '../../prisma/prisma-service'
import { HomeType, HomeWithSkills, MainSkill } from './interfaces/home-type'

export default class HomeService {
    async getHome(): Promise<HomeWithSkills | null> {
        const home = await PrismaService.home.findFirst()

        if (!home) return null

        // Populate mainSkills com os dados das skills
        let mainSkillsData: MainSkill[] = []
        if (home.mainSkills && home.mainSkills.length > 0) {
            const skills = await PrismaService.skill.findMany({
                where: { id: { in: home.mainSkills } },
                select: { id: true, name: true, icon: true, color: true }
            })

            // Manter a ordem original do array mainSkills
            mainSkillsData = home.mainSkills
                .map(skillId => skills.find(s => s.id === skillId))
                .filter((s): s is MainSkill => s !== undefined)
        }

        return {
            ...home,
            mainSkills: mainSkillsData
        }
    }

    async getById(id: string) {
        const data = await PrismaService.home.findUnique({ where: { id } })

        return data
    }

    async create(home: HomeType) {
        const data = await PrismaService.home.create({ data: home })

        return data
    }

    async update(id: string, home: Partial<HomeType>) {
        const data = await PrismaService.home.update({ where: { id }, data: home })

        return data
    }
}