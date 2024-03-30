function stopGame(game, card) {
    game.classList.add('hide')
    card.classList.remove('hide')
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

function move(game, head, direction) {
    for (let i = game.childElementCount - 1; i > 2; i--) {
        setTop(game.children[i], game.children[i-1])
        setLeft(game.children[i], game.children[i-1])
    }
    headMove(head, direction)
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

function checkApple(left, top, apple, score) {
    if (apple.style.left == left && apple.style.top == top) {
        apple.style.left = `${randomInteger(1, 39) * 20}px`
        apple.style.top = `${randomInteger(1, 29) * 20}px`
        score.innerHTML = Number(score.innerHTML) + 1
    }
}

let card = document.getElementById('card')
let text = document.getElementById('text')
let button = document.getElementById('button')
let game = document.getElementById('game')
let score = document.getElementById('score')
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
    apple.style.left = '420px'
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
    if (checkBorders(game, card, snakeHead, direction)) {
        gameStatus = 0
        direction = 1
        text.innerHTML = 'Ты проиграл! Как будешь готов попробовать ещё раз, нажми на кнопку!'
    }
    move(game, snakeHead, direction)
    checkApple(snakeHead.style.left, snakeHead.style.top, apple, score)
    rotatePermission = true
}, 200)