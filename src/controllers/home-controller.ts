import InternalError from "@utils/internalError"
import HomeService from "../services/home-service"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse"
import fileUpload from "express-fileupload"
import  { UploadImage, CloudinaryUploadResult } from "../integrations/cloudnary"
import { createHome } from "../zod-validations/home/create-home"
import { updateHome } from "../zod-validations/home/update-home"
import { validId } from "../zod-validations/global/valid-id"

export default class HomeController {
    private _homeService = new HomeService()

    async getHome(_: Request, res: Response) {
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
            const { title, role, description } = createHome.parse(req.body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = await UploadImage(image, 'home') as CloudinaryUploadResult

            const response = await this._homeService.create({ title, role, description, image: imageUpload.secure_url })

            return res.status(200).json(responseSuccess('Success', response))

        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { title, role, description } = updateHome.parse(req.body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = image && await UploadImage(image, 'home') as CloudinaryUploadResult

            const home = await this._homeService.getHomeById(id)
            if (!home) return res.status(404).json(responseError(['Home not found']))

            const updatedHome = await this._homeService.update(id, {
                title,
                role,
                description,
                image: imageUpload ? imageUpload.secure_url : home.image
            })

            return res.status(200).json(responseSuccess('Home updated', updatedHome))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}