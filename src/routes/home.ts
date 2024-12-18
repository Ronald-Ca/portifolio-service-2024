import HomeController from "../controllers/home-controller"
import Auth from "../middlewares/auth"
import { Router, Request, Response, NextFunction } from 'express'

const router = Router()
const controller = new HomeController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getHome(req, res).catch((erro) => next(erro)) })
router.post('/create', Auth, (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router