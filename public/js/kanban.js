// DRAGGABLE FUNCTIONALITY
var total = document.querySelectorAll('.total'),
    cards = document.querySelectorAll('.cards'),
    card = document.querySelectorAll('.card')
function counter(total, cards) {

total.forEach(function count(object, index) {
    counta = 0;
    for (let i = 0; i < cards[index].querySelectorAll('.card').length; i ++) {
        if (cards[index].querySelectorAll('.card')[i].classList.length == 1) {
            counta += 1
        }
    }
    if (cards[index].classList.contains('draggable-container--over')) {
        counta += 1;
    }
    console.log('counter is :' + counta)
    // set the textcontent of total to be the number of cards in the respective column
    // var cards = object.parentElement.nextElementSibling.querySelectorAll('div.cards .card');
    // console.log(index + ': ' + cards[index].querySelectorAll('.card').length)
    // console.log('dragging: ' +  document.querySelectorAll('.draggable-source--is-dragging').length)
    total[index].textContent = counta;
    // total.textContent = cards[index].querySelectorAll('.card').length
})
}
counter(total, cards)

const sortable = new Draggable.Sortable(
    document.querySelectorAll('.cards'), {
        draggable: 'article.card',
    }
)
sortable.on('sortable:start', () => {
    console.log('sortable:start')
})
sortable.on('sortable:sort', () => {
    console.log('sortable:sort')
})
sortable.on('sortable:sorted', () => {
    console.log('sortable:sorted')
})

sortable.on('sortable:stop', () => {
    console.log('sortable:stop')
    // total.forEach(function count(object) {
    //     // set the textcontent of total to be the number of cards in the respective column
    //     var cards = object.parentElement.nextElementSibling.querySelectorAll('div.cards .card');
    //     object.textContent = cards.length;
    // })
    counter(total, cards)
})


