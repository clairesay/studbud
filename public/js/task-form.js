import Task from './task'
import * as kanban from './kanban'

// opening or closing the task form and changing its type
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

    taskList.forEach(function(task) {

        let thisTask = task
        if (thisTask.id == objectId) {
            let taskDetails = createTaskForm.querySelectorAll('form input');

            // taskName
            taskDetails[0].value = thisTask.name
            // taskDescription
            taskDetails[1].value = thisTask.description
            // taskSubject 
            taskDetails[2].value = thisTask.subject

            // taskStatus
            let statuses = createTaskForm.querySelector('select[name=status]');
            statuses.value = object.parentElement.parentElement.parentElement.querySelector('div.title input.column-name').value

            // taskPriorityRating
            if (thisTask.priorityRating == 'Low') {
                taskDetails[3].checked = true
            } else if (thisTask.priorityRating == 'Mid') {
                taskDetails[4].checked = true
            } else if (thisTask.priorityRating == 'High') {
                taskDetails[5].checked = true
            }
            
            // taskEstimatedTimeHr
            taskDetails[6].value = thisTask.estimatedTimeHr
            // taskEstimatedTimeMin
            taskDetails[7].value = thisTask.estimatedTimeMin
            // taskDueDate
            taskDetails[8].value = thisTask.dueDate

            taskSaveButton.value = thisTask.id
            toggleTaskForm('update')
        }
    })
}

// getting all of the task details inputted by the user
function getTaskDetails(taskDetails) {
    let name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate;

    name = taskDetails[0].value;
    description = taskDetails[1].value;
    subject = taskDetails[2].value;
    var statuses = createTaskForm.querySelector('select[name=status]');
    status = statuses.value;

    // checking the radios 
    if (taskDetails[3].checked == true) {
        priorityRating = taskDetails[3].value
    } else if (taskDetails[4].checked == true) {
        priorityRating = taskDetails[4].value
    } else if (taskDetails[5].checked == true) {
        priorityRating = taskDetails[5].value
    }

    estimatedTimeHr = taskDetails[6].value;
    estimatedTimeMin = taskDetails[7].value;
    dueDate = taskDetails[8].value;

    return {name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate}
}

///////
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

    // depends whether we are updating or creating a task
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
    } else {
        taskID = Date.now()
    }

    // initialising variables
    let taskDetails = createTaskForm.querySelectorAll('form input');
    // get all of the user input in the input fields
    let task = getTaskDetails(taskDetails)

    // create a new task using the task class
    let newTask = new Task(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate, taskList)
    // append to taskList and create new card with task
    newTask.createCard(newTask.addTask());

    // close the form and add event listeners to any new items
    toggleTaskForm()
    reupdate()
})
