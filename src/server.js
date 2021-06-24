const express = require('express')
const routes = require('./routes')
const server = express()
const path = require('path')

// mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// user template ejs
server.set('view engine', 'ejs')

// Habilitar arquivos static
server.use(express.static('public'))

// habilitar req.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

// levanta servidor na porta 3000
server.listen(3000, () => {
    console.log("I'm already up ;)")
})