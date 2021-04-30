// DRAGGABLE FUNCTIONALITY
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
var total = document.querySelectorAll('.total'),
    card = document.querySelectorAll('.card')
total.forEach(function count(object) {
    // set the textcontent of total to be the number of cards in the respective column
    var cards = object.parentElement.nextElementSibling.querySelectorAll('div.cards .card');
    object.textContent = cards.length;
})

sortable.on('sortable:stop', () => {
    console.log('sortable:stop')
    total.forEach(function count(object) {
        // set the textcontent of total to be the number of cards in the respective column
        var cards = object.parentElement.nextElementSibling.querySelectorAll('div.cards .card');
        object.textContent = cards.length;
    })
})


