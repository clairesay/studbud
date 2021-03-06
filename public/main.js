
////////// MEDIA QUERIES https://www.w3schools.com/howto/howto_js_media_queries.asp ///////////////

// test for tablet
function mediaQueryTablet(query) {
    if (query.matches) { // If media query matches
        deviceSize = 'tablet'
    } else {
        deviceSize = 'desktop'
    }
}
var tablet = window.matchMedia("(max-width: 700px)")
// Call listener function at run time
mediaQueryTablet(tablet)
// Attach listener function on state changes
tablet.addEventListener('change', mediaQueryTablet)

// test for mobile
function mediaQueryMobile(query) {
    if (query.matches) { // If media query matches
        deviceSize = 'mobile'
    } 
}

var mobile = window.matchMedia("(max-width: 500px)")
mediaQueryMobile(mobile) // Call listener function at run time
mobile.addEventListener('change', mediaQueryMobile)

////////////// SELECTING MAIN TAB ///////////////////

const main = document.getElementsByTagName('main')[0]
const tasksTab = document.getElementById('tasks-tab')
const contentTab = document.getElementById('content-tab')

const taskCreateButtonsContainer = document.getElementById('task-buttons')
const contentCreateButtonsContainer = document.getElementById('content-buttons')

const taskCreateButtons = document.querySelectorAll('#task-buttons button.create')
const contentCreateButtons = document.querySelectorAll('#content-buttons button.create')

const tasks = document.getElementById('tasks')
const content = document.getElementById('content')

// setting tasks to show when the page is first loaded
displayMain('tasks')

// change tabs according to the user's selection
tasksTab.addEventListener('click', function () { displayMain('tasks') })
contentTab.addEventListener('click', function () { displayMain('content') })

// display the corresponding tab
function displayMain(option) {
    if (option == 'tasks') {
        main.appendChild(document.getElementById('tasks'))
        tasksTab.classList.add('active')
        contentTab.classList.remove('active')
        tasks.style.visibility = 'visible'
        content.style.visibility = 'hidden'
        taskCreateButtonsContainer.style.display = 'flex'
        contentCreateButtonsContainer.style.display = 'none'
    } else if (option == 'content') {
        main.appendChild(document.getElementById('content'))
        tasksTab.classList.remove('active')
        contentTab.classList.add('active')
        tasks.style.visibility = 'hidden'
        content.style.visibility = 'visible'
        taskCreateButtonsContainer.style.display = 'none'
        contentCreateButtonsContainer.style.display = 'flex'
    }
}

////////////// SHOWING/HIDING THE CTA's IN THE TOP RIGHT HAND CORNER

const contentExpandButton = document.querySelector('#content-buttons button.icon') // this is the (+) button on mobile
const newContent = document.getElementById('new-content');
const newGroup = document.getElementById('new-group');

const taskExpandButton = document.querySelector('#task-buttons button.icon') // this is the (+) button on mobile
const newTask = document.getElementById('new-task');
const newColumn = document.getElementById('new-column');

const buttonBackground = document.getElementById('button-background')

var contentButtonVisible = false;
var taskButtonVisible = false;

// listen for clicking from the content buttons
contentExpandButton.addEventListener('click', contentButtonVisibility)
newContent.addEventListener('click', contentButtonVisibility)
newGroup.addEventListener('click', contentButtonVisibility)

// if on mobile, the buttons are open with the overlay, listen for any click to hide those buttons
buttonBackground.addEventListener('click', function () {
    if (contentButtonVisible == true) {
        contentButtonVisibility()
    } else if (taskButtonVisible == true) {
        taskButtonVisibility()
    }
})

// toggles between visibility of content CTA's
function contentButtonVisibility() {
    if (contentButtonVisible == false) {
        newContent.classList.add('active')
        newGroup.classList.add('active')
        contentButtonVisible = true;
        if (deviceSize != 'desktop') {
            buttonBackground.style.display = 'flex'
        }
    } else if (contentButtonVisible == true) {
        newContent.classList.remove('active')
        newGroup.classList.remove('active')
        contentButtonVisible = false;
        if (deviceSize != 'desktop') {
            buttonBackground.style.display = 'none'
        }
    }
}

// same premise for the tasks
taskExpandButton.addEventListener('click', taskButtonVisibility)
newTask.addEventListener('click', taskButtonVisibility)
newColumn.addEventListener('click', taskButtonVisibility)

function taskButtonVisibility() {
    if (taskButtonVisible == false) {
        newTask.classList.add('active')
        newColumn.classList.add('active')
        taskButtonVisible = true;
        if (deviceSize != 'desktop') {
            buttonBackground.style.display = 'flex'
        }
    } else if (taskButtonVisible == true) {
        newTask.classList.remove('active')
        newColumn.classList.remove('active')
        taskButtonVisible = false;
        if (deviceSize != 'desktop') {
            buttonBackground.style.display = 'none'
        }
    }
}

// TOGGLING BETWEEN LIST AND KANBAN VIEW FOR THE TASK LIST
const listIcon = document.querySelector('.list-icon')
const gridIcon = document.querySelector('.grid-icon')
listIcon.style.display = 'none';
const toggleTaskView = document.querySelector('#tasks-tab a')

var listView = false;

// ON TOGGLE BUTTON CLICK
toggleTaskView.addEventListener('click', function () {
    // only allow toggling if the tasks tab is active 
    if (tasksTab.classList.contains('active')) {
        // if currently in list view, switch to grid view, and vice versa
        if (listView) {
            listIcon.style.display = 'none';
            gridIcon.style.display = 'inline';

            tasks.classList.add('grid')
            tasks.classList.remove('list')

            listView = false

        } else {
            listIcon.style.display = 'inline';
            gridIcon.style.display = 'none';

            tasks.classList.remove('grid')
            tasks.classList.add('list')

            listView = true
        }
    }
})
