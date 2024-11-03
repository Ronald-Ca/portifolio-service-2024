import express from 'express'
import home from './home'
import about from './about'
import experience from './experience'
import stack from './stack'
import social from './social-media'
import user from './user'
import skill from './skill'
import project from './project'
import curriculum from './curriculum'

const server = express()

server.use('/home', home)
server.use('/about', about)
server.use('/experience', experience)
server.use('/stack', stack)
server.use('/social-media', social)
server.use('/user', user)
server.use('/skill', skill)
server.use('/project', project)
server.use('/curriculum', curriculum)

export default server