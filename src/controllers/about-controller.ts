import InternalError from "../utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "../utils/jsonResponse"
import fileUpload from "express-fileupload"
import { UploadImage, CloudinaryUploadResult } from "../integrations/cloudnary"
import { validId } from "../zod-validations/global/valid-id"
import AboutService from "../services/about-service"
import { createAbout, updateAbout } from "../zod-validations/about/create-about"

export default class AboutController {
    private _aboutService = new AboutService()

    async get(_: Request, res: Response) {
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
            const { name, age, city, state } = createAbout.parse(req.body)

            const today = new Date()
            const birthYear = today.getFullYear() - age
            const birthDate = new Date(birthYear, 0, 1)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = image && await UploadImage(image, 'about') as CloudinaryUploadResult

            const response = await this._aboutService.create({ name, birthDate, city, state, image: imageUpload ? imageUpload.secure_url : '' })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { name, age, city, state } = updateAbout.parse(req.body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = image && await UploadImage(image, 'about') as CloudinaryUploadResult
            
            const about = await this._aboutService.getAboutById(id)
            if (!about) return res.status(404).json(responseError(['About not found']))

            const updateData: any = { name, city, state }
            if (age !== undefined) {
                const today = new Date()
                const birthYear = today.getFullYear() - age
                updateData.birthDate = new Date(birthYear, 0, 1)
            }
            if (imageUpload) {
                updateData.image = imageUpload.secure_url
            }
   
            const response = await this._aboutService.update(id, updateData)

            return res.status(200).json(responseSuccess('About updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}