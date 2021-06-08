import Group from './group'
import * as resource from './resource'

// begin by updating how many tiles there are in the groups
resource.countTiles()

// selecting some DOM elements
const createContentForm = document.getElementById('create-content-form')
const modalBackground = document.getElementById('modal-background')
const addGroupForm = document.getElementById('add-group-form')
var newGroupToggle = false;
const newGroup = document.getElementById('new-group');

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

// opening/closing the 'add a new group' form
function toggleGroupForm() {
    // resetting any validation errors
    validateText.innerHTML = ''
    let name = addGroupForm.querySelector('input')
    name.removeAttribute('required')

    // open or close the group form
    if (newGroupToggle == false) {
        addGroupForm.classList.add('active')
        newGroupToggle = true
        modalBackground.style.display = 'flex'
    } else if (newGroupToggle == true) {
        addGroupForm.classList.remove('active')
        addGroupForm.reset()
        newGroupToggle = false
        modalBackground.style.display = 'none'

        // updating state of tiles and sortability after closing the form
        resource.countTiles()
        resource.sortability()
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
var validateText = addGroupForm.querySelector('.validate-message')
groupSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // setting an id and name
    let id = Date.now()
    let name = addGroupForm.querySelector('input')

    // if the user hasn't inputted anything, disallow form submission
    if (name.value == '') {
        validateText.innerHTML = 'Please enter a name for this group.'
        name.setAttribute('required', 'true')
    } else {
    // create new object in group class
    let group = new Group(id, name.value)
    group.createGroup()

    // reset states
    toggleGroupForm()
    updateGroupNames()
    resource.openGroupLinks()
    resource.countTiles()
    groupEditDeleteFunctionality()
    }
})

// allow for each group's edit and delete functionality
function groupEditDeleteFunctionality() {

    const groupTitles = document.querySelectorAll('div.group-title')
    groupTitles.forEach(function(groupTitle) {
        let editGroupButton = groupTitle.querySelector('svg.edit-group')
        let deleteGroupButton = groupTitle.querySelector('svg.delete-group')
        let groupNameInput = groupTitle.querySelector('input.group-name')
    
        // focus when clicked
        editGroupButton.addEventListener('click', function() {
            groupNameInput.focus()
        })
         // on change, reupdate all group names
        groupNameInput.addEventListener('change', function(event) {
            updateGroupNames();
        })
        // 'save' column name
        groupNameInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                groupNameInput.blur()
            }
            updateGroupNames();
        })
        // tooltip on hover
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
    // delete groups as long as there is more than 1 and there are no cards within it
        deleteGroupButton.addEventListener('click', function() {
            let groups = document.getElementsByClassName('group')
            let group = groupTitle.parentElement
            let tiles = group.querySelectorAll('.tile')
            if (groups.length > 1 && tiles.length == 0) {
                group.remove()
                updateGroupNames()
            }
        })
    
        // on hover, appending the right tooltip to the 'delete' button
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

            // checking for the need to enable or disable buttons
            if (groups.length > 1 && tiles.length == 0) {
                deleteGroupButton.classList.remove('disabled')
            } else if (groups.length <= 1 || tiles.length > 0) {
                deleteGroupButton.classList.add('disabled')
            }
        })

        // updating all groups dynamically
        let allDeleteGroupButtons = document.querySelectorAll('svg.delete-group')
        allDeleteGroupButtons.forEach(function (button) {
            let groups = document.getElementsByClassName('group')
            let group = button.parentElement.parentElement.parentElement
            let tiles = group.querySelectorAll('.tile')

            //if there are tiles inside the group, or there is only 1 group, delete is disabled. 
            if (groups.length > 1 && tiles.length == 0) {
                button.classList.remove('disabled')
            } else if (groups.length <= 1 || tiles.length > 0) {
                button.classList.add('disabled')
            }
        })
    })
}


// ////// ON LOAD

// import Content from './content'
// import Group from './group'
// import Task from './task'
// import Column from './column'

// If there are items in local storage - create groups create columns
// create card for each task in column
// create tile for each content in group

// window.addEventListener('load', function() {

//     if (localStorage.getItem('groupList') != null) {
//         let groups = JSON.parse(localStorage.getItem('groupList'));
//         groups.forEach(function(group) {
//             let newGroup = new Group(group.id, group.name)
//             newGroup.createGroup()
//             newGroup.addGroup()

//             updateGroupNames()
//             resource.openGroupLinks()
//             resource.resource()
//             groupEditDeleteFunctionality()
//         })
//     }
// })
