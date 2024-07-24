import InternalError from "@utils/internalError";
import HomeService from "../services/home-service";
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse";
import fileUpload from "express-fileupload";
import Upload, { CloudinaryUploadResult } from "../integrations/cloudnary";

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
            const { title, role, description } = req.body

            const image = req.files?.image as fileUpload.UploadedFile

            const response = await this._homeService.create({ title, role, description })

            if (image) {
                const imageUpload = await Upload(image, 'anime') as CloudinaryUploadResult
                if (!imageUpload) return res.status(400).json(responseError(['Error uploading image']))
                await this._homeService.update(response.id, { image: imageUpload.secure_url })
                return res.status(200).json(responseSuccess('Success', response))
            }

            return res.status(200).json(responseSuccess('Success', response))

        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { title, role, description } = req.body
            const image = req.files?.image as fileUpload.UploadedFile

            const home = await this._homeService.getHomeById(id)
            if (!home) return res.status(404).json(responseError(['Home not found']))

            const updatedHome = await this._homeService.update(id, { title, role, description })
            if (image) {
                const imageUpload = await Upload(image, 'anime') as CloudinaryUploadResult
                if (!imageUpload) return res.status(400).json(responseError(['Error uploading image']))
                await this._homeService.update(id, { image: imageUpload.secure_url })
                return res.status(200).json(responseSuccess('Home updated', updatedHome))
            }

            return res.status(200).json(responseSuccess('Home updated', updatedHome))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}