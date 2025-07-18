import SkillController from '../controllers/skill-controller'
import { Router, Request, Response, NextFunction } from 'express'
import Auth from '../middlewares/auth'

const router = Router()
const controller = new SkillController()

router.get('/', (req: Request, res: Response, next: NextFunction) => { controller.getSkill(req, res).catch((erro) => next(erro)) })
router.post('/create', Auth, (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router