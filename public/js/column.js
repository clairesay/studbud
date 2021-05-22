class Column {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // updates column on hover
    updateColumns() {
        this.updateDeleteButton()

        // updating options from task form dropdown when a columns are renamed or deleted
        const createTaskForm = document.getElementById('create-task-form')
        
        let columnNames = document.querySelectorAll('.column-name')
        let statuses = createTaskForm.querySelector('select[name=status]');
        // clear all statuses, then for re-populate
        statuses.innerHTML = ''
        columnNames.forEach(function (object) {
            let newOption = document.createElement('option')
            newOption.textContent = object.value
            newOption.value = object.value
            statuses.appendChild(newOption)
        })
    }

    updateDeleteButton() {
        // updating delete button functionality for all buttons - this function is reused where possible
        let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
        allDeleteColumnButtons.forEach(function (button) {
            let columns = document.getElementsByClassName('column')
            let column = button.parentElement.parentElement
            let cards = column.querySelectorAll('.card')

            if (columns.length > 3 && cards.length == 0) {
                button.classList.remove('disabled')
            } else if (columns.length <= 3 || cards.length > 0) {
                button.classList.add('disabled')
            }
        })
    }

    editColumn(editColumnButton) {
        // reusable function for event listeners below
        function updateColumns() {
            // updating options from task form dropdown when a columns are renamed or deleted
            let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
            allDeleteColumnButtons.forEach(function (button) {
                let columns = document.getElementsByClassName('column')
                let column = button.parentElement.parentElement
                let cards = column.querySelectorAll('.card')
    
                if (columns.length > 3 && cards.length == 0) {
                    button.classList.remove('disabled')
                } else if (columns.length <= 3 || cards.length > 0) {
                    button.classList.add('disabled')
                }
            })

            // updating delete button functionality for all buttons
            const createTaskForm = document.getElementById('create-task-form')
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

        // everytime the title is edited, update the value and refresh all edit and delete button statuses 
        let column = editColumnButton.parentElement
        let columnNameInput = column.querySelector('input.column-name')
        columnNameInput.addEventListener('change', function (event) {
            updateColumns()
        })
        columnNameInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                columnNameInput.blur()
            }
            updateColumns()
        })

        // focus on input for renaming
        editColumnButton.addEventListener('click', function () {
            columnNameInput.focus()
        })
        // setting the tooltip
        const columnEditToolTip = document.querySelector('div.tooltip#edit')
        editColumnButton.addEventListener('mouseover', function () {
            editColumnButton.parentElement.appendChild(columnEditToolTip)
        })
    }

    deleteColumn(deleteColumnButton) {
        // allow delete functionality for most columns as long as there are at least 3 and there are no cards in the column
        deleteColumnButton.addEventListener('click', function () {
            let columns = document.getElementsByClassName('column')
            let column = deleteColumnButton.parentElement.parentElement
            let cards = column.querySelectorAll('.card')
            // check for more than 3 columns, and no cards within the column
            if (columns.length > 3 && cards.length == 0) {
                column.remove()

                /////////////
                // updating status of all the edit and delete buttons when the delete button is clicked
                let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
                allDeleteColumnButtons.forEach(function (button) {
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
                
                // updating the options in the task form dropdown 
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
        })

        // update tooltip
        const columnDeleteToolTip = document.querySelector('div.tooltip#delete')
        // adding event listeners for appropriate functionality on mouse over
        deleteColumnButton.addEventListener('mouseover', function () {
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

        let tasks = document.getElementById('tasks')
        tasks.appendChild(column)

        // update the buttons to enable delete and edit status
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