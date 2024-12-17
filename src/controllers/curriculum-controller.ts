import { responseError, responseSuccess } from "../utils/jsonResponse"
import CurriculumService from "../services/curriculum-service"
import { Request, Response } from 'express'
import InternalError from "../utils/internalError"
import fileUpload from "express-fileupload"
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
            const curriculum = req.files?.curriculum as fileUpload.UploadedFile;

            if (!curriculum) {
                return res.status(400).json({ message: "Curriculum file is required" });
            }

            const base64 = curriculum.data.toString('base64');
            const mimeType = curriculum.mimetype;
            const base64WithPrefix = `data:${mimeType};base64,${base64}`;

            const fileName = curriculum.name;

            const response = await this._curriculumService.create({
                curriculum: base64WithPrefix, 
                fileName,
            });

            return res.status(200).json(responseSuccess('Success', response));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message);
            throw error;
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params);
    
            const existCurriculum = await this._curriculumService.getCurriculumById(id);
            if (!existCurriculum) {
                return res.status(404).json(responseError(['Curriculum not found']));
            }
    
            const curriculum = req.files?.curriculum as fileUpload.UploadedFile;
    
            if (!curriculum) {
                return res.status(400).json(responseError(['Curriculum file is required']));
            }

            const base64 = curriculum.data.toString('base64');
            const mimeType = curriculum.mimetype; 
            const base64WithPrefix = `data:${mimeType};base64,${base64}`;
    
            const fileName = curriculum.name;
    
            const response = await this._curriculumService.update(id, {
                curriculum: base64WithPrefix, 
                fileName,
            });
    
            return res.status(200).json(responseSuccess('Curriculum updated', response));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message);
            throw error;
        }
    }
    

    async downloadCurriculum(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params);
            const curriculum = await this._curriculumService.getCurriculumById(id);
    
            if (!curriculum) {
                return res.status(404).json(responseError(['Curriculum not found']));
            }
                
            return res.status(200).json(responseSuccess('Download link generated', { base64: curriculum.curriculum }));
            
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message);
            throw error;
        }
    }
    
    
}