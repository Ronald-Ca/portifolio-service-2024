import express from 'express'
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

const server = express()

server.use('/home', home)
server.use('/about', about)
server.use('/experience', experience)
server.use('/social-media', social)
server.use('/user', user)
server.use('/skill', skill)
server.use('/project', project)
server.use('/curriculum', curriculum)
server.use('/education', education)
server.use('/contact', contact)

export default server