import InternalError from "@utils/internalError";
import HomeService from "../services/home-service";
import { Request, Response } from 'express'
import { responseSuccess } from "@utils/jsonResponse";

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

    // async create(req: Request, res: Response) {
    //     try {
    //         const { title, role, description } = req.body


    //     } catch (error) {
    //         if (error instanceof InternalError) throw new InternalError(error.message)
    //         throw error
    //     }
    // }
}