// Popup tab activity
const timePopUp = document.getElementById('time')
const musicPopUp = document.getElementById('music')
var peekTime = document.querySelector('#time nav h1');
var dropdown = document.querySelector('#dropdown')

// window.static = static

timePopUp.setAttribute('state', 'standby')
musicPopUp.setAttribute('state', 'standby')

var popUpIcons = document.querySelectorAll('.pop-up[state=standby] nav img')
var collapseButtons = document.querySelectorAll('.pop-up nav button.collapse')
popUpIcons.forEach(function (icon, index) {
    icon.addEventListener('click', function(event) {
        event.stopPropagation()
        popUpState(index)
    })
})
collapseButtons.forEach(function (button, index) {
    button.addEventListener('click', function(event) {
        event.stopPropagation()
        popUpState(index)
    })
})

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
    var popUp, static;
    if (index == 0) {
        popUp = timePopUp
    } else if (index == 1) {
        popUp = musicPopUp
    }
    if (popUp.getAttribute('state') == 'standby') {
        popUp.setAttribute('state', 'active')
        if (popUp == timePopUp) {
            timePeek(false)
        }
    } else if (popUp.getAttribute('state') == 'peek') {
        popUp.setAttribute('state', 'active')
        if (popUp == timePopUp) {
            timePeek(false)
        }
    } else if (popUp.getAttribute('state') == 'active' && popUp.getAttribute('static') == 'true') {
        popUp.setAttribute('state', 'standby')
        if (popUp == timePopUp) {
            timePeek(false)
        }
    } else if (popUp.getAttribute('state') == 'active') {
        popUp.setAttribute('state', 'peek')
        if (popUp == timePopUp) {
            timePeek(true)
            let dropdownOption = dropdown.querySelector('#time-selector h3')
            if (dropdownOption.getAttribute('id') == 'pomodoro-select') {
                dropdown.style.display = 'none'
            } else {
                dropdown.style.display = 'flex'
            }
        }
    }

    if (musicPopUp.getAttribute('state') == 'active' || musicPopUp.getAttribute('state') == 'peek' ) {
        timePopUp.style.right = '336px';
    } else {
        timePopUp.style.right = '92px';
    }
}

function timePeek(bool) {
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

}