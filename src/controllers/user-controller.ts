import { Request, Response } from 'express'
import { responseError, responseSuccess } from "../utils/jsonResponse"
import InternalError from "../utils/internalError"
import UserService from "../services/user-service"
import { createUser } from "../zod-validations/user/create-user"
import { validId } from "../zod-validations/global/valid-id"
import { updateUser } from "../zod-validations/user/update-user"
import { authenticateUser } from "../zod-validations/user/authenticate-user"
import jwt from 'jsonwebtoken'

export default class UserController {
    private _userService = new UserService()

    async getUser(_: Request, res: Response) {
        try {
            const response = await this._userService.getUser()

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { email, password } = createUser.parse(req.body)

            const emailExist = await this._userService.getByEmail(email)
            if (emailExist) return res.status(400).json(responseError(['E-mail already registered']))

            const response = await this._userService.create({ email, password })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = validId.parse(req.params)
            const { email, password } = updateUser.parse(req.body)

            const user = await this._userService.getByEmail(id)
            if (!user) return res.status(404).json(responseError(['User not found']))

            const response = await this._userService.update(id, { email, password })

            return res.status(200).json(responseSuccess('Success', response))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = authenticateUser.parse(req.body)

            const result = await this._userService.getByEmail(email)
            if (!result) return res.status(400).json(responseError(['User not found']))
            if (!result || !result.password) return res.status(400).json(responseError(['Invalid User or Invalid password']))

            if (password !== result.password) return res.status(400).json(responseError(['Invalid User or Invalid password']))
            // if (!(await bcrypt.compare(password, result.password))) return res.status(400).json(responseError(['Invalid User or Invalid password']))

            result.password = ''

            if (!result.active) return res.status(400).json(responseError(['User is inactive, contact the administrator']))

            const token = jwt.sign({ id: result.id }, <string>process.env.AUTH_SECRET, { expiresIn: 5000 })

            return res.status(200).json(responseSuccess('Success', { user: result, token }))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async validateToken(req: Request, res: Response) {
        try {
            const { email, token } = req.body
            const result = await this._userService.getByEmail(email)
            if (!result) return res.status(400).json(responseError(['User not found']))
            result.password = ''
            return res.status(200).json(responseSuccess('Token válido', { token: token, usuario: result }))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}
