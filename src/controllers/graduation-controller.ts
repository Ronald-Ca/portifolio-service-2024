import InternalError from "../utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "../utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import GradutionService from "../services/graduation-service"
import { createGraduation } from "../zod-validations/graduation/create-graduation"
import { updateGraduation } from "../zod-validations/graduation/update-graduation"

export default class GraduationController {
    private _graduationService = new GradutionService()

    async getGraduations(_: Request, res: Response) {
        try {
            const response = await this._graduationService.getAll()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { course, institution, yearInit, yearFinal, city, modality, state } = createGraduation.parse(req.body)

            const response = await this._graduationService.create({ course, institution, yearInit, yearFinal, city, modality, state })

            return res.status(200).json(responseSuccess('Success', response))

        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { course, institution, yearInit, yearFinal, city, modality, state } = updateGraduation.parse(req.body)

            const about = await this._graduationService.getById(id)
            if (!about) return res.status(404).json(responseError(['About not found']))

            const response = await this._graduationService.update(id, { course, institution, yearInit, yearFinal, city, modality, state })

            return res.status(200).json(responseSuccess('About updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}