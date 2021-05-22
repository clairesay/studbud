// counts how many cards are in a kanban column
export function countCards() {
    let total = document.querySelectorAll('.total'),
        cardContainers = document.querySelectorAll('.cards'),
        columns = document.querySelectorAll('.column'),
        cards = document.getElementsByClassName('card');

    let emptyStateMessage = document.getElementById('empty-state-tasks');
    // if there are no cards, add an empty state message, otherwise remove it.
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
    // applying sortability to the children of each .cards container
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

            onStart: function (evt) {
                // setting the cursor to grabbing while user is holding card
                let itemEl = evt.item;
                itemEl.style.cursor = 'grabbing'

                let body = document.getElementsByTagName('body')[0]
                body.style.cursor = 'grabbing'
            },

            onEnd: function (evt) {
                // setting the cursor to grab 
                let itemEl = evt.item;
                itemEl.style.cursor = 'grab'
                
                // reset cursor to normal arrow
                let body = document.getElementsByTagName('body')[0]
                body.style.cursor = 'initial'

                // recount all the cards in each column and update their totals
                countCards()

                // set enabled/disabled status to each of the buttons after the reallocation happened
                let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
                allDeleteColumnButtons.forEach( function(button) {
                    let columns = document.getElementsByClassName('column')
                    let column = button.parentElement.parentElement
                    let cards = column.querySelectorAll('.card')
                    
                    // ensuring there are mroe than 3 columns and no cards within the column
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