class Column {
    constructor(id, name, deleteFunction) {
        this.id = id;
        this.name = name;
    }

    editColumn(editColumnButton) {
       
        let column = editColumnButton.parentElement
        let columnNameInput = column.querySelector('input.column-name')
        columnNameInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                columnNameInput.blur()
            }
        })
        
        editColumnButton.addEventListener('click', function() {
            columnNameInput.focus()
        })

        const columnEditToolTip = document.querySelector('div.tooltip#edit')
        editColumnButton.addEventListener('mouseover', function() {
            editColumnButton.parentElement.appendChild(columnEditToolTip)
        })
    }

    deleteColumn(deleteColumnButton) {
        deleteColumnButton.addEventListener('click', function() {
            let columns = document.getElementsByClassName('column')
            let column = deleteColumnButton.parentElement.parentElement
            let cards = column.querySelectorAll('.card')
            if (columns.length > 3 && cards.length == 0) {
                column.remove()
                this.updateColumns();
            }
        })

        const columnDeleteToolTip = document.querySelector('div.tooltip#delete')
        deleteColumnButton.addEventListener('mouseover', function() {
            deleteColumnButton.parentElement.appendChild(columnDeleteToolTip)
            let columns = document.getElementsByClassName('column')
            let column = deleteColumnButton.parentElement.parentElement
            let cards = column.querySelectorAll('.card')

            if (columns.length > 3 && cards.length == 0) {
                deleteColumnButton.classList.remove('disabled')
            } else if (columns.length <= 3 || cards.length > 0) {
                deleteColumnButton.classList.add('disabled')
            }
        })
    }

    updateColumns() {
        const createTaskForm = document.getElementById('create-task-form')
        // function updateColumnNames() {
        let columnNames = document.querySelectorAll('.column-name')
        let statuses = createTaskForm.querySelector('select[name=status]');
        statuses.innerHTML = ''
        columnNames.forEach(function (object) {
            let newOption = document.createElement('option')
            newOption.textContent = object.value
            newOption.value = object.value
            statuses.appendChild(newOption)
        })
        // }
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

        let editButton = document.querySelector('svg.edit-column')
        editButton = editButton.cloneNode(true)
        
        let deleteButton = document.querySelector('svg.delete-column')
        deleteButton = deleteButton.cloneNode(true)
        deleteButton.classList.remove('disabled')

        let total = document.createElement('h3')
        total.classList.add('total')
        total.textContent = 0;
        let cards = document.createElement('div')
        cards.classList.add('cards')
    
        title.appendChild(columnName)

        title.appendChild(total)
        title.appendChild(editButton)
        this.editColumn(editButton)
        title.appendChild(deleteButton)
        this.deleteColumn(deleteButton)

        column.appendChild(title)
        column.appendChild(cards)

        this.updateColumns()

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