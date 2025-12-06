import { NextFunction, Request, Response } from 'express'
import InternalError from '../utils/internalError'
import { responseError } from '../utils/jsonResponse'

export function asyncHandler(
    handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) {
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req, res, next).catch(next)
    }
}

export function errorHandler(err: unknown, _: Request, res: Response, next: NextFunction) {
    if (res.headersSent) return next(err)

    if (err instanceof InternalError) {
        const status = err.statusCode ?? 500
        return res.status(status).json(responseError([err.message], err.erros ?? null, status))
    }

    console.error(err)
    return res.status(500).json(responseError(['Internal server error'], null, 500))
}

