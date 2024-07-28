import InternalError from "@utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import StackService from "../services/stack-service"
import { createStack } from "../zod-validations/stack/create-stack"
import { updateStack } from "../zod-validations/stack/update-stack"

export default class StackController {
    private _stackService = new StackService()

    async getStack(_: Request, res: Response) {
        try {
            const response = await this._stackService.getStack()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, icon, color } = createStack.parse(req.body)

            const response = await this._stackService.create({ name, icon, color })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { name, icon, color } = updateStack.parse(req.body)

            const about = await this._stackService.getById(id)
            if (!about) return res.status(404).json(responseError(['Stack not found']))

            const response = await this._stackService.update(id, { name, icon, color })

            return res.status(200).json(responseSuccess('About updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}