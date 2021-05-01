const newTask = document.getElementById('new-task');
const createTaskForm = document.getElementById('create-task-form')
var overlayToggle = false;
newTask.addEventListener('click', function() {
  console.log('clicked')
  // e.preventDefault();
  if (overlayToggle == false) {
    createTaskForm.classList.add('active')
    overlayToggle = true;
  } else if (overlayToggle == true) {
    createTaskForm.classList.remove('active')
    overlayToggle = false;
  }


} )

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
      // this.completionStatus = completionStatus;
      this.saveStatus = saveStatus;
    }
  
    // this adds tasks to the array taskList
    addTask() {
      taskList.push(this);
      // returns its index
      return taskList.indexOf(this)
    }
  //////////////////////////////////////////////////////////////
    // this prints the last task that was added to the array taskList
    // n represents the index of the element that was just added
    // printTask(n) {
    //   var printTask = document.createElement('p');
    //   var taskNode = document.createTextNode(
    //     'Task: ' + this.name +
    //     ' \nDescription: ' + this.description + 
    //     ' \nDue Date: ' + this.dueDate + 
    //     ' \nPriority Rating: ' + this.priorityRating + 
    //     ' \nEstimated Time to Completion: ' + this.estimatedTime
    //     // ' \nCompletion Status: ' + this.completionStatus
    //   );
    //   // adding text to the p tag
    //   printTask.appendChild(taskNode);
  
    //   // creating a delete button
    //   taskDelete = document.createElement('button')
    //   taskDelete.innerHTML = 'Delete Task'
    //   taskDelete.className = 'delete-button'
  
    //   taskDelete.addEventListener('click', function() {
    //     // removing the item from the task list array
    //     taskList[n].saveStatus = 'deleted'
    //     ////////// need to check position of this element in array after refreshing
  
    //     console.log(taskList)
    //     // removing this from the display too
    //     printTask.remove()
    //   })
  
    //   // adding delete button to the p tag
    //   printTask.appendChild(taskDelete)
  
    //   // adding the task to the display
    //   // taskDisplay.appendChild(printTask)
    // }
//////////////////////////////////////////////////////////////////////////
    createCard(n) {
      var card = document.createElement('article');
      var subjectTag = document.createElement('span'),
          title = document.createElement('h3'),
          description = document.createElement('p'),
          timeDetails = document.createElement('div'),
              dueDate = document.createElement('h4'),
              timeTag = document.createElement('span')

      card.classList.add('card')
      subjectTag.classList.add('tag')
      subjectTag.classList.add('subject')
      timeDetails.classList.add('time-details')
      timeTag.classList.add('time')
      timeTag.classList.add('tag')
      title.textContent = this.name;
      description.textContent = this.description;
      subjectTag.textContent = this.subject;
      // status.textContent = this.status;
      dueDate.textContent = this.dueDate;
      timeTag.textContent = this.estimatedTimeHr + this.estimatedTimeMin;

      // appending time details to time div
      timeDetails.appendChild(dueDate)
      timeDetails.appendChild(timeTag)

      // appending everything to whole div
      card.appendChild(subjectTag)
      card.appendChild(title)
      card.appendChild(description)
      card.appendChild(timeDetails)

      // appending card to column
      var cardContainer = document.getElementsByClassName('cards')
      if (this.status == 'ready') {
        cardContainer[0].appendChild(card)
      } else if (this.status == 'in-progress') {
        cardContainer[1].appendChild(card)
      } else if (this.status == 'done') {
        cardContainer[2].appendChild(card)
      }
      // console.log(status)
      // cardContainer.appendChild(card)
    }
  }
  
  // initialising task delete button
  var taskDelete = document.createElement('button')
  
  // creating an array that will be populated with tasks
  var taskList = [];
  
  // accessing the full form to create tasks
  // var taskForm = document.getElementById('task-form');
  
  // article to display tasks
  // var taskDisplay = document.getElementById('task-display');
  
  // initialising variables
  var taskDetails, task, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus;
  
  // selecting the submit button for the form
  var taskSubmitButton = document.getElementById('create-task-submit');
  
  // something to populate tasks with on the page
  
  // on submit:
  taskSubmitButton.addEventListener('click', function(event) {
    event.preventDefault()
    taskDetails = createTaskForm.querySelectorAll('form input');
    console.log(taskDetails)
    // get all of the user input in the input fields
    taskID = taskList.length
    taskName = taskDetails[0].value;
    taskDescription = taskDetails[1].value;
    taskSubject = taskDetails[2].value;
    var statuses = createTaskForm.querySelector('select[name=status]');
    taskStatus = statuses.value;
    // console.log('taskstatusis:' + taskStatus)
    // for (let i = 0; i < statuses.length; i ++) {
    //   if (statuses[i].selected == 'selected') {
    //     taskStatus = statuses[i].value
    //   }
    // }

  
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
    // checking the radios
    // if (taskDetails[7].checked == true) {
    //   taskCompletionStatus = taskDetails[7].value;
    // } else if (taskDetails[8].checked == true) {
    //   taskCompletionStatus = taskDetails[8].value;
    // }
  
    taskSaveStatus = 'saved';
  
    // create a new task using the task class
    task = new Task(taskID, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus)
    // task = new Task(taskID, taskName, taskDescription, taskDueDate, taskPriorityRating, taskEstimatedTime, taskCompletionStatus, taskSaveStatus)
  
    // add the task to the task list (repo)
  
    // task.printTask(task.addTask());

    // create new card with task
    task.createCard(task.addTask());

    // exit form
    overlayToggle = false;
    createTaskForm.classList.remove('active')
    createTaskForm.reset();
    // print to check
    console.log(taskList)
  })
  
  
// CHECKING FOR CHECKED CHECKBOX/RADIO
createTaskForm.addEventListener('click', function() {

})