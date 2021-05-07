// //////////////////////////////////////////// ADD COLUMN //////////////////////////////////////////////// //
const newTask = document.getElementById('new-task');
var editTask = document.querySelectorAll('.card');
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

// adding an event listener to bring up the form
newColumn.addEventListener('click', function () {
    if (newColumnToggle == false) {
        addColumnForm.classList.add('active')
        newColumnToggle = true
        modalBackground.style.display = 'flex'
    } else if (newColumnToggle == true) {
        addColumnForm.classList.remove('active')
        newColumnToggle = false
        modalBackground.style.display = 'none'
    }
})

// adding an event listener for submitting the column
const columnSubmitButton = document.getElementById('add-column-submit')
columnSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // creating the column
    let column = document.createElement('div')
    column.classList.add('column')
    let title = document.createElement('div')
    title.classList.add('title')
    let columnName = document.createElement('input')
    columnName.classList.add('column-name')

    // giving it the name provided by the user
    let columnNameValue = addColumnForm.querySelectorAll('input')[0]
    columnName.value = columnNameValue.value
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
    updateColumnNames()
    // close the form
    newColumnToggle = false;
    modalBackground.style.display = 'none'
    addColumnForm.reset()
    addColumnForm.classList.remove('active')

    var newCards = document.querySelectorAll('.cards')
    newCards = newCards[newCards.length - 1]
    createNewSortable(newCards);
})

function createNewSortable(element) {
    new Sortable(element, {
        group: 'nested',
        animation: 200,
        swapThreshold: 0.65,
        ghostClass: 'ghost-card',
        chosenClass: 'chosen-card',
        forceFallback: true,
        onEnd: function (evt) {
            countCards()
        }
    })
}
///////////////////////////////////////////////////////