import express from 'express'
import home from './home'
import about from './about'
import experience from './experience'
import stack from './stack'

const server = express()

server.use('/home', home)
server.use('/about', about)
server.use('/experience', experience)
server.use('/stack', stack)

export default server