class Column {
    constructor(id, name, deleteFunction) {
        this.id = id;
        this.name = name;
    }

    updateColumns() {
        let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
        allDeleteColumnButtons.forEach( function(button) {
            let columns = document.getElementsByClassName('column')
            let column = button.parentElement.parentElement
            let cards = column.querySelectorAll('.card')
    
            if (columns.length > 3 && cards.length == 0) {
                button.classList.remove('disabled')
            } else if (columns.length <= 3 || cards.length > 0) {
                button.classList.add('disabled')
            }
        })

        // REMOVING OPTIONS FROM DROPDOWN FOR STATUSES
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

    editColumn(editColumnButton) {

        function updateColumns() {
            let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
            allDeleteColumnButtons.forEach( function(button) {
                let columns = document.getElementsByClassName('column')
                let column = button.parentElement.parentElement
                let cards = column.querySelectorAll('.card')
        
                if (columns.length > 3 && cards.length == 0) {
                    button.classList.remove('disabled')
                } else if (columns.length <= 3 || cards.length > 0) {
                    button.classList.add('disabled')
                }
            })
    
            // REMOVING OPTIONS FROM DROPDOWN FOR STATUSES
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
        }
       
        let column = editColumnButton.parentElement
        let columnNameInput = column.querySelector('input.column-name')
        columnNameInput.addEventListener('change', function(event) {
            updateColumns()
        })
        columnNameInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                columnNameInput.blur()
            }
            updateColumns()
        })
        
        editColumnButton.addEventListener('click', function() {
            // columnNameInput.setAttribute('disabled', true)
            columnNameInput.focus()
        })

        const columnEditToolTip = document.querySelector('div.tooltip#edit')
        editColumnButton.addEventListener('mouseover', function() {
            editColumnButton.parentElement.appendChild(columnEditToolTip)
        })
    }

    deleteColumn(deleteColumnButton) {
        // allow delete functionality for most columns as long as there are at least 3 and there are no cards in the column
        deleteColumnButton.addEventListener('click', function() {
            let columns = document.getElementsByClassName('column')
            let column = deleteColumnButton.parentElement.parentElement
            let cards = column.querySelectorAll('.card')
            if (columns.length > 3 && cards.length == 0) {
                column.remove()
                // this.updateColumns();
                /////////////
                let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
                allDeleteColumnButtons.forEach( function(button) {
                    let columns = document.getElementsByClassName('column')
                    let column = button.parentElement.parentElement
                    let cards = column.querySelectorAll('.card')
            
                    if (columns.length > 3 && cards.length == 0) {
                        button.classList.remove('disabled')
                    } else if (columns.length <= 3 || cards.length > 0) {
                        button.classList.add('disabled')
                    }
                })
        
                // REMOVING OPTIONS FROM DROPDOWN FOR STATUSES
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
                ////////////
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


    createColumn() {
        // creating the column
        let column = document.querySelector('div.column')
        column = column.cloneNode(true)

        let columnName = column.querySelector('input.column-name')
        columnName.value = this.name;
        let editButton = column.querySelector('svg.edit-column')
        let deleteButton = column.querySelector('svg.delete-column')

        let total = column.querySelector('h3.total')
        total.textContent = 0;
        let cards = column.querySelectorAll('.card')
        cards.forEach(function (card) {
            card.remove()
        })

        // let column = document.createElement('div')
        // column.classList.add('column')
        // let title = document.createElement('div')
        // title.classList.add('title')
        // let columnName = document.createElement('input')
        // columnName.classList.add('column-name')
        // columnName.value = this.name

        // let editButton = document.querySelector('svg.edit-column')
        // editButton = editButton.cloneNode(true)
        
        // let deleteButton = document.querySelector('svg.delete-column')
        // deleteButton = deleteButton.cloneNode(true)

        // let total = document.createElement('h3')
        // total.classList.add('total')
        // total.textContent = 0;
        // let cards = document.createElement('div')
        // cards.classList.add('cards')
    
        // title.appendChild(columnName)

        // title.appendChild(total)
        // title.appendChild(editButton)

        // title.appendChild(deleteButton)

        // column.appendChild(title)
        // column.appendChild(cards)

        let tasks = document.getElementById('tasks')
        tasks.appendChild(column)

        this.editColumn(editButton)
        this.deleteColumn(deleteButton)
        this.updateColumns()

        // smooth scroll to the new column
        tasks.scrollTo({
            top: 0,
            left: tasks.clientWidth,
            behavior: 'smooth'
        })
    }

}

export default Column