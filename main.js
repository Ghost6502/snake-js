function pxRemove(string) { return Number(string.slice(0, -2))}

function setTop(block, block2, x = 0) { block.style.top = `${pxRemove(block2.style.top) + x}px` }

function setLeft(block, block2, x = 0) { block.style.left = `${pxRemove(block2.style.left) + x}px` }

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
    for (let i = 1; i < game.childElementCount; i++) {
        setTop(game.children[i], game.children[i-1])
        setLeft(game.children[i], game.children[i-1])
    }
    headMove(head, direction)
}

let card = document.getElementById('card')
let text = document.getElementById('text')
let button = document.getElementById('button')
let game = document.getElementById('game')
let snakeHead = document.getElementById('snake-head')
let direction = 1 // 0 - вверх, 1 - вправо, 2 - вниз, 3 - влево
let gameStatus = 0 // 1 - игра началась

for (let i = 0; i < game.childElementCount; i++){
    game.children[i].style.top = '280px'
    game.children[i].style.left = `${240-20*i}px`
}

button.addEventListener('click', function() {
    card.classList.add('hide')
    game.classList.remove('hide')
    gameStatus = 1
})

document.addEventListener('keydown', (event) => {
    const key = event.key;
    switch (key) {
        case 'ArrowUp': 
            direction = 0
            break
        case 'ArrowRight':
            direction = 1
            break
        case 'ArrowDown':
            direction = 2
            break
        case 'ArrowLeft':
            direction = 3
            break
    }
})

setInterval(function() {
    move(game, snakeHead, direction)
}, 1000)