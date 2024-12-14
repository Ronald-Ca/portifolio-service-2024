import InternalError from "@utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import ProjectService from "../services/project-service"
import { createProject } from "../zod-validations/project/create-project"
import fileUpload from "express-fileupload"
import Upload, { CloudinaryUploadResult } from "../integrations/cloudnary"
import { updateProject } from "../zod-validations/project/update-project"

export default class ProjectController {
    private _projectService = new ProjectService()

    async getProject(_: Request, res: Response) {
        try {
            const response = await this._projectService.getProjects()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, description, link, skillsId } = createProject.parse(req.body)

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = await Upload(image, 'project/image') as CloudinaryUploadResult

            const video = req.files?.video as fileUpload.UploadedFile
            const videoUpload = await Upload(video, 'project/image') as CloudinaryUploadResult


            const response = await this._projectService.create({
                name,
                description,
                link,
                image: imageUpload.secure_url,
                video: videoUpload.secure_url || null,
                projectSkills: {
                    connect: skillsId.map((id) => ({ id }))
                }
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
            const { name, description, link, skillsId } = updateProject.parse(req.body)

            const project = await this._projectService.getById(id)
            if (!project) return res.status(404).json(responseError(['Experience not found']))

            const response = await this._projectService.update(id, {
                name, description, link, projectSkills: {
                    set: skillsId ? skillsId.map((id) => ({ id })) : []
                }
            })

            return res.status(200).json(responseSuccess('Experience updated', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}