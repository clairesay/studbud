
import Group from './group'
import * as countTiles from './count-tiles'

countTiles.countTiles()

const createContentForm = document.getElementById('create-content-form')
function updateGroupNames() {
    let groupNames = document.querySelectorAll('.group-name')
    let groups = createContentForm.querySelector('select[name=group]');
    groups.innerHTML = ''
    groupNames.forEach(function (object) {
        let newOption = document.createElement('option')
        newOption.textContent = object.value
        newOption.value = object.value
        groups.appendChild(newOption)
    })
}
updateGroupNames()

const modalBackground = document.getElementById('modal-background')
const addGroupForm = document.getElementById('add-group-form')
var newGroupToggle = false;
const newGroup = document.getElementById('new-group');

function toggleGroupForm() {
    if (newGroupToggle == false) {
        addGroupForm.classList.add('active')
        newGroupToggle = true
        modalBackground.style.display = 'flex'
    } else if (newGroupToggle == true) {
        addGroupForm.classList.remove('active')
        addGroupForm.reset()
        newGroupToggle = false
        modalBackground.style.display = 'none'
    }
}

// function createNewSortable() {
//     let newCard = document.querySelectorAll('.cards')
//     newCard = newCard[newCard.length - 1]
//     new Sortable(newCard, {
//         group: 'nested',
//         animation: 200,
//         swapThreshold: 0.65,
//         ghostClass: 'ghost-card',
//         chosenClass: 'chosen-card',
//         dragClass: "sortable-drag",
//         forceFallback: true,
//         onEnd: function (evt) {
//             kanbanA.countCards()
//         }
//     })
// }

// adding an event listener to bring up the form
newGroup.addEventListener('click', toggleGroupForm)

// adding an event listener for submitting the column
const groupCancelButton = document.getElementById('add-group-cancel')
const groupCloseButton = groupCancelButton.nextElementSibling
// columnCancelButton.querySelector('~ button.form-close')
groupCancelButton.addEventListener('click', function() {
    toggleGroupForm()
})
groupCloseButton.addEventListener('click', function() {
    toggleGroupForm()
})

const groupSubmitButton = document.getElementById('add-group-submit')
groupSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();

    let id = Date.now()
    let name = addGroupForm.querySelector('input').value
    console.log(name)
    let group = new Group(id, name)
    group.createGroup()

    // updateColumnNames()


    toggleGroupForm()
    updateGroupNames()
    countTiles.openGroupLinks()
    countTiles.countTiles()
    // createNewSortable();
})

// /// OPEN LINKS //
// open

// // //////////// COLUMN BUTTONS
// const columnDeleteToolTip = document.querySelector('div.tooltip#delete')
// const columnEditToolTip = document.querySelector('div.tooltip#edit')
// const columnTitles = document.querySelectorAll('div.title')
// columnTitles.forEach(function(columnTitle) {
//     let editColumnButton = columnTitle.querySelector('svg.edit-column')
//     let deleteColumnButton = columnTitle.querySelector('svg.delete-column')
//     let columnNameInput = columnTitle.querySelector('input.column-name')

//     editColumnButton.addEventListener('click', function() {
//         // columnNameInput.removeAttribute('disabled')
//         columnNameInput.focus()
//     })
//     columnNameInput.addEventListener('change', function(event) {
//         updateColumnNames();
//         console.log('changed')
//     })
//     columnNameInput.addEventListener('keyup', function(event) {
//         if (event.key === 'Enter') {
//             columnNameInput.blur()
//         }
//         updateColumnNames();
//     })
//     editColumnButton.addEventListener('mouseover', function() {
//         editColumnButton.parentElement.appendChild(columnEditToolTip)
//     })

//     deleteColumnButton.addEventListener('click', function() {
//         let columns = document.getElementsByClassName('column')
//         let column = columnTitle.parentElement
//         let cards = column.querySelectorAll('.card')
//         if (columns.length > 3 && cards.length == 0) {
//             column.remove()
//             updateColumnNames()
//         }
//     })

//     deleteColumnButton.addEventListener('mouseover', function() {
//         let columns = document.getElementsByClassName('column')
//         let column = columnTitle.parentElement
//         let cards = column.querySelectorAll('.card')
//         deleteColumnButton.parentElement.appendChild(columnDeleteToolTip)
//         if (columns.length > 3 && cards.length == 0) {
//             deleteColumnButton.classList.remove('disabled')
//         } else if (columns.length <= 3 || cards.length > 0) {
//             deleteColumnButton.classList.add('disabled')
//         }
//     })
// })

