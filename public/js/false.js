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

  // console.log('taskstatusis:' + taskStatus)
  // for (let i = 0; i < statuses.length; i ++) {
  //   if (statuses[i].selected == 'selected') {
  //     taskStatus = statuses[i].value
  //   }
  // }

    // checking the radios
  // if (taskDetails[7].checked == true) {
  //   taskCompletionStatus = taskDetails[7].value;
  // } else if (taskDetails[8].checked == true) {
  //   taskCompletionStatus = taskDetails[8].value;
  // }


//   /////////// DOUBLE BUTTON TASKS

// const taskSubmitButton = document.getElementById('create-task-submit');
// const taskSaveButton = document.getElementById('edit-task-save');
// taskSaveButton.addEventListener('click', function (event) {
//     event.preventDefault()
//     // initialising variables


//     let taskID = parseInt(taskSaveButton.value)
//     for (let i = 0; i < taskList.length; i++) {
//         var oldTask = taskList[i]
//         if (oldTask.id == taskID) {
//             taskList.splice(taskList.indexOf(oldTask), 1)
//             let oldCard = document.getElementById('t-' + taskID)
//             oldCard.remove();
//             taskSaveButton.value = ''
//         }
//     }

//     // initialising variables
//     let taskDetails = createTaskForm.querySelectorAll('form input');
//     // get all of the user input in the input fields
//     let task = populateTaskDetails(taskDetails)

//     // create a new task using the task class
//     let newTask = new Task(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate, taskList)
//     // append to taskList and create new card with task
//     newTask.createCard(newTask.addTask());

//     toggleTaskForm()
//     reupdate()
// })

// // on submit:
// taskSubmitButton.addEventListener('click', function (event) {
//     event.preventDefault()

//     // initialising variables
//     let taskDetails = createTaskForm.querySelectorAll('form input');
//     // get all of the user input in the input fields
//     let task = populateTaskDetails(taskDetails)

//     // since it's a new task, generate a new ID
//     let taskID = Date.now()

//     // create a new task using the task class
//     let newTask = new Task(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate, taskList)
//     // append to taskList and create new card with task
//     newTask.createCard(newTask.addTask());


//     toggleTaskForm()
//     reupdate()
// })

// ////////////////////////////
// // STACK OVERFLOW https://stackoverflow.com/questions/4880381/check-whether-html-element-has-scrollbars
// // RESIZING CARD WIDTH BASED ON OVERFLOW PROPERTIES TO ACCOUNT FOR SCROLLBAR
// function cardWidth() {

//     let cards = document.querySelectorAll('.card');

//     cards.forEach(function(element) {
//         let cardContainer = element.parentElement
//         let hasVerticalScrollbar = cardContainer.scrollHeight > cardContainer.clientHeight;

//         if (hasVerticalScrollbar) {
//             element.style.width = 'auto';
//             element.style.maxWidth = '90%';
//         } else {
//             element.style.width = 'auto';
//             cardContainer.style.paddingRight = '36px';
//         }
//     })
// }