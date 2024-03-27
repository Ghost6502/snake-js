let card = document.getElementById('card')
let button = document.getElementById('button')
let game = document.getElementById('game')

button.addEventListener('click', function() {
    card.classList.add('hide')
    game.classList.remove('hide')
})