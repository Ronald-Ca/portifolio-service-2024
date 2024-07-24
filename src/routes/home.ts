import HomeController from "@controllers/home-controller"
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()
const controller = new HomeController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getHome(req, res).catch((erro) => next(erro)) })
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router