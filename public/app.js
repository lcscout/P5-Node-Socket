let x
let y

function setup() {
    createCanvas(400, 400)
    // frameRate(120)
    x = 50
    y = 50

    socket = io.connect(process.env.NODE_ENV === 'production' ? 'https://p5-node-socket.herokuapp.com' : 'http://localhost:3000')
    // socket.on('clear', setTimeout(() => {
    //     // clear()
    // }, 500))
    socket.on('move', newPlayer)
}

function newPlayer(data) {
    clear()
    fill(100)
    rect(data.x, data.y, 25, 25)
}

function draw() {
    console.log('Sending ' + x + ',' + y)
    let data = {
        x,
        y
    }
    socket.emit('moveP', data)

    noStroke()
    fill(0)

    if ((x + 25) >= width) {
        x = width - 25
    } else if (x <= 0) {
        x = 0
    }
    if ((y + 25) >= height) {
        y = height - 25
    } else if (y <= 0) {
        y = 0
    }

    whenKey()
    
    rect(x, y, 25, 25)
}

function whenKey() {
    if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
        x -= 5
        y -= 5
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
        x += 5
        y -= 5
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
        x += 5
        y += 5
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
        x -= 5
        y += 5
    } else if (keyIsDown(LEFT_ARROW)) {
        x -= 5
    } else if (keyIsDown(RIGHT_ARROW)) {
        x += 5
    } else if (keyIsDown(UP_ARROW)) {
        y -= 5
    } else if (keyIsDown(DOWN_ARROW)) {
        y += 5
    }

}

// let x = 50
// let y = 50

// function setup() {
//     createCanvas(400, 400)
//     background(220)

//     socket = io.connect('http://localhost:3000')
//     socket.on('move', newPlayer)

//     noLoop()
// }

// function newPlayer(data) {
//     noStroke()
//     fill(100)
//     rect(data.x, data.y, 25, 25)
// }

// function draw() {
//     console.log('Sending ' + x + ',' + y)
//     let data = {
//         x,
//         y
//     }
//     socket.emit('move', data)

//     fill(0)
//     rect(x, y, 25, 25)

//     if ((x + 25) >= width) {
//         x = width - 25
//     } else if (x <= 0) {
//         x = 0
//     }
//     if ((y + 25) >= height) {
//         y = height - 25
//     } else if (y <= 0) {
//         y = 0
//     }
    
// }

// function keyPressed() {
//     if (keyCode === LEFT_ARROW && keyCode === UP_ARROW) {
//         x -= 5
//         y -= 5
//     } else if (keyCode === RIGHT_ARROW && keyCode === UP_ARROW) {
//         x += 5
//         y -= 5
//     } else if (keyCode === RIGHT_ARROW && keyCode === DOWN_ARROW) {
//         x += 5
//         y += 5
//     } else if (keyCode === LEFT_ARROW && keyCode === DOWN_ARROW) {
//         x -= 5
//         y += 5
//     } else if (keyCode === RIGHT_ARROW) {
//         x += 5
//     } else if (keyCode === LEFT_ARROW) {
//         x -= 5
//     } else if (keyCode === UP_ARROW) {
//         y -= 5
//     } else if (keyCode === DOWN_ARROW) {
//         y += 5
//     }

//     redraw()
//     setInterval(()=> {clear()}, 3000)
//   }
