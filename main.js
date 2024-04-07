function stopGame(game, card) {
    game.classList.add('hide')
    card.classList.remove('hide')
    document.getElementById('score').innerHTML = 0
    for (let i = game.childElementCount - 1; i > 4; i--)
        game.children[i].remove()
}

function pxRemove(string) { return Number(string.slice(0, -2))}

function setTop(block, block2, x = 0) { block.style.top = `${pxRemove(block2.style.top) + x}px` }

function setLeft(block, block2, x = 0) { block.style.left = `${pxRemove(block2.style.left) + x}px` }

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function headMove(head, direction) {
    switch (direction){
        case 0:
            setTop(head, head, -20)
            break
        case 1:
            setLeft(head, head, 20)
            break
        case 2:
            setTop(head, head, 20)
            break
        case 3:
            setLeft(head, head, -20)
            break
    }
}

function move(game) {
    for (let i = game.childElementCount - 1; i > 2; i--) {
        setTop(game.children[i], game.children[i-1])
        setLeft(game.children[i], game.children[i-1])
    }
}

function checkBorders(game, card, head, direction) {
    if (head.style.top == '0px' && direction == 0 ||
        head.style.top == '580px' && direction == 2 ||
        head.style.left == '780px' && direction == 1 ||
        head.style.left == '0px' && direction == 3) {
            stopGame(game, card)
            return 1
        }
    return 0
}

function checkApple(left, top, game, apple) {
    if (apple.style.left == left && apple.style.top == top) {
        let successfulGeneration
        do{
            successfulGeneration = true
            apple.style.left = `${randomInteger(1, 39) * 20}px`
            apple.style.top = `${randomInteger(1, 29) * 20}px`
            for (let i = game.childElementCount - 1; i > 1; i--) 
                if (apple.style.left == game.children[i].style.left && apple.style.top == game.children[i].style.top)
                    successfulGeneration = false
        } while (!successfulGeneration);
        document.getElementById('score').innerHTML = Number(document.getElementById('score').innerHTML) + 1
        game.innerHTML += '<div></div>'
        setTop(game.children[game.childElementCount-1], game.children[game.childElementCount-2])
        setLeft(game.children[game.childElementCount-1], game.children[game.childElementCount-2])
    }
}

function checkSnake(left, top, game, card) {
    for (let i = 3; i < game.childElementCount; i++)
        if (left == game.children[i].style.left &&
            top == game.children[i].style.top) {
            stopGame(game, card)
            return 1
        }
    return 0
}

let card = document.getElementById('card')
let button = document.getElementById('button')
let game = document.getElementById('game')
let apple = document.getElementById('apple')
let snakeHead = document.getElementById('snake-head')
let direction = 1 // 0 - вверх, 1 - вправо, 2 - вниз, 3 - влево
let gameStatus = 0 // 1 - игра началась
let rotatePermission = true

button.addEventListener('click', function() {
    card.classList.add('hide')
    game.classList.remove('hide')
    gameStatus = 1
    apple.style.top = '280px'
    apple.style.left = '320px'
    for (let i = 2; i < game.childElementCount; i++){
        game.children[i].style.top = '280px'
        game.children[i].style.left = `${240-20*(i-1)}px`
    }
})

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (rotatePermission) {
        switch (key) {
            case 'ArrowUp': 
                direction = (direction != 2 ? 0 : 2)
                break
            case 'ArrowRight':
                direction = (direction != 3 ? 1 : 3)
                break
            case 'ArrowDown':
                direction = (direction != 0 ? 2 : 0)
                break
            case 'ArrowLeft':
                direction = (direction != 1 ? 3 : 1)
                break
        }
        rotatePermission = false
    }
})

setInterval(function() {
    game = document.getElementById('game')
    apple = document.getElementById('apple')
    snakeHead = document.getElementById('snake-head')
    if (gameStatus) {
        if (checkBorders(game, card, snakeHead, direction) || checkSnake(snakeHead.style.left, snakeHead.style.top, game, card)) {
            gameStatus = 0
            direction = 1
            document.getElementById('text').innerHTML = 'Ты проиграл! Как будешь готов попробовать ещё раз, нажми на кнопку!'
        }
        move(game)
        headMove(snakeHead, direction)
        checkApple(snakeHead.style.left, snakeHead.style.top, game, apple)
        rotatePermission = true
    }
}, 100)