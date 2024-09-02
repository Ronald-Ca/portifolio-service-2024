import { responseError } from '@utils/jsonResponse'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default async function Auth(req: Request, res: Response, next: NextFunction) {
    const authSecret = <string>process.env.AUTH_SECRET
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ error: 'Token não informado!' })
        }
        const parts = authHeader.split(' ')
        if (!(parts.length === 2)) {
            return res.status(401).json({ error: 'Token mal formatado!' })
        }
        const [scheme, token] = parts

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: 'Token mal formatado!' })
        }
        if (authSecret) {
            try {
                const decoded = <JwtPayload>jwt.verify(token, authSecret)
                if (!decoded) return res.status(401).json(responseError(['Token inválido!'], null, 401))
                return next()
            } catch (err) {
                return res.status(401).json(responseError(['Token inválido!'], null, 401))
            }
        } else {
            return res.status(401).json(responseError(['Ocorreu um erro, entre em contato com o suporte!'], null, 401))
        }
    } catch {
        return res.status(401).json({ error: 'Token inválido! [Code: 003]' })
    }
}
