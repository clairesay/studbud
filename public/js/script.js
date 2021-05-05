const newTask = document.getElementById('new-task');
var editTask = document.querySelectorAll('.card');
const createTaskForm = document.getElementById('create-task-form')
function updateColumnNames() {
  var columnNames = document.querySelectorAll('.column-name')
  var statuses = createTaskForm.querySelector('select[name=status]');
  statuses.innerHTML = ''
  columnNames.forEach(function(object) {
    var newOption = document.createElement('option')
    newOption.textContent = object.value
    newOption.value = object.value
    statuses.appendChild(newOption)
  })
}
updateColumnNames()

// STACK OVERFLOW https://stackoverflow.com/questions/4880381/check-whether-html-element-has-scrollbars

// RESIZING CARD WIDTH BASED ON OVERFLOW PROPERTIES TO ACCOUNT FOR SCROLLBAR
function cardWidth() {
  editTask.forEach(function(element) {
    var cardContainer = element.parentElement
    var hasVerticalScrollbar = cardContainer.scrollHeight > cardContainer.clientHeight;
    if (hasVerticalScrollbar) {
      element.style.width = 'auto';
      element.style.maxWidth = '90%'; 
    } else {
      element.style.width = 'auto';
      cardContainer.style.paddingRight = '36px';
    }
  })
}

// CREATE A NEW TASK

var overlayToggle = false;
newTask.addEventListener('click', openTaskForm)
function openTaskForm(type) {
  console.log('task-form-opened')
    if (type == 'update') {
      createTaskForm.querySelector('h1').textContent = 'Edit an existing task'
      createTaskForm.classList.add('update')

    } else {
      createTaskForm.querySelector('h1').textContent = 'Create a new task'
      createTaskForm.classList.remove('update')
    }
    if (overlayToggle == false) {
      // check if its an update form if so, reword, and show corresponding buttons :)
      createTaskForm.classList.add('active')
      overlayToggle = true;
      // reupdate()
    } else if (overlayToggle == true) {
      // createTaskForm.classList.remove('update')
      createTaskForm.classList.remove('active')
      createTaskForm.reset()
      overlayToggle = false;
      // reupdate()
    }
}

function reupdate() {
  console.log('reupdate')
  var card = document.querySelectorAll('.edit')
 card.forEach(function(object, index) {
     object.addEventListener('click', function() {
      console.log('click')
      autoFill(object)
      //  if (overlayToggle == false) {
      //    createTaskForm.classList.add('active')
         
      //    overlayToggle = true;
      //  } else if (overlayToggle == true) {
      //    createTaskForm.classList.remove('active')
      //    overlayToggle = false;
      //  }
     })
 })
 }
function autoFill(object) {
  console.log('autofill')
  var objectId = object.parentElement.id;
  objectId = objectId.replace('t-', '')

  for (let i = 0; i < taskList.length; i ++) {
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
      // console.log(object.parentElement.parentElement.parentElement.query)
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
      taskSaveButton.value = objectId
      openTaskForm('update')

    }
  }
}

// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
    // this is what it's made of
    constructor(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, saveStatus) {
    // constructor(id, name, description, dueDate, priorityRating, estimatedTime, completionStatus, saveStatus) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.subject = subject;
      this.status = status;
      this.priorityRating = priorityRating;
      this.estimatedTimeHr = estimatedTimeHr;
      this.estimatedTimeMin = estimatedTimeMin;
      this.dueDate = dueDate;

      this.saveStatus = saveStatus;
    }
  
    // this adds tasks to the array taskList
    addTask() {
      taskList.push(this);
      // returns its index
      // return taskList.indexOf(this)
      return this.id
    }

    updateTask(id) {
      var myObject = taskList.filter(function(element) {
        return element.id == id;
      })
    }
  
    createCard(n) {
      var card = document.createElement('article');
      var subjectTag = document.createElement('span'),
          title = document.createElement('h3'),
          description = document.createElement('p'),
          timeDetails = document.createElement('div'),
              dueDate = document.createElement('h4'),
              timeTag = document.createElement('span'),
          
          editIcon = document.createElement('a')
          editIcon.classList.add('edit') 
          editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`
      card.classList.add('card')
      card.setAttribute('id', 't-'+ n)
      subjectTag.classList.add('tag')
      subjectTag.classList.add('subject')
      timeDetails.classList.add('time-details')
      timeTag.classList.add('time')
      timeTag.classList.add('tag')
      title.textContent = this.name;
      description.textContent = this.description;
      subjectTag.textContent = this.subject;
      dueDate.textContent = this.dueDate;
      timeTag.textContent = this.estimatedTimeHr + this.estimatedTimeMin;

      // appending time details to time div
      timeDetails.appendChild(dueDate)
      timeDetails.appendChild(timeTag)

      // appending everything to whole div
      card.appendChild(subjectTag)
      card.appendChild(title)
      card.appendChild(description)
      card.appendChild(editIcon)
      card.appendChild(timeDetails)

      // appending card to column

      var columnNames = document.querySelectorAll('.column-name')
      var cardContainers = document.querySelectorAll('.cards')
      var currentStatus = this.status
      columnNames.forEach(function setColumn(object, index) {
        if (object.value == currentStatus) {
          cardContainers[index].appendChild(card)
        }
      })
      // if (this.status == 'ready') {
      //   cardContainer[0].appendChild(card)
      // } else if (this.status == 'in-progress') {
      //   cardContainer[1].appendChild(card)
      // } else if (this.status == 'done') {
      //   cardContainer[2].appendChild(card)
      // }
      reupdate()
    }
}
  
// initialising task delete button
// var taskDelete = document.createElement('button')

// creating an array that will be populated with tasks
var taskList = [];

// accessing the full form to create tasks
// var taskForm = document.getElementById('task-form');

// article to display tasks
// var taskDisplay = document.getElementById('task-display');


// selecting the submit button for the form
var taskSubmitButton = document.getElementById('create-task-submit');
var taskSaveButton = document.getElementById('edit-task-save');
var taskCancelButton = document.getElementById('edit-task-cancel');
var taskDeleteButton = document.getElementById('edit-task-delete');
taskDeleteButton.addEventListener('click', function(event) {
    var id = parseInt(taskSaveButton.value)
    // console.log('we are in the save button. the id is '+ id)
    // if (id) {
    taskID = id
    for (let i = 0; i < taskList.length; i ++) {
      var oldTask = taskList[i]
      if (oldTask.id == id) {
        taskList.splice(taskList.indexOf(oldTask), 1)
        var oldCard = document.getElementById('t-' + id)
        oldCard.remove();
        taskSaveButton.value = ''
      }
    }
    overlayToggle = false;
    createTaskForm.classList.remove('active')
    createTaskForm.reset();
    counter()
    // reupdate()
})
taskCancelButton.addEventListener('click', function(event) {
  event.preventDefault()
  overlayToggle = false;
  createTaskForm.classList.remove('active')
  createTaskForm.reset();
  // reupdate()
})
taskSaveButton.addEventListener('click', function(event) {

  event.preventDefault()
  var taskDetails, task, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus;
  // taskDetailer(taskSaveButton.value)
  /////////////////////////////
  // initialising variables
  taskDetails = createTaskForm.querySelectorAll('form input');

  var id = parseInt(taskSaveButton.value)
  // console.log('we are in the save button. the id is '+ id)
  // if (id) {
  taskID = id
  for (let i = 0; i < taskList.length; i ++) {
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
  task = new Task(taskID, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus)
  task.createCard(task.addTask());
  overlayToggle = false;
  createTaskForm.classList.remove('active')
  createTaskForm.reset();
  counter()
  // reupdate()
})
// something to populate tasks with on the page

// on submit:
taskSubmitButton.addEventListener('click', function(event) {
  event.preventDefault()
  var taskDetails, task, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus;

  // taskDetailer()
  taskSaveStatus = 'saved';

  /////////////////////////////
    // initialising variables
    taskDetails = createTaskForm.querySelectorAll('form input');
    taskID = taskList.length
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
  task = new Task(taskID, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus)
  // task = new Task(taskID, taskName, taskDescription, taskDueDate, taskPriorityRating, taskEstimatedTime, taskCompletionStatus, taskSaveStatus)

  // add the task to the task list (repo)

  // task.printTask(task.addTask());
  task.createCard(task.addTask());
  // create new card with task
  // exit form
  overlayToggle = false;
  createTaskForm.classList.remove('active')
  createTaskForm.reset();
  // print to check

  counter()
  // reupdate()
})

// getting values of the card for editing

// //////////////////////////////////////////// ADD COLUMN //////////////////////////////////////////////// //
const addColumnForm = document.getElementById('add-column-form')
var newColumnToggle = false;
const newColumn = document.getElementById('new-column');

// adding an event listener to bring up the form
newColumn.addEventListener('click', function() {
  if (newColumnToggle == false) {
    addColumnForm.classList.add('active')
    newColumnToggle = true
  } else if (newColumnToggle == true) {
    addColumnForm.classList.remove('active')
    newColumnToggle = false
  }
})

// adding an event listener for submitting the column
const columnSubmitButton = document.getElementById('add-column-submit')
columnSubmitButton.addEventListener('click', function(event) {
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
        // console.log(evt.to)
        counter()

      }
    })
}

function counter() {
  var total = document.querySelectorAll('.total'),
  cards = document.querySelectorAll('.cards')
    total.forEach(function count(object, index) {
      counta = 0;
      for (let i = 0; i < cards[index].querySelectorAll('.card').length; i ++) {
          if (cards[index].querySelectorAll('.card')[i].classList.length == 1) {
              counta += 1
          }
      }
      total[index].textContent = counta;
  })
}