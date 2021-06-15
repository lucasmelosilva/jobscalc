const express = require('express')
const routes = require('./routes')
const server = express()


// user template ejs
server.set('view engine', 'ejs')

// Habilitar arquivos static
server.use(express.static('public'))

// habilitar req.body

server.use(express.urlencoded({
    extended: true
}))

// routes
server.use(routes)

// levanta servidor na porta 3000
server.listen(3000, () => {
    console.log('Hello :D')
})