class Column {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    createColumn() {
        // creating the column
        let column = document.createElement('div')
        column.classList.add('column')
        let title = document.createElement('div')
        title.classList.add('title')
        let columnName = document.createElement('input')
        columnName.classList.add('column-name')
        columnName.value = this.name

        let total = document.createElement('h3')
        total.classList.add('total')
        total.textContent = 0;
        let cards = document.createElement('div')
        cards.classList.add('cards')
    
        title.appendChild(columnName)
        title.appendChild(total)
        column.appendChild(title)
        column.appendChild(cards)
        let tasks = document.getElementById('tasks')
        tasks.appendChild(column)
        // smooth scroll to the new column
        tasks.scrollTo({
            top: 0,
            left: tasks.clientWidth,
            behavior: 'smooth'
        })
    }

}

export default Column