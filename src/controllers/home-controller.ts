import InternalError from "../utils/internalError"
import HomeService from "../services/home-service"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "../utils/jsonResponse"
import fileUpload from "express-fileupload"
import  { UploadImage, CloudinaryUploadResult } from "../integrations/cloudnary"
import { createHome, updateHome } from "../zod-validations/home/home"
import { validId } from "../zod-validations/global/valid-id"

export default class HomeController {
    private _homeService = new HomeService()

    async get(_: Request, res: Response) {
        try {
            const response = await this._homeService.getHome()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, role, description, colorBackground } = createHome.parse(req.body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = await UploadImage(image, 'home') as CloudinaryUploadResult

            const imageBackground = req.files?.imageBackground as fileUpload.UploadedFile
            const imageBackgroundUpload = imageBackground && await UploadImage(imageBackground, 'home') as CloudinaryUploadResult

            const response = await this._homeService.create({ title, role, description, image: imageUpload.secure_url, imageBackground: imageBackgroundUpload.secure_url, colorBackground })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { title, role, description, colorBackground } = updateHome.parse(req.body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = image && await UploadImage(image, 'home') as CloudinaryUploadResult

            const imageBackground = req.files?.imageBackground as fileUpload.UploadedFile
            const imageBackgroundUpload = imageBackground && await UploadImage(imageBackground, 'home') as CloudinaryUploadResult

            const home = await this._homeService.getById(id)
            if (!home) return res.status(404).json(responseError(['Home not found']))

            const updatedHome = await this._homeService.update(id, {
                title,
                role,
                description,
                image: imageUpload ? imageUpload.secure_url : home.image,
                imageBackground: imageBackgroundUpload ? imageBackgroundUpload.secure_url : '',
                colorBackground: colorBackground ? colorBackground : ''
            })

            return res.status(200).json(responseSuccess('Home updated', updatedHome))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}