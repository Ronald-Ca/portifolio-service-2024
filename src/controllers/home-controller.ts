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
            const body = typeof req.body?.mainSkills === 'string' ? { ...req.body, mainSkills: JSON.parse(req.body.mainSkills || '[]') } : req.body
            const { title, role, description, colorBackground, mainSkills } = createHome.parse(body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = await UploadImage(image, 'home') as CloudinaryUploadResult

            const imageBackground = req.files?.imageBackground as fileUpload.UploadedFile
            const imageBackgroundUpload = imageBackground && await UploadImage(imageBackground, 'home') as CloudinaryUploadResult

            const response = await this._homeService.create({
                title,
                role,
                description,
                image: imageUpload.secure_url,
                imageBackground: imageBackgroundUpload?.secure_url,
                colorBackground,
                mainSkills: mainSkills ?? [],
            })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const body = typeof req.body?.mainSkills === 'string' ? { ...req.body, mainSkills: JSON.parse(req.body.mainSkills || '[]') } : req.body
            const parsed = updateHome.parse(body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = image && await UploadImage(image, 'home') as CloudinaryUploadResult

            const imageBackground = req.files?.imageBackground as fileUpload.UploadedFile
            const imageBackgroundUpload = imageBackground && await UploadImage(imageBackground, 'home') as CloudinaryUploadResult

            const home = await this._homeService.getById(id)
            if (!home) return res.status(404).json(responseError(['Home not found']))

            const updateData = {
                title: parsed.title,
                role: parsed.role,
                description: parsed.description,
                image: imageUpload ? imageUpload.secure_url : home.image,
                imageBackground: imageBackgroundUpload ? imageBackgroundUpload.secure_url : (home.imageBackground ?? ''),
                colorBackground: parsed.colorBackground ?? '',
            }
            if (parsed.mainSkills !== undefined) (updateData as any).mainSkills = parsed.mainSkills

            const updatedHome = await this._homeService.update(id, updateData)

            return res.status(200).json(responseSuccess('Home updated', updatedHome))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}