// counts how many cards are in a kanban column
export function countCards() {
    let total = document.querySelectorAll('.total'),
        cardContainers = document.querySelectorAll('.cards'),
        columns = document.querySelectorAll('.column'),
        cards = document.getElementsByClassName('card');

    let emptyStateMessage = document.getElementById('empty-state-tasks');
        
    // // if there are no cards, add an empty state
    if (cards.length == 0) {
        cardContainers[0].appendChild(emptyStateMessage)
        emptyStateMessage.style.display = 'flex';
    } else {
        columns[0].appendChild(emptyStateMessage)
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
export function sortability() {
    let cardContainers = document.querySelectorAll('.cards')
    cardContainers.forEach(function(element) {
        new Sortable(element, {
            group: 'nested',
            animation: 200,
            swapThreshold: 0.65,
            ghostClass: 'ghost-card',
            chosenClass: 'chosen-card',
            dragClass: "sortable-drag",
            filter: '.filtered', // 'filtered' class is not draggable
            forceFallback: true,
            onStart: function (/**Event*/evt) {
                let itemEl = evt.item;
                itemEl.style.cursor = 'grabbing'

                let body = document.getElementsByTagName('body')[0]
                body.style.cursor = 'grabbing'
                evt.oldIndex;  // element index within parent
            },
            onEnd: function (evt) {

                let itemEl = evt.item;
                itemEl.style.cursor = 'grab'
                let body = document.getElementsByTagName('body')[0]
                body.style.cursor = 'initial'

                countCards()
                // ADD COLUMN DELETE UPDATE
                let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
                allDeleteColumnButtons.forEach( function(button) {
                    let columns = document.getElementsByClassName('column')
                    let column = button.parentElement.parentElement
                    let cards = column.querySelectorAll('.card')
                    
                    if (columns.length > 3 && cards.length == 0) {
                        button.classList.remove('disabled')
                    } else if (columns.length <= 3) {
                        button.classList.add('disabled') 
                    } else if (cards.length > 0) {
                        button.classList.add('disabled')
                        
                    }
                })
            },
        });
    })
}
sortability()

// setting sortable functionality to the columns with the sortable.js library
var deviceSize
////////// MEDIA QUERIES https://www.w3schools.com/howto/howto_js_media_queries.asp ///////////////
function mediaQuery(x) {
    if (x.matches) { // If media query matches
      deviceSize = 'mobile'
    } else {
      deviceSize = 'desktop'
    }
}

var x = window.matchMedia("(max-width: 700px)")
mediaQuery(x) // Call listener function at run time
x.addEventListener('change', mediaQuery) // Attach listener function on state changes

var tasks = document.getElementById('tasks')
// if (deviceSize == 'mobile') {

// } else {
//     new Sortable(tasks, {
//         animation: 150,
//         swapThreshold: 0.8,
//         ghostClass: 'ghost-column',
//         chosenClass: 'chosen-column',
//         dragClass: "sortable-drag",
//         forceFallback: true
//     });
// }
