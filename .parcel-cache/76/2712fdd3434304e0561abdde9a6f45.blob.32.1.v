// DRAGGABLE FUNCTIONALITY

// FUNCTION COUNTS HOW MANY CARDS THERE ARE WITHIN A COLUMN
function counter() {
    var total = document.querySelectorAll('.total'),
    cards = document.querySelectorAll('.cards')


    total.forEach(function count(object, index) {
        cardCount = 0;
        for (let i = 0; i < cards[index].querySelectorAll('.card').length; i ++) {
            if (cards[index].querySelectorAll('.card')[i].classList.length == 1) {
                cardCount += 1
            }
        }
        total[index].textContent = cardCount;
    })
}
counter()

var cards = document.querySelectorAll('.cards')
cards.forEach(function(element) {
    new Sortable(element, {
		group: 'nested',
		animation: 200,
		swapThreshold: 0.65,
        ghostClass: 'ghost-card',
        chosenClass: 'chosen-card',
        forceFallback: true,
        onEnd: function (evt) {
            counter()

            console.log(evt.to.parentElement.querySelector('div.title input.column-name').value)

        },
    
	});

})
var tasks = document.getElementById('tasks')
new Sortable(tasks, {
    animation: 150,
    swapThreshold: 0.8,
    ghostClass: 'ghost-column',
    chosenClass: 'chosen-column',
    forceFallback: true
});