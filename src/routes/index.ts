import { Router } from 'express'
import home from './home'
import about from './about'
import experience from './experience'
import social from './social-media'
import user from './user'
import skill from './skill'
import project from './project'
import curriculum from './curriculum'
import education from './graduation'
import contact from './contact'

const router = Router()

router.use('/home', home)
router.use('/about', about)
router.use('/experience', experience)
router.use('/social-media', social)
router.use('/user', user)
router.use('/skill', skill)
router.use('/project', project)
router.use('/curriculum', curriculum)
router.use('/education', education)
router.use('/contact', contact)

export default router