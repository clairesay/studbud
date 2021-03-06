// POPUP TAB ACTIVITY
const timePopUp = document.getElementById('time')
var peekTime = document.querySelector('#time nav h1');
var dropdown = document.querySelector('#dropdown')
var dropdownOption = dropdown.querySelector('#time-selector h3')

const musicPopUp = document.getElementById('music')
var nav = musicPopUp.querySelector('nav')
var currentControls = musicPopUp.querySelector('#current-controls')
var currentContainer = musicPopUp.querySelector('#current')

timePopUp.setAttribute('state', 'standby')
musicPopUp.setAttribute('state', 'standby')

// collapse button for each of the pop-up windows
var collapseButtons = document.querySelectorAll('.pop-up nav button.collapse')
collapseButtons.forEach(function (button, index) {
    // on click, we open or close the corresponding popup window
    button.addEventListener('click', function(event) {
        event.stopPropagation()
        popUpState(index)
    })
})

// if we click on the pop-up window itself, and its pcurrent state is either peek or standby, open it to active mode.
timePopUp.addEventListener('click', function() {
    if (timePopUp.getAttribute('state') == 'peek' || timePopUp.getAttribute('state') == 'standby') {
        popUpState(0)
    }
})
musicPopUp.addEventListener('click', function() {
    if (musicPopUp.getAttribute('state') == 'peek' || musicPopUp.getAttribute('state') == 'standby') {
        popUpState(1)
    }
})

// alternate states of the pop-up tab
function popUpState(index) {
    var popUp, mode;
    if (index == 0) {
        popUp = timePopUp
        mode = 'time'
    } else if (index == 1) {
        popUp = musicPopUp
        mode = 'music'
    }

    // setting responsive alternates in case device size is smaller
    responsivePopUp(popUp)

    // if/else tree to determine the status of the current pop-up being activated
    // active --> the pop-up tab is open
    // peek --> users can see a little bit of the timer/music player, but not the whole thing
    // standby --> the pop-up is reduced to an icon
    if (popUp.getAttribute('state') == 'standby') {
        popUp.setAttribute('state', 'active')
        // checks for peek modes and alters styles in turn.
        peek(false, mode)
    } else if (popUp.getAttribute('state') == 'peek') {
        popUp.setAttribute('state', 'active')
        peek(false, mode)
    } else if (popUp.getAttribute('state') == 'active' && popUp.getAttribute('static') == 'true') {
        popUp.setAttribute('state', 'standby')
        peek(false, mode)
    } else if (popUp.getAttribute('state') == 'active') {
        popUp.setAttribute('state', 'peek')
        peek(true, mode)
        if (popUp == timePopUp) {
            // hide the dropdown if it the user is in peek mode, and the selected timer is a pomodoro timer
            // or if the device is a mobile (in that case there's no space for it)
            if (dropdownOption.getAttribute('id') == 'pomodoro-select' || deviceSize == 'mobile') {
                dropdown.style.display = 'none'
            // otherwise, in stopwatch mode and if the device is bigger than mobile, still show the dropdown
            } else {
                dropdown.style.display = 'flex'
            }
        }
    }
    // positioning the time pop-up from the right hand side
    popUpPositioning()
}

// on mobile/smaller device sizes, the other popUp is forced to be in 'standby' mode to ensure there is space on the screen
function responsivePopUp(popUp) {
    if (deviceSize != 'desktop') {
        if (popUp == timePopUp) {
            musicPopUp.setAttribute('state', 'standby')
        } else {
            timePopUp.setAttribute('state', 'standby')
        }
    }
}

// make the appropriate alterations to the pop-up windows
function peek(bool, mode) {
    if (mode == 'time') {
        dropdown.style.display = 'flex'
        if (bool == true) {
            peekTime.style.display = 'flex'
            dropdown.style.left = 'auto'
            dropdown.style.right = '0px'
            dropdown.querySelector('h3').style.color = '#909090'
        } else {
            peekTime.style.display = 'none'
            dropdown.style.left = '60px'
            dropdown.style.right = 'auto'
            dropdown.querySelector('h3').style.color = '#303030'
        }
    } else if (mode == 'music') {
        if (bool == true) {
            nav.appendChild(currentControls)
        } else {
            currentContainer.appendChild(currentControls)
        }
    }
}

// this determines the positioning of the time pop-up 
function popUpPositioning() {
    // if the music pop-up is on standby, calculate how far from the right the time pop-up will be 
    if (musicPopUp.getAttribute('state') != 'standby') {
        if (deviceSize == 'mobile') {
            timePopUp.style.right = '254px';
        } else {
            timePopUp.style.right = '354px';
        }
    // if the time pop-up is active and on mobile, it should open up to full device width and thus position right 0
    } else if (timePopUp.getAttribute('state') == 'active' && deviceSize == 'mobile') {
        timePopUp.style.right = '0';
    // otherwise, we go with default position
    } else {
        timePopUp.style.right = '110px';
    }
}