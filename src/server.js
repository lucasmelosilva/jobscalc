const express = require('express')
const routes = require('./routes')
const server = express()

server.set('view engine', 'ejs')

// Habilitar arquivos static
server.use(express.static('public'))
server.use(routes)
server.listen(3000, () => {
    console.log('Oi :D')
})