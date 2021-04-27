// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
    // this is what it's made of
    constructor(id, name, description, dueDate, priorityRating, estimatedTime, completionStatus, saveStatus) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
      this.priorityRating = priorityRating;
      this.estimatedTime = estimatedTime;
      this.completionStatus = completionStatus;
      this.saveStatus = saveStatus;
    }
  
    // this adds tasks to the array taskList
    addTask() {
      taskList.push(this);
      // returns its index
      return taskList.indexOf(this)
    }
  
    // this prints the last task that was added to the array taskList
    // n represents the index of the element that was just added
    printTask(n) {
      var printTask = document.createElement('p');
      var taskNode = document.createTextNode(
        'Task: ' + this.name +
        ' \nDescription: ' + this.description + 
        ' \nDue Date: ' + this.dueDate + 
        ' \nPriority Rating: ' + this.priorityRating + 
        ' \nEstimated Time to Completion: ' + this.estimatedTime +
        ' \nCompletion Status: ' + this.completionStatus
      );
      // adding text to the p tag
      printTask.appendChild(taskNode);
  
      // creating a delete button
      taskDelete = document.createElement('button')
      taskDelete.innerHTML = 'Delete Task'
      taskDelete.className = 'delete-button'
  
      taskDelete.addEventListener('click', function() {
        // removing the item from the task list array
        taskList[n].saveStatus = 'deleted'
        ////////// need to check position of this element in array after refreshing
  
        console.log(taskList)
        // removing this from the display too
        printTask.remove()
      })
  
      // adding delete button to the p tag
      printTask.appendChild(taskDelete)
  
      // adding the task to the display
      taskDisplay.appendChild(printTask)
    }
  }
  
  // initialising task delete button
  var taskDelete = document.createElement('button')
  
  // creating an array that will be populated with tasks
  var taskList = [];
  
  // accessing the full form to create tasks
  // var taskForm = document.getElementById('task-form');
  
  // article to display tasks
  var taskDisplay = document.getElementById('task-display');
  
  // initialising variables
  var taskDetails, task, taskName, taskDescription, taskDueDate, taskPriorityRating, taskEstimatedTime, taskSaveStatus;
  
  // selecting the submit button for the form
  var taskSubmitButton = document.getElementById('create-task-submit');
  
  // something to populate tasks with on the page
  
  // on submit:
  taskSubmitButton.addEventListener('click', function(event) {
    event.preventDefault()
    taskDetails = document.querySelectorAll('form input');
    // get all of the user input in the input fields
    taskID = taskList.length
    taskName = taskDetails[0].value;
    taskDescription = taskDetails[1].value;
    taskDueDate = taskDetails[2].value;
  
    // checking the radios 
    if (taskDetails[3].checked == true) {
      taskPriorityRating = taskDetails[3].value
    } else if (taskDetails[4].checked == true) {
      taskPriorityRating = taskDetails[4].value
    } else if (taskDetails[5].checked == true) {
      taskPriorityRating = taskDetails[5].value
    }
  
    taskEstimatedTime = taskDetails[6].value;
  
    // checking the radios
    if (taskDetails[7].checked == true) {
      taskCompletionStatus = taskDetails[7].value;
    } else if (taskDetails[8].checked == true) {
      taskCompletionStatus = taskDetails[8].value;
    }
  
    taskSaveStatus = 'saved';
  
    // create a new task using the task class
    task = new Task(taskID, taskName, taskDescription, taskDueDate, taskPriorityRating, taskEstimatedTime, taskCompletionStatus, taskSaveStatus)
  
    // add the task to the task list (repo)
  
    task.printTask(task.addTask());
  
    // print to check
    console.log(taskList)
  })
  
  