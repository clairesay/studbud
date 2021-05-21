// import Task from './task'
import * as kanban from './kanban'

// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
    
    // this is what it's made of
    constructor(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subject = subject;
        this.status = status;
        this.priorityRating = priorityRating;
        this.estimatedTimeHr = estimatedTimeHr;
        this.estimatedTimeMin = estimatedTimeMin;
        this.dueDate = dueDate;

        // this.taskList = taskList
    }

    // this adds tasks to the array taskList
    addTask() {
        taskList.push(this);
        console.log(taskList)
        localStorage.setItem('taskList', JSON.stringify(taskList))
        // console.log(localStorage.getItem('taskList'))
        return this.id
    }

    // making sure the column 'deletable' status is updated when a new card is added.
    updateColumnDelete() {
        let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
        allDeleteColumnButtons.forEach( function(button) {
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

    // this creates a new card and applies it to the kanban board
    createCard(n) {
        // initialising new elements
        let card = document.createElement('article'),
            subjectTag = document.createElement('span'),
            title = document.createElement('h3'),
            description = document.createElement('p'),
            timeDetails = document.createElement('div'),
            dueDate = document.createElement('h4'),
            timeTag = document.createElement('span'),
            editIcon = document.createElement('a'),
            timeIcon = document.createElement('div'),
            line = document.createElement('HR');

        // setting classes and attributes
        editIcon.classList.add('edit')
        editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`

        // time icon has been replaced with a priority rating
        timeIcon.style.width = '12px'
        timeIcon.style.height = '12px'
        timeIcon.style.borderRadius = '12px'
        if (this.priorityRating == 'Low') {
            timeIcon.style.backgroundColor = '#70B815'
        } else if (this.priorityRating == 'Mid') {
            timeIcon.style.backgroundColor = '#E5C44C'
        } else if (this.priorityRating == 'High') {
            timeIcon.style.backgroundColor = '#F59273'
        }
        card.classList.add('card')
        card.setAttribute('id', 't-' + n)
        subjectTag.classList.add('tag')
        subjectTag.classList.add('subject')
        timeDetails.classList.add('time-details')
        timeTag.classList.add('time')
        timeTag.classList.add('tag')

        // setting values
        title.textContent = this.name;
        description.textContent = this.description;
        subjectTag.textContent = this.subject;

        if (this.dueDate.length != 0) {
            let dueDateElements = this.dueDate.split('-')
            let month = months[parseInt(dueDateElements[1]) - 1]
            let day = dueDateElements[2]
            dueDate.textContent = 'Due ' + day + ' ' + month
        } else {
            dueDate.textContent = ''
        }


        // concatenating hour and minute estimated time durations
        if (this.estimatedTimeHr > 0 && this.estimatedTimeMin > 0) {
            timeTag.textContent = this.estimatedTimeHr + ' HR ' + this.estimatedTimeMin + ' MIN';
        } else if (this.estimatedTimeHr == 0 && this.estimatedTimeMin > 0) {
            timeTag.textContent = this.estimatedTimeMin + ' MIN';
        } else if (this.estimatedTimeHr > 0 && this.estimatedTimeMin == 0) {
            timeTag.textContent = this.estimatedTimeHr + ' HR';
        } else {
            timeTag.textContent = '∞'
        }


        // appending time details to time div
        timeDetails.appendChild(timeIcon)
        timeDetails.appendChild(dueDate)
        timeDetails.appendChild(timeTag)

        // appending everything to whole div
        if (this.subject.length != 0) {
            card.appendChild(subjectTag)
        }
        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(line)
        card.appendChild(timeDetails)
        card.appendChild(editIcon)

        // appending card to column
        let columnNames = document.querySelectorAll('.column-name')
        let cardContainers = document.querySelectorAll('.cards')
        let currentStatus = this.status
        columnNames.forEach(function setColumn(object, index) {
            if (object.value == currentStatus) {
                cardContainers[index].appendChild(card)
            }
        })

        this.updateColumnDelete();
    }
}

// export default Task

var subjectList = []
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// subject should not duplicate
function updateSubjectList() {
    taskList.forEach(function(task) {
        let taskSubject = task.subject.trim().toUpperCase()
        let duplicate = false
        for (i in subjectList) {
            if (subjectList[i] == taskSubject) {
                duplicate = true
            }
        }
        if (duplicate == false) {
            subjectList.push(taskSubject)
        }
    })

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
    // clearing validate text
    validateText.innerHTML = ''
    // check if its an update form if so, reword, and show corresponding buttons :)
    if (type == 'update') {
        createTaskForm.querySelector('h1').textContent = 'Edit task'
        createTaskForm.classList.add('update')
    } else {
        createTaskForm.querySelector('h1').textContent = 'Create new task'
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
            // taskDetails[].value = thisTask.description
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

// getting all of the task details inputted by the user
function getTaskDetails(taskDetails) {
    let name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate;

    name = taskDetails[0].value;
    let textArea = createTaskForm.querySelector('textarea')
    description = textArea.value
    // description = taskDetails[1].value;
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

    estimatedTimeHr = taskDetails[5].value;
    estimatedTimeMin = taskDetails[6].value;
    dueDate = taskDetails[7].value;

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
const taskCloseButton = taskCancelButton.nextElementSibling;
const taskDeleteButton = document.getElementById('edit-task-delete');

// deleting a task
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
    updateSubjectList()
})

// cancelling the creation of a task or button
taskCancelButton.addEventListener('click', function () {
    toggleTaskForm()
    reupdate()
})
taskCloseButton.addEventListener('click', function () {
    toggleTaskForm()
    reupdate()
})

var validateText = createTaskForm.querySelector('.validate-message')
// saving a new task or updating
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
    console.log(task.name)
    if (task.name == '') {
        validateText.innerHTML = 'Please enter a task name to save this task.'
    } else {
        // create a new task using the task class
        let newTask = new Task(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate)
        // append to taskList and create new card with task
        newTask.createCard(newTask.addTask());
        // localStorage.setItem('taskList', JSON.stringify(taskList))
        // close the form and add event listeners to any new items
        toggleTaskForm()
        reupdate()
        // update subjects
        updateSubjectList()
    }

})

