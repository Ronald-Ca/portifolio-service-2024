import InternalError from "@utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import SocialMediaService from "../services/social-media-service"
import { createSocialMedia } from "../zod-validations/social-media/create-social-media"
import { updateSocialMedia } from "../zod-validations/social-media/update-social-media"

export default class SocialMediaController {
    private _socialMediaService = new SocialMediaService()

    async getSocialMedia(_: Request, res: Response) {
        try {
            const response = await this._socialMediaService.getSocialMedia()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, color, icon, link } = createSocialMedia.parse(req.body)

            const response = await this._socialMediaService.create({ name, color, icon, link })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { name, icon, color, link } = updateSocialMedia.parse(req.body)

            const social = await this._socialMediaService.getById(id)
            if (!social) return res.status(404).json(responseError(['Social media not found']))

            const response = await this._socialMediaService.update(id, { name, icon, color, link })

            return res.status(200).json(responseSuccess('Social media updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}