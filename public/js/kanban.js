// counts how many cards are in a kanban column
export function countCards() {
    let total = document.querySelectorAll('.total'),
        cardContainers = document.querySelectorAll('.cards'),
        columns = document.querySelectorAll('.column'),
        cards = document.getElementsByClassName('card')

    const emptyStateMessage = document.getElementById('empty-state-message')
        
    // if there are no cards, add an empty state
    if (cards.length == 0) {
        columns[0].appendChild(emptyStateMessage)
        emptyStateMessage.style.display = 'flex';
    } else {
        emptyStateMessage.style.display = 'none';
    }

    // writing the total number of cards at the head of each column
    total.forEach(function count(object, index) {
        let cardCount = 0;
        for (let i = 0; i < cardContainers[index].querySelectorAll('.card').length; i ++) {
            if (cardContainers[index].querySelectorAll('.card')[i].classList.length == 1) {
                cardCount += 1
            }
        }
        total[index].textContent = cardCount;
    })
}
countCards()

// Setting sortable functionality to the cards with the sortable.js library
var cardContainers = document.querySelectorAll('.cards')
cardContainers.forEach(function(element) {
    new Sortable(element, {
		group: 'nested',
		animation: 200,
		swapThreshold: 0.65,
        ghostClass: 'ghost-card',
        chosenClass: 'chosen-card',
        forceFallback: true,
        onEnd: function (evt) {
            countCards()
        },
	});
})

// setting sortable functionality to the columns with the sortable.js library
var tasks = document.getElementById('tasks')
new Sortable(tasks, {
    animation: 150,
    swapThreshold: 0.8,
    ghostClass: 'ghost-column',
    chosenClass: 'chosen-column',
    forceFallback: true
});