import Group from './group'
import * as countTiles from './count-tiles'

// begin by updating how many tiles there are in the groups
countTiles.countTiles()

const createContentForm = document.getElementById('create-content-form')
// updating the group names that a card can be organised in, if any change happens to the group names
function updateGroupNames() {
    let groupNames = document.querySelectorAll('.group-name')
    let groups = createContentForm.querySelector('select[name=group]');
    groups.innerHTML = ''
    // for all of the group names, we'll want to update the select options
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
// opening/closing the 'add a new group' form
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

// adding an event listener to bring up the form
newGroup.addEventListener('click', toggleGroupForm)

// adding event listeners to close the form without saving any input
const groupCancelButton = document.getElementById('add-group-cancel')
const groupCloseButton = groupCancelButton.nextElementSibling
groupCancelButton.addEventListener('click', function() {
    toggleGroupForm()
})
groupCloseButton.addEventListener('click', function() {
    toggleGroupForm()
})

// adding an event listener for submitting the column
const groupSubmitButton = document.getElementById('add-group-submit')
groupSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // setting an id and name
    let id = Date.now()
    let name = addGroupForm.querySelector('input').value

    // create new object in group class
    let group = new Group(id, name)
    group.createGroup()

    // reset states
    toggleGroupForm()
    updateGroupNames()
    countTiles.openGroupLinks()
    countTiles.countTiles()
    groupEditDeleteFunctionality()
})

// allow for each group's edit and delete functionality
function groupEditDeleteFunctionality() {

    const groupTitles = document.querySelectorAll('div.group-title')
    groupTitles.forEach(function(groupTitle) {
        let editGroupButton = groupTitle.querySelector('svg.edit-group')
        let deleteGroupButton = groupTitle.querySelector('svg.delete-group')
        let groupNameInput = groupTitle.querySelector('input.group-name')
    
        editGroupButton.addEventListener('click', function() {
            groupNameInput.focus()
        })
        groupNameInput.addEventListener('change', function(event) {
            updateGroupNames();
            console.log('changed')
        })
        groupNameInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                groupNameInput.blur()
            }
            updateGroupNames();
        })
        editGroupButton.addEventListener('mouseover', function() {
            let groupEditToolTip = document.querySelector('div.tooltip#edit-group')

            if (groupEditToolTip === null) {
                let newToolTip = document.createElement('div')
                newToolTip.setAttribute('id', 'edit-group')
                newToolTip.classList.add('tooltip')
                newToolTip.textContent = 'Rename group'
                editGroupButton.parentElement.appendChild(newToolTip)
            } else {
                editGroupButton.parentElement.appendChild(groupEditToolTip)
            }
            
        })
    
        deleteGroupButton.addEventListener('click', function() {
            let groups = document.getElementsByClassName('group')
            let group = groupTitle.parentElement
            let tiles = group.querySelectorAll('.tile')
            if (groups.length > 1 && tiles.length == 0) {
                group.remove()
                updateGroupNames()
            }
        })
    
        deleteGroupButton.addEventListener('mouseover', function() {
            let groups = document.getElementsByClassName('group')
            let group = groupTitle.parentElement
            let tiles = group.querySelectorAll('.tile')
            let groupDeleteToolTip = document.querySelector('div.tooltip#delete-group')

            if (groupDeleteToolTip === null) {
                let newToolTip = document.createElement('div')
                newToolTip.setAttribute('id', 'delete-group')
                newToolTip.classList.add('tooltip')
                newToolTip.textContent = 'Delete group'
                deleteGroupButton.parentElement.appendChild(newToolTip)
            } else {
                deleteGroupButton.parentElement.appendChild(groupDeleteToolTip)
            }

            if (groups.length > 1 && tiles.length == 0) {
                deleteGroupButton.classList.remove('disabled')
            } else if (groups.length <= 1 || tiles.length > 0) {
                deleteColumnButton.classList.add('disabled')
            }
        })
    })
}
