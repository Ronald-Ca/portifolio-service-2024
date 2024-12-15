import InternalError from "@utils/internalError"
import { Request, Response } from 'express'
import { responseError, responseSuccess } from "@utils/jsonResponse"
import { validId } from "../zod-validations/global/valid-id"
import ProjectService from "../services/project-service"
import { createProject } from "../zod-validations/project/create-project"
import fileUpload from "express-fileupload"
import { UploadImage, CloudinaryUploadResult, UploadVideo } from "../integrations/cloudnary"
import { updateProject } from "../zod-validations/project/update-project"
import { PrismaService } from "@prisma/prisma-service"

export default class ProjectController {
    private _projectService = new ProjectService()

    async getAll(_: Request, res: Response) {
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
            const { name, description, link, projectSkills } = createProject.parse(req.body);
    
            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = image && await UploadImage(image, 'project/image') as CloudinaryUploadResult 

            const video = req.files?.video as fileUpload.UploadedFile
            const videoUpload =  video && await UploadVideo(video, 'project/video') as CloudinaryUploadResult 
    
            const createdProject = await this._projectService.create({
                name,
                description,
                link,
                image: imageUpload ? imageUpload.secure_url : '',
                video: videoUpload ? videoUpload.secure_url : '',
            });
    
            if (projectSkills && projectSkills.length > 0) {
                await Promise.all(
                    projectSkills.map(async (skillId: string) => {
                        await PrismaService.projectSkill.create({
                            data: {
                                projectId: createdProject.id,
                                skillId, 
                            },
                        });
                    })
                );
            }
    
            return res.status(200).json(responseSuccess('Success', createdProject));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message);
            throw error;
        }
    }
    

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { name, description, link, projectSkills } = updateProject.parse(req.body)

            const project = await this._projectService.getById(id)
            if (!project) return res.status(404).json(responseError(['Project not found']))

            const image = req.files?.image as fileUpload.UploadedFile
            const imageUpload = image && await UploadImage(image, 'project/image') as CloudinaryUploadResult

            const video = req.files?.video as fileUpload.UploadedFile
            const videoUpload = video && await UploadVideo(video, 'project/video') as CloudinaryUploadResult

            const updatedProject = await this._projectService.update(id, {
                name,
                description,
                link,
                image: imageUpload ? imageUpload.secure_url : project.image,
                video: videoUpload ? videoUpload.secure_url : project.video,
            })

            if (projectSkills && projectSkills.length > 0) {
                await PrismaService.projectSkill.deleteMany({
                    where: {
                        projectId: id,
                    },
                })

                await Promise.all(
                    projectSkills.map(async (skillId: string) => {
                        await PrismaService.projectSkill.create({
                            data: {
                                projectId: id,
                                skillId,
                            },
                        })
                    })
                )
            }

            return res.status(200).json(responseSuccess('Project updated', updatedProject))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
} 