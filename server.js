const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', newConnection)

function newConnection(socket) {
    console.log('New connection: ' + socket.id)
    socket.on('moveP', movePlayer)
    socket.on('connected', conIndeed)

    function movePlayer(data) {
        socket.broadcast.emit('move', data)
        // console.log(data)
    }

    function conIndeed(conVal) {
        socket.broadcast.emit('con', conVal)
    }
}

const listener = server.listen(process.env.PORT || 3000, () => {
    console.log("Node is listening on port " + listener.address().port)
})