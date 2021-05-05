// DRAGGABLE FUNCTIONALITY

function counter() {
    var total = document.querySelectorAll('.total'),
    cards = document.querySelectorAll('.cards')


    total.forEach(function count(object, index) {
        counta = 0;
        for (let i = 0; i < cards[index].querySelectorAll('.card').length; i ++) {
            if (cards[index].querySelectorAll('.card')[i].classList.length == 1) {
                counta += 1
            }
        }
        // if (cards[index].classList.contains('draggable-container--over')) {
        //     counta += 1;
        // }
        // console.log('counter is :' + counta)
        total[index].textContent = counta;
    })
}
counter()
// function createNewSortable(element) {
//     new Sortable(element, {
// 		group: 'nested',
// 		animation: 200,
// 		// fallbackOnBody: true,
// 		swapThreshold: 0.65,
//         ghostClass: 'ghost-card',
//         chosenClass: 'chosen-card',
//         forceFallback: true,
//         onEnd: function (evt) {
//             counter(total, cards)
//             var itemEl = evt.item;
//         }
//       })
// }
var cards = document.querySelectorAll('.cards')
cards.forEach(function(element) {
    // var sortable = Sortable.create(element)
    new Sortable(element, {
		group: 'nested',
		animation: 200,
		// fallbackOnBody: true,
		swapThreshold: 0.65,
        ghostClass: 'ghost-card',
        chosenClass: 'chosen-card',
        forceFallback: true,
        onEnd: function (evt) {
            // console.log(total.length)
            counter()
            // var newColumn = evt.to.parentElement.querySelector('div.title input.column-name').value
            console.log(evt.to.parentElement.querySelector('div.title input.column-name').value)
            var itemEl = evt.item;  // dragged HTMLElement
            // evt.to;    // target list
            // evt.from;  // previous list
            // evt.oldIndex;  // element's old index within old parent
            // evt.newIndex;  // element's new index within new parent
            // evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
            // evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
            // evt.clone // the clone element
            // evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        },
    
	});

})
var tasks = document.getElementById('tasks')
new Sortable(tasks, {
    // group: 'nested',
    animation: 150,
    // fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost-column',
    chosenClass: 'chosen-column',
    forceFallback: true
});
// var sortable = Sortable.create(el);
// var sortable;
// // function createDraggability() {
// sortable = new Draggable.Sortable(
//     document.querySelectorAll('.cards'), {
//         draggable: 'article.card',
//         autoScroll: 1
//     },

// )
// sortable.on('sortable:start', () => {
//     console.log('sortable:start')

// })
// sortable.on('sortable:sort', () => {
//     console.log('sortable:sort')
// })
// sortable.on('sortable:sorted', () => {
//     console.log('sortable:sorted')
// })

// sortable.on('sortable:stop', () => {
//     console.log('sortable:stop')
//     counter(total, cards)
//     // cardWidth()
// })

    // editIcon.addEventListener('click', function(event) {
    //     updateVar()
    //     alert('yo')
    //     console.log('clicked')
    //     if (overlayToggle == false) {
    //       createTaskForm.classList.add('active')
    //       overlayToggle = true;
    //     } else if (overlayToggle == true) {
    //       createTaskForm.classList.remove('active')
    //       overlayToggle = false;
    //     }
    // })