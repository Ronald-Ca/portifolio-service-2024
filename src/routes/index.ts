import express from 'express'
import home from './home'
import about from './about'
import experience from './experience'

const server = express()

server.use('/home', home)
server.use('/about', about)
server.use('/experience', experience)

export default server