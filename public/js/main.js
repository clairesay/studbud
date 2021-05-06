var deviceSize
////////// MEDIA QUERIES https://www.w3schools.com/howto/howto_js_media_queries.asp ///////////////
function myFunction(x) {
    if (x.matches) { // If media query matches
    //   document.body.style.backgroundColor = "yellow";
      deviceSize = 'mobile'
    } else {
    //   document.body.style.backgroundColor = "pink";
      deviceSize = 'desktop'
    }
}

var x = window.matchMedia("(max-width: 700px)")
myFunction(x) // Call listener function at run time
x.addEventListener('change', myFunction) // Attach listener function on state changes


const main = document.getElementsByTagName('main')[0]
const tasksTab = document.getElementById('tasks-tab')
const contentTab = document.getElementById('content-tab')

const tasks = document.getElementById('tasks')
const content = document.getElementById('content')

const taskCreateButtonsContainer = document.getElementById('task-buttons')
const contentCreateButtonsContainer = document.getElementById('content-buttons')

const taskCreateButtons = document.querySelectorAll('#task-buttons button.create')
const contentCreateButtons = document.querySelectorAll('#content-buttons button.create')

// setting which one is option first
displayMain('tasks')

tasksTab.addEventListener('click', function() {displayMain('tasks')})
// body.addEventListener('click', function() {displayMain('tasks')})
contentTab.addEventListener('click', function() {displayMain('content')})

function displayMain(option) {
    if (option == 'tasks') {
        main.appendChild(document.getElementById('tasks'))
        tasksTab.classList.add('active')
        contentTab.classList.remove('active')
    
        taskCreateButtonsContainer.style.display = 'flex'
        contentCreateButtonsContainer.style.display = 'none'
    } else if (option == 'content') {
        main.appendChild(document.getElementById('content'))
        tasksTab.classList.remove('active')
        contentTab.classList.add('active')
    
        taskCreateButtonsContainer.style.display = 'none'
        contentCreateButtonsContainer.style.display = 'flex'
    }
}

const contentExpandButton = document.querySelectorAll('#content-buttons button.icon')[0]
const taskExpandButton = document.querySelectorAll('#task-buttons button.icon')[0]

const newContent = document.getElementById('new-content');
const newGroup = document.getElementById('new-group');
const newTask = document.getElementById('new-task');
const newColumn = document.getElementById('new-column');

const buttonBackground = document.getElementById('button-background')

var contentButtonVisible = false;
var taskButtonVisible = false;
contentExpandButton.addEventListener('click', contentButtonVisibility)

function contentButtonVisibility() {
    if (contentButtonVisible == false) {
        newContent.classList.add('active')
        newGroup.classList.add('active')
        contentButtonVisible = true;
        if (deviceSize == 'mobile') {
            buttonBackground.style.display = 'flex'
        }
    } else if (contentButtonVisible == true) {
        newContent.classList.remove('active')
        newGroup.classList.remove('active')
        contentButtonVisible = false;
        if (deviceSize == 'mobile') {
            buttonBackground.style.display = 'none'
        }
    }
}
taskExpandButton.addEventListener('click', taskButtonVisibility) 
newTask.addEventListener('click', taskButtonVisibility) 
newColumn.addEventListener('click', taskButtonVisibility) 
function taskButtonVisibility() {
    if (taskButtonVisible == false) {
        newTask.classList.add('active')
        newColumn.classList.add('active')
        taskButtonVisible = true;
        if (deviceSize == 'mobile') {
            buttonBackground.style.display = 'flex'
        }
    } else if (taskButtonVisible == true) {
        newTask.classList.remove('active')
        newColumn.classList.remove('active')
        taskButtonVisible = false;
        if (deviceSize == 'mobile') {
            buttonBackground.style.display = 'none'
        }
    }
}
