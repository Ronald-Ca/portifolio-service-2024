import SocialMediaController from '@controllers/social-media-controller'
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()
const controller = new SocialMediaController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getSocialMedia(req, res).catch((erro) => next(erro)) })
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router