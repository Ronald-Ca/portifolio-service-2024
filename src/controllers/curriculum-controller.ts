import { responseError, responseSuccess } from "@utils/jsonResponse"
import CurriculumService from "../services/curriculum-service"
import { Request, Response } from 'express'
import InternalError from "@utils/internalError"
import fileUpload from "express-fileupload"
import Upload, { CloudinaryUploadResult, Download } from "../integrations/cloudnary"
import { validId } from "../zod-validations/global/valid-id"

export default class CurriculumController {
    private _curriculumService = new CurriculumService()

    async getCurriculum(_: Request, res: Response) {
        try {
            const response = await this._curriculumService.getCurriculum()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const curriculum = req.files?.curriculum as fileUpload.UploadedFile 
            
            const fileName = curriculum?.name as string
            
            const upload = curriculum && await Upload(curriculum, 'curriculum') as CloudinaryUploadResult

            const response = await this._curriculumService.create({ curriculum: upload?.secure_url, fileName, publicId: upload?.public_id })

            return res.status(200).json(responseSuccess('Success', response))

        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)

            const existCurriculum = await this._curriculumService.getCurriculumById(id)
            if (!existCurriculum) return res.status(404).json(responseError(['Curriculum not found']))

            const curriculum = req.files?.curriculum as fileUpload.UploadedFile

            const fileName = curriculum?.name as string

            const upload = curriculum && await Upload(curriculum, 'curriculum') as CloudinaryUploadResult

            const response = await this._curriculumService.update(id, { curriculum: upload?.secure_url, fileName, publicId: upload?.public_id })

            return res.status(200).json(responseSuccess('Curriculum updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async downloadCurriculum(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)

            const curriculum = await this._curriculumService.getCurriculumById(id)
            if (!curriculum) return res.status(404).json(responseError(['Curriculum not found']))

            const reponse = await Download(curriculum.publicId as string)

            return res.status(200).json(responseSuccess('Success', reponse))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}