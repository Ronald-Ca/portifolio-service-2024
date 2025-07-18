import UserController from '../controllers/user-controller'
import { Router, Request, Response, NextFunction } from 'express'
import Auth from '../middlewares/auth'

const router = Router()
const controller = new UserController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getUser(req, res).catch((erro) => next(erro)) })
router.post('/authenticate', (req: Request, res: Response, next: NextFunction) => { controller.authenticate(req, res).catch((erro) => next(erro)) })
router.post('/validate-token', (req: Request, res: Response, next: NextFunction) => { controller.validateToken(req, res).catch((erro) => next(erro)) })
router.post('/create/portifolio-user', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res).catch((erro) => next(erro)) })
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.update(req, res).catch((erro) => next(erro)) })

export default router