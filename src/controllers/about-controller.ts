import InternalError from "@utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse"
import fileUpload from "express-fileupload"
import Upload, { CloudinaryUploadResult } from "../integrations/cloudnary"
import { validId } from "../zod-validations/global/valid-id"
import AboutService from "../services/about-service"
import { createAbout } from "../zod-validations/about/create-about"
import { updateAbout } from "../zod-validations/about/update-about"

export default class AboutController {
    private _aboutService = new AboutService()

    async getAbout(_: Request, res: Response) {
        try {
            const response = await this._aboutService.getAbout()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { person, education, address } = createAbout.parse(req.body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = await Upload(image, 'about') as CloudinaryUploadResult

            const response = await this._aboutService.create({ person, education, address, image: imageUpload.secure_url })

            return res.status(200).json(responseSuccess('Success', response))

        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { person, education, address } = updateAbout.parse(req.body)
            const image = req.files?.image as fileUpload.UploadedFile

            const about = await this._aboutService.getAboutById(id)
            if (!about) return res.status(404).json(responseError(['About not found']))

            const response = await this._aboutService.update(id, { person, education, address })
            if (image) {
                const imageUpload = await Upload(image, 'anime') as CloudinaryUploadResult
                if (!imageUpload) return res.status(400).json(responseError(['Error uploading image']))
                await this._aboutService.update(id, { image: imageUpload.secure_url })
                return res.status(200).json(responseSuccess('About updated', response))
            }

            return res.status(200).json(responseSuccess('About updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}