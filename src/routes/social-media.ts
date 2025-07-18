import SocialMediaController from '../controllers/social-media-controller'
import { Router, Request, Response, NextFunction } from 'express'
import Auth from '../middlewares/auth'

const router = Router()
const controller = new SocialMediaController()

router.get('/', (req: Request, res: Response, next: NextFunction) => { controller.getAll(req, res).catch((erro) => next(erro)) })
router.post('/', Auth, (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router