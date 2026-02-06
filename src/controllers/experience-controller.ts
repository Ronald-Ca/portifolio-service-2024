import InternalError from "../utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "../utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import ExperienceService from "../services/experience-service"
import { createExperience } from "../zod-validations/experience/create-experience"
import { updateExperience } from "../zod-validations/experience/update-experience"

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
            const parsed = createExperience.parse(req.body)
            const { experienceSkill, ...data } = parsed
            const payload = {
                ...data,
                yearFinal: data.currentJob ? undefined : data.yearFinal ?? undefined,
                mothFinal: data.currentJob ? 'Present' : (data.mothFinal ?? undefined),
            }
            const response = await this._experienceService.create(
                payload as any,
                experienceSkill || [],
            )

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const parsed = updateExperience.parse(req.body)
            const { experienceSkill, ...data } = parsed
            const experience = await this._experienceService.getById(id)
            if (!experience) return res.status(404).json(responseError(['Experience not found']))
            const payload = { ...data }
            if (data.currentJob) {
                payload.yearFinal = undefined
                payload.mothFinal = 'Present'
            }
            const response = await this._experienceService.update(
                id,
                payload as any,
                experienceSkill,
            )

            return res.status(200).json(responseSuccess('Experience updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}