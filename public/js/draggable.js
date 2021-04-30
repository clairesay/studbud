const sortable = new Draggable.Sortable(
    document.querySelectorAll('.column')[0], {
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
})