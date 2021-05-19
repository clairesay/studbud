// Popup tab activity
const timePopUp = document.getElementById('time')
const musicPopUp = document.getElementById('music')
// var static = true

// window.static = static

timePopUp.setAttribute('state', 'standby')
musicPopUp.setAttribute('state', 'standby')

var popUpIcons = document.querySelectorAll('.pop-up[state=standby] nav img')
var collapseButtons = document.querySelectorAll('.pop-up nav button.collapse')
popUpIcons.forEach(function (icon, index) {
    icon.addEventListener('click', function() {popUpState(index)})
})
collapseButtons.forEach(function (button, index) {
    button.addEventListener('click', function() {popUpState(index)})
})

// alternate states of the pop-up tab
function popUpState(index) {
    var popUp, static;
    if (index == 0) {
        popUp = timePopUp
        // static = timeStatic
    } else if (index == 1) {
        popUp = musicPopUp
        // static = musicStatic
    }
    // console.log(index)
    // console.log(static)
    if (popUp.getAttribute('state') == 'standby') {
        popUp.setAttribute('state', 'active')
    } else if (popUp.getAttribute('state') == 'peek') {
        popUp.setAttribute('state', 'active')
    } else if (popUp.getAttribute('state') == 'active' && popUp.getAttribute('static') == 'true') {
        popUp.setAttribute('state', 'standby')
    } else if (popUp.getAttribute('state') == 'active') {
        popUp.setAttribute('state', 'peek')
    }
}