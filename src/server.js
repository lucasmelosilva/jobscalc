const express = require('express')
const server = express()

server.get('/', (request, response) => {

    return response.send('oiiii')
})

server.listen(3000, () => {
    console.log('Oi :D')
})