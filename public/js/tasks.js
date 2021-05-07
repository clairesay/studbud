import './misc'
import Task from './task'
import * as kanban from './kanban'

///////
var taskList = []

///////
const newTask = document.getElementById('new-task');
const createTaskForm = document.getElementById('create-task-form')

// CREATE A NEW TASK
const modalBackground = document.getElementById('modal-background')
var formVisible = false;
newTask.addEventListener('click', toggleTaskForm)

function toggleTaskForm(type) {
    // check if its an update form if so, reword, and show corresponding buttons :)
    if (type == 'update') {
        createTaskForm.querySelector('h1').textContent = 'Edit an existing task'
        createTaskForm.classList.add('update')

    } else {
        createTaskForm.querySelector('h1').textContent = 'Create a new task'
        createTaskForm.classList.remove('update')
    }
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
    }
}

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
            autoFill(editButton)
        }
    })
}

// this function autopopulates the data
function autoFill(object) {
    var objectId = object.parentElement.id;
    objectId = objectId.replace('t-', '')

    for (let i = 0; i < taskList.length; i++) {
        var thisTask = taskList[i]
        if (thisTask.id == objectId) {
            var taskDetails = createTaskForm.querySelectorAll('form input');

            // taskName
            taskDetails[0].value = thisTask.name
            // taskDescription
            taskDetails[1].value = thisTask.description
            // taskSubject 
            taskDetails[2].value = thisTask.subject
            //status SELECT THE STATUS

            var statuses = createTaskForm.querySelector('select[name=status]');
            // statuses.value = thisTask.status

            statuses.value = object.parentElement.parentElement.parentElement.querySelector('div.title input.column-name').value
            // 3 is low
            // 4 is mid
            // 5 is high
            if (thisTask.priorityRating == 'Low') {
                taskDetails[3].checked = true
            } else if (thisTask.priorityRating == 'Mid') {
                taskDetails[4].checked = true
            } else if (thisTask.priorityRating == 'High') {
                taskDetails[5].checked = true
            }
            // name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, saveStatus
            // taskEstimatedTimeHr
            taskDetails[6].value = thisTask.estimatedTimeHr
            // taskEstimatedTimeMin
            taskDetails[7].value = thisTask.estimatedTimeMin
            // taskDueDate
            taskDetails[8].value = thisTask.dueDate

            taskSaveButton.value = thisTask.id
            toggleTaskForm('update')

        }
    }
}

// selecting the submit button for the form
const taskSubmitButton = document.getElementById('create-task-submit');
const taskSaveButton = document.getElementById('edit-task-save');
const taskCancelButton = document.getElementById('edit-task-cancel');
const taskDeleteButton = document.getElementById('edit-task-delete');

taskDeleteButton.addEventListener('click', function () {
    let id = parseInt(taskSaveButton.value)

    for (let i = 0; i < taskList.length; i++) {
        let oldTask = taskList[i]
        if (oldTask.id == id) {
            taskList.splice(taskList.indexOf(oldTask), 1)
            let oldCard = document.getElementById('t-' + id)
            oldCard.remove();
        }
    }
    toggleTaskForm()
    reupdate()
})

taskCancelButton.addEventListener('click', function () {
    toggleTaskForm()
    reupdate()
})

taskSaveButton.addEventListener('click', function (event) {

    event.preventDefault()
    var taskDetails, task, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate;

    // initialising variables
    taskDetails = createTaskForm.querySelectorAll('form input');

    var id = parseInt(taskSaveButton.value)

    taskID = id
    for (let i = 0; i < taskList.length; i++) {
        var oldTask = taskList[i]
        if (oldTask.id == id) {
            taskList.splice(taskList.indexOf(oldTask), 1)
            var oldCard = document.getElementById('t-' + id)
            oldCard.remove();
            taskSaveButton.value = ''
        }
    }

    // get all of the user input in the input fields

    taskName = taskDetails[0].value;
    taskDescription = taskDetails[1].value;
    taskSubject = taskDetails[2].value;
    var statuses = createTaskForm.querySelector('select[name=status]');
    taskStatus = statuses.value;

    // checking the radios 
    if (taskDetails[3].checked == true) {
        taskPriorityRating = taskDetails[3].value
    } else if (taskDetails[4].checked == true) {
        taskPriorityRating = taskDetails[4].value
    } else if (taskDetails[5].checked == true) {
        taskPriorityRating = taskDetails[5].value
    }

    taskEstimatedTimeHr = taskDetails[6].value;
    taskEstimatedTimeMin = taskDetails[7].value;
    taskDueDate = taskDetails[8].value;
    /////////////////////////////
    task = new Task(taskID, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskList)
    task.createCard(task.addTask());

    toggleTaskForm()

    reupdate()
})
// something to populate tasks with on the page

// on submit:
taskSubmitButton.addEventListener('click', function (event) {
    event.preventDefault()
    var taskDetails, task, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate;

    /////////////////////////////
    // initialising variables
    taskDetails = createTaskForm.querySelectorAll('form input');
    taskID = Date.now()
    // get all of the user input in the input fields

    taskName = taskDetails[0].value;
    taskDescription = taskDetails[1].value;
    taskSubject = taskDetails[2].value;
    var statuses = createTaskForm.querySelector('select[name=status]');
    taskStatus = statuses.value;

    // checking the radios 
    if (taskDetails[3].checked == true) {
        taskPriorityRating = taskDetails[3].value
    } else if (taskDetails[4].checked == true) {
        taskPriorityRating = taskDetails[4].value
    } else if (taskDetails[5].checked == true) {
        taskPriorityRating = taskDetails[5].value
    }

    taskEstimatedTimeHr = taskDetails[6].value;
    taskEstimatedTimeMin = taskDetails[7].value;
    taskDueDate = taskDetails[8].value;
    /////////////////////////////
    // create a new task using the task class
    task = new Task(taskID, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskList)

    task.createCard(task.addTask());
    // create new card with task

    toggleTaskForm()
    reupdate()
})

