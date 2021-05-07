import Column from './column'
import * as kanbanA from './kanban'

const createTaskForm = document.getElementById('create-task-form')
function updateColumnNames() {
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
updateColumnNames()

const modalBackground = document.getElementById('modal-background')
const addColumnForm = document.getElementById('add-column-form')
var newColumnToggle = false;
const newColumn = document.getElementById('new-column');

function toggleColumnForm() {
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

function createNewSortable() {
    let newCard = document.querySelectorAll('.cards')
    newCard = newCard[newCard.length - 1]
    new Sortable(newCard, {
        group: 'nested',
        animation: 200,
        swapThreshold: 0.65,
        ghostClass: 'ghost-card',
        chosenClass: 'chosen-card',
        forceFallback: true,
        onEnd: function (evt) {
            kanbanA.countCards()
        }
    })
}

// adding an event listener to bring up the form
newColumn.addEventListener('click', toggleColumnForm)

// adding an event listener for submitting the column
const columnCancelButton = document.getElementById('add-column-cancel')
const columnCloseButton = columnCancelButton.nextElementSibling
// columnCancelButton.querySelector('~ button.form-close')
columnCancelButton.addEventListener('click', function() {
    toggleColumnForm()
})
columnCloseButton.addEventListener('click', function() {
    toggleColumnForm()
})

const columnSubmitButton = document.getElementById('add-column-submit')
columnSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();

    let id = Date.now()
    let name = addColumnForm.querySelector('input').value

    let col = new Column(id, name)
    col.createColumn()

    updateColumnNames()

    toggleColumnForm()

    createNewSortable();
})
