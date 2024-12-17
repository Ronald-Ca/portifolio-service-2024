import InternalError from "../utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "../utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import ExperienceService from "../services/experience-service"
import { createExperience } from "../zod-validations/experience/create-experience"
import { updateExperience } from "../zod-validations/experience/update-experience"
import { PrismaService } from "../../prisma/prisma-service"

export default class ExperienceController {
    private _experienceService = new ExperienceService()

    async getAll(_: Request, res: Response) {
        try {
            const response = await this._experienceService.getExperience()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { company, role, yearInitial, mothInitial, yearFinal, mothFinal, activities, experienceSkill } = createExperience.parse(req.body)

            const response = await this._experienceService.create({
                company,
                role,
                yearInitial,
                mothInitial,
                yearFinal,
                mothFinal,
                activities,
            })

            if (experienceSkill && experienceSkill.length > 0) {
                await Promise.all(
                    experienceSkill.map(async (skillId: string) => {
                        await PrismaService.experienceSkill.create({
                            data: {
                                experienceId: response.id,
                                skillId,
                            },
                        })
                    })
                )
            }

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { company, role, yearInitial, mothInitial, yearFinal, mothFinal, activities, experienceSkill } = updateExperience.parse(req.body)

            const experience = await this._experienceService.getById(id)
            if (!experience) return res.status(404).json(responseError(['Experience not found']))

            const response = await this._experienceService.update(id, {
                company,
                role,
                yearInitial,
                mothInitial,
                yearFinal,
                mothFinal,
                activities,
            })

            if (experienceSkill && experienceSkill.length > 0) {
                await PrismaService.experienceSkill.deleteMany({
                    where: {
                        experienceId: id,
                    },
                })

                await Promise.all(
                    experienceSkill.map(async (skillId: string) => {
                        await PrismaService.experienceSkill.create({
                            data: {
                                experienceId: id,
                                skillId,
                            },
                        })
                    })
                )
            }

            return res.status(200).json(responseSuccess('Experience updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}