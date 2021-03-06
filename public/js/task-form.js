import Task from './task'
import * as kanban from './kanban'

var subjectList = []

// suggested subjects should not be duplicated
function updateSubjectList() {
    // check the task list for each subject
    taskList.forEach(function(task) {
        let taskSubject = task.subject.trim().toUpperCase()
        let duplicate = false
        // if the subject already exists in the subjectlist, its a duplicate so don't push
        for (let i = 0; i < subjectList.length; i ++) {
            if (subjectList[i] == taskSubject) {
                duplicate = true
            }
        }
        // otherwise, it's a unique subject, save to datalist --> user be recommended subjects they have already inputted when creating new tasks
        if (duplicate == false) {
            subjectList.push(taskSubject)
        }
    })

    // actually setting the options in the subjectlist
    let subjectOptions = document.querySelector('datalist#subject')
    subjectOptions.innerHTML = ''
    subjectList.forEach(function(subject) {
        let option = document.createElement('option')
        option.textContent = subject
        subjectOptions.appendChild(option)
    })
}

// opening or closing the task form and changing its type
function toggleTaskForm(type) {
    // clearing validate text and resetting required status
    validateText.innerHTML = ''
    createTaskForm.querySelector('input').removeAttribute('required')

    // check if its an update form if so, reword, and show corresponding buttons :)
    if (type == 'update') {
        createTaskForm.querySelector('h1').textContent = 'Edit task'
        createTaskForm.classList.add('update')
    } else {
        createTaskForm.querySelector('h1').textContent = 'Create new task'
        createTaskForm.classList.remove('update')
    }

    // check if we're closing or opening the form
    if (formVisible == false) {
        createTaskForm.classList.add('active')
        formVisible = true;
        modalBackground.style.display = 'flex'
    } else if (formVisible == true) {
        createTaskForm.classList.remove('active')
        formVisible = false;
        modalBackground.style.display = 'none'
        createTaskForm.reset()
        taskSaveButton.value = ''

        kanban.countCards()
        kanban.sortability()
    }
}

// adding event listeners to edit buttons 
function reupdate() {
    // each card has an edit button that allows users to reaccess and update task details
    let editButtons = document.querySelectorAll('.edit')
    editButtons.forEach(function (editButton) {

        // if there hasn't been a listener previously attached, attach one
        if (editButton.getAttribute('listener') !== 'true') {
            editButton.addEventListener('click', addAutoFill)
            editButton.setAttribute('listener', 'true')
        }
        function addAutoFill() {
            autoFillTaskDetails(editButton)
        }
    })
}

