import express from 'express'
import home from './home'
import about from './about'
import experience from './experience'
import stack from './stack'
import social from './social-media'

const server = express()

server.use('/home', home)
server.use('/about', about)
server.use('/experience', experience)
server.use('/stack', stack)
server.use('/social-media', social)

export default server