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