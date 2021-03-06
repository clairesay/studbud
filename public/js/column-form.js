import Column from './column'
import * as kanban from './kanban'

const createTaskForm = document.getElementById('create-task-form')

// updates all column names after any change/renaming is done
function updateColumnNames() {
    let columnNames = document.querySelectorAll('.column-name')
    // reset the form statuses for the create task form
    let statuses = createTaskForm.querySelector('select[name=status]');
    statuses.innerHTML = ''
    // apply all the new column names
    columnNames.forEach(function (object) {
        let newOption = document.createElement('option')
        newOption.textContent = object.value
        newOption.value = object.value
        statuses.appendChild(newOption)
    })
}
updateColumnNames()

const modalBackground = document.getElementById('modal-background')
const addColumnForm = document.getElementById('add-column-form')
var newColumnToggle = false;
const newColumn = document.getElementById('new-column');

// toggle the column form to either show or hide
function toggleColumnForm() {
    // reset the validation required messages
    validateText.innerHTML = ''
    let name = addColumnForm.querySelector('input')
    name.removeAttribute('required')

    // toggle the column form to show/hide
    if (newColumnToggle == false) {
        addColumnForm.classList.add('active')
        newColumnToggle = true
        modalBackground.style.display = 'flex'
    } else if (newColumnToggle == true) {
        addColumnForm.classList.remove('active')
        addColumnForm.reset()
        newColumnToggle = false
        modalBackground.style.display = 'none'
    }
}

// enable sortable functionality for new created column
function createNewSortable() {
    let newCard = document.querySelectorAll('.cards')
    newCard = newCard[newCard.length - 1]
    new Sortable(newCard, {
        group: 'nested',
        animation: 200,
        swapThreshold: 0.65,
        ghostClass: 'ghost-card',
        chosenClass: 'chosen-card',
        dragClass: "sortable-drag",
        filter: '.filtered',
        forceFallback: true,
        onEnd: function (evt) {
            kanban.countCards()
        }
    })
}

//updating disabled/enabled status for all buttons
function enableButtons() {
    let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
    allDeleteColumnButtons.forEach( function(button) {
        let columns = document.getElementsByClassName('column')
        let column = button.parentElement.parentElement
        let cards = column.querySelectorAll('.card')

        // checking for more than 3 columns and no cards within column
        if (columns.length > 3 && cards.length == 0) {
            button.classList.remove('disabled')
        } else if (columns.length <= 3 || cards.length > 0) {
            button.classList.add('disabled')
        }
    })
}

// adding an event listener to bring up the form
newColumn.addEventListener('click', toggleColumnForm)

// adding an event listener for submitting the column
const columnCancelButton = document.getElementById('add-column-cancel')
const columnCloseButton = columnCancelButton.nextElementSibling

// closing the column without saving
columnCancelButton.addEventListener('click', function () {
    toggleColumnForm()
})
columnCloseButton.addEventListener('click', function () {
    toggleColumnForm()
})

// submitting column
const columnSubmitButton = document.getElementById('add-column-submit')
var validateText = addColumnForm.querySelector('.validate-message')
columnSubmitButton.addEventListener('click', function (event) {
    event.preventDefault()

    let id = Date.now()
    let name = addColumnForm.querySelector('input')

    // if there isn't a name for the column, don't submit the form. ask user to input
    if (name.value == '') {
        validateText.innerHTML = 'Please enter a name for this column.'
        name.setAttribute('required', 'true')
    } else {
        // create a column
        let col = new Column(id, name.value)
        col.createColumn()

        // reset statuses
        enableButtons()
        updateColumnNames()
        toggleColumnForm()
        createNewSortable();
        columnEditDeleteFunctionality()
    }
})

// //////////// COLUMN DELETE and EDIT BUTTONS
const columnDeleteToolTip = document.querySelector('div.tooltip#delete')
const columnEditToolTip = document.querySelector('div.tooltip#edit')

// for all the columns
function columnEditDeleteFunctionality() {
    const columnTitles = document.querySelectorAll('div.title')
    columnTitles.forEach(function (columnTitle) {
        let editColumnButton = columnTitle.querySelector('svg.edit-column')
        let deleteColumnButton = columnTitle.querySelector('svg.delete-column')
        let columnNameInput = columnTitle.querySelector('input.column-name')

        // focus when clicked
        editColumnButton.addEventListener('click', function () {
            columnNameInput.focus()
        })
        // on change, reupdate all column names
        columnNameInput.addEventListener('change', function (event) {
            updateColumnNames();
        })
        // 'save' column name
        columnNameInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                columnNameInput.blur()
            }
            updateColumnNames();
        })
        // tooltip on hover
        editColumnButton.addEventListener('mouseover', function () {
            editColumnButton.parentElement.appendChild(columnEditToolTip)
        })
        // delete columns as long as there are more than 3 and there are no cards within it
        deleteColumnButton.addEventListener('click', function () {
            let columns = document.getElementsByClassName('column')
            let column = columnTitle.parentElement
            let cards = column.querySelectorAll('.card')
            if (columns.length > 3 && cards.length == 0) {
                column.remove()
                updateColumnNames()
            }
            // updating the 'disabled' visual of each delete icon
            let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
            allDeleteColumnButtons.forEach(function (button) {
                let columns = document.getElementsByClassName('column')
                let column = button.parentElement.parentElement
                let cards = column.querySelectorAll('.card')

                //if there are cards inside the column, or there are only 3 columns, delete is disabled. 
                if (columns.length > 3 && cards.length == 0) {
                    button.classList.remove('disabled')
                } else if (columns.length <= 3 || cards.length > 0) {
                    button.classList.add('disabled')
                }
            })
        })

        // updating 'disabled' status for icons on hover
        deleteColumnButton.addEventListener('mouseover', function () {
            let columns = document.getElementsByClassName('column')
            let column = columnTitle.parentElement
            let cards = column.querySelectorAll('.card')
            deleteColumnButton.parentElement.appendChild(columnDeleteToolTip)
            if (columns.length > 3 && cards.length == 0) {
                deleteColumnButton.classList.remove('disabled')
            } else if (columns.length <= 3 || cards.length > 0) {
                deleteColumnButton.classList.add('disabled')
            }
        })
    })
}
columnEditDeleteFunctionality()