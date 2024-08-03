import InternalError from "@utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import SkillService from "../services/skill-service"
import { createSkill } from "../zod-validations/skill/create-skill"
import { updateSkill } from "../zod-validations/skill/update-skill"

export default class SkillController {
    private _skillService = new SkillService()

    async getSkill(_: Request, res: Response) {
        try {
            const response = await this._skillService.getSkill()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, level, experience, type, stackId } = createSkill.parse(req.body)

            const response = await this._skillService.create({ name, level, experience, type, stack: { connect: { id: stackId } } })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { name, level, experience, type, stackId } = updateSkill.parse(req.body)

            const skill = await this._skillService.getById(id)
            if (!skill) return res.status(404).json(responseError(['Experience not found']))

            const response = await this._skillService.update(id, { name, level, experience, type, stack: { connect: { id: stackId } } })

            return res.status(200).json(responseSuccess('Experience updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}