// autopopulates the form with existing task data previously inputted by user
function autoFillTaskDetails(object) {
    let objectId = object.parentElement.id;
    objectId = objectId.replace('t-', '')

    // for each element in the task list already
    taskList.forEach(function(task) {
        let thisTask = task
        if (thisTask.id == objectId) {
            let taskDetails = createTaskForm.querySelectorAll('form input');
            let textArea = createTaskForm.querySelector('textarea')
            // taskName
            taskDetails[0].value = thisTask.name
            // taskDescription
            textArea.value = thisTask.description
            // taskSubject 
            taskDetails[1].value = thisTask.subject

            // taskStatus
            let statuses = createTaskForm.querySelector('select[name=status]');
            statuses.value = object.parentElement.parentElement.parentElement.querySelector('div.title input.column-name').value

            // taskPriorityRating
            if (thisTask.priorityRating == 'Low') {
                taskDetails[2].checked = true
            } else if (thisTask.priorityRating == 'Mid') {
                taskDetails[3].checked = true
            } else if (thisTask.priorityRating == 'High') {
                taskDetails[4].checked = true
            }
            
            // taskEstimatedTimeHr
            taskDetails[5].value = thisTask.estimatedTimeHr
            // taskEstimatedTimeMin
            taskDetails[6].value = thisTask.estimatedTimeMin
            // taskDueDate
            taskDetails[7].value = thisTask.dueDate

            taskSaveButton.value = thisTask.id
            toggleTaskForm('update')
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

// getting all of the task details inputted by the user
function getTaskDetails(taskDetails) {
    let name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate;

    name = taskDetails[0].value;
    let textArea = createTaskForm.querySelector('textarea')
    description = textArea.value
    subject = taskDetails[1].value;
    
    let statuses = createTaskForm.querySelector('select[name=status]');
    status = statuses.value;

    // checking the radios 
    if (taskDetails[2].checked == true) {
        priorityRating = taskDetails[2].value
    } else if (taskDetails[3].checked == true) {
        priorityRating = taskDetails[3].value
    } else if (taskDetails[4].checked == true) {
        priorityRating = taskDetails[4].value
    }

    // estimated time
    estimatedTimeHr = taskDetails[5].value;
    estimatedTimeMin = taskDetails[6].value;
    dueDate = taskDetails[7].value;

    // return all input values from the form
    return {name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate}
}

// selecting relevant elements
var taskList = []
const newTask = document.getElementById('new-task');
const createTaskForm = document.getElementById('create-task-form')
const modalBackground = document.getElementById('modal-background')
var formVisible = false;

// create a new task
newTask.addEventListener('click', toggleTaskForm)

// adding event listeners to the form buttons.
const taskSaveButton = document.getElementById('task-save')
const taskCancelButton = document.getElementById('edit-task-cancel');
const taskCloseButton = taskCancelButton.nextElementSibling;
const taskDeleteButton = document.getElementById('edit-task-delete');

// cancelling the creation of a task without saving
taskCancelButton.addEventListener('click', function () {
    toggleTaskForm()
    reupdate()
})
taskCloseButton.addEventListener('click', function () {
    toggleTaskForm()
    reupdate()
})

// deleting a task
taskDeleteButton.addEventListener('click', function () {
    let id = parseInt(taskSaveButton.value)
    // iterate through existing elements in the task list and remove the match
    for (let i = 0; i < taskList.length; i++) {
        let oldTask = taskList[i]
        if (oldTask.id == id) {
            taskList.splice(taskList.indexOf(oldTask), 1)
            let oldCard = document.getElementById('t-' + id)
            oldCard.remove();
        }
    }

    // scroll back to top of form
    createTaskForm.scrollTop = 0;

    // reset form and other functionality
    toggleTaskForm()
    reupdate()
    enableButtons()
    updateSubjectList()
})

var validateText = createTaskForm.querySelector('.validate-message')
// saving a new task or updating
taskSaveButton.addEventListener('click', function (event) {
    event.preventDefault()

    // initialising variables
    let taskDetails = createTaskForm.querySelectorAll('form input');
    // get all of the user input in the input fields
    let task = getTaskDetails(taskDetails)

    // if there isn't at least a task name included in the form input, prevent form submission - ask for user to input name
    if (task.name == '') {
        taskDetails[0].setAttribute('required', 'true')
        validateText.innerHTML = 'Please enter a task name to save this task.'
    } else {
        // depends whether we are updating or creating a task
        // if updating, replace old content at the same ID 
        let taskID;
        if (createTaskForm.classList.contains('update')) {
            taskID = parseInt(taskSaveButton.value)
            for (let i = 0; i < taskList.length; i++) {
                var oldTask = taskList[i]
                if (oldTask.id == taskID) {
                    taskList.splice(taskList.indexOf(oldTask), 1)
                    let oldCard = document.getElementById('t-' + taskID)
                    oldCard.remove();
                    taskSaveButton.value = ''
                }
            }
        // otherwise, create a new ID
        } else {
            taskID = Date.now()
        }
        // create a new task using the task class
        let newTask = new Task(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate, taskList)
        // append to taskList and create new card with task
        newTask.createCard(newTask.addTask());

        // scroll back to top of form
        createTaskForm.scrollTop = 0;

        // close the form and add event listeners to any new items
        toggleTaskForm()
        reupdate()
        enableButtons()
        // update subjects
        updateSubjectList()
    }
})

// if user chooses to create new task through CTA in empty state message, open form like user clicked on top right hand CTA
var emptyStateButton = document.querySelector('#empty-state-tasks button')
emptyStateButton.addEventListener('click', function() {
    if (deviceSize != 'desktop') {
        // counter click for the 'buttons container dropdown'
        document.querySelector('#task-buttons button.icon').click()
    }
    newTask.click()
})