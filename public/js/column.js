class Column {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    createColumn() {
        // duplicating existing columns and tweaking some elements to make it unique
        let column = document.querySelector('div.column')
        column = column.cloneNode(true)

        let columnName = column.querySelector('input.column-name')
        columnName.value = this.name;
        let editButton = column.querySelector('svg.edit-column')
        let deleteButton = column.querySelector('svg.delete-column')

        let total = column.querySelector('h3.total')
        total.textContent = 0;
        // remove any existing cards inside the column
        let cards = column.querySelectorAll('.cards > *')
        cards.forEach(function (card) {
            card.remove()
        })

        // appending to the tasks container
        let tasks = document.getElementById('tasks')
        tasks.appendChild(column)

        // adding the final padding
        tasks.appendChild(document.querySelector('#tasks div.padding'))

        // smooth scroll to the new column
        tasks.scrollTo({
            top: 0,
            left: tasks.clientWidth,
            behavior: 'smooth'
        })
    }
}

export default Column