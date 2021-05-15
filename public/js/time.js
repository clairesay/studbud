// toggling time popup window
const timeToolsOverlay = document.getElementById('time')
const timeSelector = document.getElementById('time-selector')
const dropdown = document.getElementById('dropdown')
var timeMenuToggleOpen = false

function toggleTimeMenu() {
    if (timeMenuToggleOpen == false) {
        timeSelector.classList = 'open'
        timeMenuToggleOpen = true
    } else if (timeMenuToggleOpen == true) {
        timeSelector.classList = 'close'
        timeMenuToggleOpen = false
    }
}
dropdown.addEventListener('click', toggleTimeMenu)

const stopwatch = document.getElementById('stopwatch')
const stopwatchSelector = document.getElementById('stopwatch-select')
const pomodoro = document.getElementById('pomodoro')
const pomodoroSelector = document.getElementById('pomodoro-select')

// timer dropdown selector
stopwatchSelector.addEventListener('click', function () {
    timeSelector.appendChild(pomodoroSelector)
    setTimerType()
})
pomodoroSelector.addEventListener('click', function () {
    timeSelector.appendChild(stopwatchSelector)
    setTimerType()
})

function setTimerType() {
    let currentTimer = timeSelector.querySelector(':first-child')
    if (currentTimer.id == 'stopwatch-select') {
        stopwatch.classList.add('active')
        pomodoro.classList.remove('active')
    } else if (currentTimer.id == 'pomodoro-select') {
        stopwatch.classList.remove('active')
        pomodoro.classList.add('active')
    }
}

setTimerType()

// Popup tab activity
const timePopUp = document.getElementById('time')
const musicPopUp = document.getElementById('music')

timePopUp.setAttribute('state', 'standby')
musicPopUp.setAttribute('state', 'standby')

var popUpIcons = document.querySelectorAll('.pop-up[state=standby] nav img')
var collapseButtons = document.querySelectorAll('.pop-up nav button.collapse')
popUpIcons.forEach(function (icon) {
    icon.addEventListener('click', popUpState)
})
collapseButtons.forEach(function (button) {
    button.addEventListener('click', popUpState)
})

// alternate states of the pop-up tab
function popUpState() {
    if (timePopUp.getAttribute('state') == 'standby') {
        timePopUp.setAttribute('state', 'active')
    } else if (timePopUp.getAttribute('state') == 'peek') {
        timePopUp.setAttribute('state', 'active')
    } else if (timePopUp.getAttribute('state') == 'active' && static == true) {
        timePopUp.setAttribute('state', 'standby')
    } else if (timePopUp.getAttribute('state') == 'active') {
        timePopUp.setAttribute('state', 'peek')
    }
}

// STOPWATCH FUNCTIONALITY
var min = sec = milli = 0,
    minutes = document.querySelector('#stopwatch .minutes'),
    seconds = document.querySelector('#stopwatch .seconds'),
    milliseconds = document.querySelector('#stopwatch .milliseconds');

const stopwatchStart = document.querySelector('#stopwatch button.start-stop')
const stopwatchReset = document.querySelector('#stopwatch button.reset')

var stopwatchOn = false,
    static = true,
    intervals;

// resetting the stopwatch
stopwatchReset.addEventListener('click', function () {
    // set numbers to 0
    milli = sec = min = offset = 0
    minutes.textContent = round(min)
    seconds.textContent = round(sec)
    milliseconds.textContent = round(milli)

    // reset inner text of button
    stopwatchStart.textContent = 'Start'
    // enable button clicking
    stopwatchReset.disabled = false
    stopwatchOn = false
    static = true
    // turn off counting
    clearInterval(intervals)

    // enable dropdown
    dropdown.addEventListener('click', toggleTimeMenu)
})

var start, currentTime, elapsedTime, stringify;
var offset = 0;
// stopwatch start/stop button
stopwatchStart.addEventListener('click', function () {
    static = false;

    // if the stopwatch is on, we want to turn this off
    if (stopwatchOn == true) {
        clearInterval(intervals)
        stopwatchStart.textContent = 'Start'
        stopwatchOn = false
        offset = parseInt(milli) * 10

    // otherwise, if the stopwatch is not on,
    } else if (stopwatchOn == false) {

        start = Date.now()
        incrementUp()
        // increment the time upwards from the time the start button was clicked
        function incrementUp() {
            currentTime = Date.now()
            elapsedTime = currentTime - start + offset
            
            stringify = (elapsedTime).toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })
            milli = stringify[0] + stringify[1]

            if (elapsedTime >= 1000) {
                start += 1000
                sec += 1
            }
            if (sec == 60) {
                sec = 0
                min += 1
            }
        }

        // set the intervals for frequent update of the numbers
        intervals = setInterval(function () {
            minutes.textContent = round(min)
            seconds.textContent = round(sec)
            milliseconds.textContent = round(milli)
            incrementUp()
        }, 10); // update every 10 milliseconds

        // enable the reset button
        stopwatchReset.disabled = false
        // replace text content for relevance
        stopwatchStart.textContent = 'Stop'
        // disable the timer dropdown
        dropdown.removeEventListener('click', toggleTimeMenu)
        stopwatchOn = true
    }
})

// setting two integer digits for all time functions
// making sure there are always 2 digits https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers
function round(value) {
    return (value).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
}

// POMODORO TIMER
var workMin = 25,
    workSec = 0,
    breakMin = 5,
    breakSec = 0,
    workMinutes = document.querySelector('#pomodoro #work .minutes'),
    workSeconds = document.querySelector('#pomodoro #work .seconds'),
    breakMinutes = document.querySelector('#pomodoro #break .minutes'),
    breakSeconds = document.querySelector('#pomodoro #break .seconds');

const workButtons = document.querySelector('#pomodoro #work'),
    breakButtons = document.querySelector('#pomodoro #break'),
    timer = document.querySelector('#pomodoro div#timer'),
    workAdd = document.querySelector('#pomodoro #work button.add'),
    workSubtract = document.querySelector('#pomodoro #work button.subtract'),
    breakAdd = document.querySelector('#pomodoro #break button.add'),
    breakSubtract = document.querySelector('#pomodoro #break button.subtract'),
    pomoStartStop = document.querySelector('#pomodoro button.start-stop');

var pomoMin = workMin,
    pomoSec = workSec,
    pomoMinutes = document.querySelector('#pomodoro #timer .minutes'),
    pomoSeconds = document.querySelector('#pomodoro #timer .seconds');

pomoMinutes.textContent = round(pomoMin)

var pomoIntervals,
    pomoOn = false;

workAdd.addEventListener('click', () => pomoTime('add', 'work'))
workSubtract.addEventListener('click', () => pomoTime('subtract', 'work'))
breakAdd.addEventListener('click', () => pomoTime('add', 'break'))
breakSubtract.addEventListener('click', () => pomoTime('subtract', 'break'))
workButtons.style.display = 'flex'
breakButtons.style.display = 'flex'
timer.style.display = 'none'

var timeline = document.getElementById('timeline')
const loadSpans = document.querySelectorAll('#pomodoro div.length > div'),
    allSpans = document.querySelectorAll('#pomodoro div > div.length'),
    finalLoadSpanContainer = document.querySelector('#pomodoro div#final-load'),
    finalLoadSpan = document.querySelector('#pomodoro div#final-load div'),
    resetPomo = document.getElementById('reset-pomo');

// reset button to return to default 
resetPomo.addEventListener('click', function () {
    pomoMin = 25
    workMin = 25
    breakMin = 5
    workMinutes.textContent = round(25)
    breakMinutes.textContent = round(5)
    pomoLength()
})

//start or stop the pomodoro timer
pomoStartStop.addEventListener('click', function () {
    // reference for pomo intervals 
    //https://www.focusboosterapp.com/blog/common-misconceptions-of-the-pomodoro-technique/#:~:text=The%20average%20and%20suggested%20pomodoro,with%20a%2010%2Dminute%20break.
    // if pomo is on, turn it off
    if (pomoOn == true) {
        // // both timers are inactive
        // static = true;
        // // reset the pomo time
        // pomoMin = workMin
        // pomoSec = workSec
        // pomoMinutes.textContent = round(pomoMin)
        // pomoSeconds.textContent = round(pomoSec)

        // // stop the countup intervals
        // clearInterval(pomoIntervals)
        // // reset the text
        // pomoStartStop.textContent = 'Start'
        // // allow dropdowns
        // dropdown.addEventListener('click', toggleTimeMenu)
        
        // // display/show relevant elements
        // workButtons.style.display = 'flex'
        // breakButtons.style.display = 'flex'
        // timer.style.display = 'none'

        // pomoOn = false

        // // remove animation functions
        // loadSpans.forEach(function (span) {
        //     span.style.animation = ''
        // })
        // finalLoadSpan.style.animation = 'none'
        // sessions = 0
        // reset status
        endPomo()
        phase = 'break'
        
        pomodoroTimer('static')

    } else if (pomoOn == false) {
        // timer is active
        static = false;
        // increment downwards
        function incrementDown() {
            if (pomoMin == 0 && pomoSec == 0) {
                sessions += 1
                pomodoroTimer()
            } else if (pomoSec == 0) {
                pomoMin -= 1
                pomoSec = 59
            } else {
                pomoSec -= 1
            }
        }

        // show/hide relevant elements
        workButtons.style.display = 'none'
        breakButtons.style.display = 'none'
        timer.style.display = 'flex'

        // set intervals and text content
        pomoIntervals = setInterval(function () {
            incrementDown()
            pomoMinutes.textContent = round(pomoMin)
            pomoSeconds.textContent = round(pomoSec)
        }, 1000);

        // change timer status
        pomoStartStop.textContent = 'Stop'
        dropdown.removeEventListener('click', toggleTimeMenu)
        pomoOn = true
        pomodoroTimer()
    }
})

const workSpans = document.querySelectorAll('#pomodoro div > div.length:nth-child(2n + 1)'),
    breakSpans = document.querySelectorAll('#pomodoro div > div.length:nth-child(2n)'),
    pomoStatus = document.getElementById('pomo-status')
var phase = 'work',
    sessions = 0

// increments timer times up and down
function pomoTime(operator, mode) {
    let incrementValue = 5
    if (mode == 'work') {
        // increase
        if (operator == 'add' && workMin < 60) {
            workMin += incrementValue
        // decrease
        } else if (operator == 'subtract' && workMin > 5) {
            workMin -= incrementValue
        }
    } else if (mode == 'break') {
        // increase
        if (operator == 'add' && breakMin < 20) {
            breakMin += incrementValue
        // decrease
        } else if (operator == 'subtract' && breakMin > 5) {
            breakMin -= incrementValue
        }
    }
    // set text content
    pomoMin = workMin
    pomoMinutes.textContent = round(pomoMin)
    workMinutes.textContent = round(workMin)
    breakMinutes.textContent = round(breakMin)
    pomoLength()
}


// visualising the work and break times
function pomoLength() {
    // calculating distance
    let total = workMin * 3 + breakMin * 2,
        timelineLength = 232,
        // timelineLength = timeline.getBoundingClientRect(width) - 4 * 4,
        workLength = workMin / total * timelineLength,
        breakLength = breakMin / total * timelineLength;

    // apply relevant lengths
    workSpans.forEach(function (span) {
        span.style.width = workLength + 'px';
    })

    breakSpans.forEach(function (span) {
        span.style.width = breakLength + 'px';
    })
}

pomoLength()
// setting text content
workMinutes.textContent = round(workMin)
breakMinutes.textContent = round(breakMin)

function pomodoroTimer(mode) {
    // update 'status' for user when pomo time changes
    pomoStatus.textContent = phase;
    // check sessions
    if (sessions < 5) {
        // alternate between sessions
        if (phase == 'work') {
            pomoMin = workMin
            pomoSec = workSec
            phase = 'break'
        } else if (phase == 'break') {
            pomoMin = breakMin
            pomoSec = breakSec
            phase = 'work'
        }

        // calculate the full time taken for each pomo phase
        let fullTime;
        if (phase == 'work') {
            fullTime = workSec + workMin * 60

        } else if (phase == 'break') {
            fullTime = breakSec + breakMin * 60
        }

        // cancel the animations if timer is off
        if (mode == 'static') {
            loadSpans[sessions].style.animation = 'none'
        } else {
            loadSpans[sessions].style.animation = 'load-spans ' + fullTime + 's ' + 'linear forwards'
        }

        // show/hide relevant elements
        finalLoadSpanContainer.style.display = 'none'
        timeline.style.display = 'flex'
    } else if (sessions == 5) {
        // setting duration of final break
        pomoMin = 30
        pomoSec = 0
        phase = 'finalbreak'
        // enable animations
        let fullTime = pomoMin * 60 + pomoSec
        finalLoadSpanContainer.style.display = 'flex'
        timeline.style.display = 'none'
        finalLoadSpan.style.animation = 'load-spans ' + fullTime + 's ' + 'linear forwards'
        
    } else {
        // otherwise, the pomodoro has ended - reset everything
        // static = true;
        finalLoadSpanContainer.style.display = 'none'
        timeline.style.display = 'flex'
        // pomoMin = workMin
        // pomoSec = workSec
        // pomoMinutes.textContent = round(pomoMin)
        // pomoSeconds.textContent = round(pomoSec)
        
        // clearInterval(pomoIntervals)
        // pomoStartStop.textContent = 'Start'
        // dropdown.addEventListener('click', toggleTimeMenu)

        // workButtons.style.display = 'flex'
        // breakButtons.style.display = 'flex'
        // timer.style.display = 'none'

        // pomoOn = false
        // loadSpans.forEach(function (span) {
        //     span.style.animation = ''
        // })

        // finalLoadSpan.style.animation = 'none'
        
        // sessions = 0
        endPomo()
        phase = 'work'
    }
}

function endPomo() {
// both timers are inactive
static = true;
// reset the pomo time
pomoMin = workMin
pomoSec = workSec
pomoMinutes.textContent = round(pomoMin)
pomoSeconds.textContent = round(pomoSec)

// stop the countup intervals
clearInterval(pomoIntervals)
// reset the text
pomoStartStop.textContent = 'Start'
// allow dropdowns
dropdown.addEventListener('click', toggleTimeMenu)

// display/show relevant elements
workButtons.style.display = 'flex'
breakButtons.style.display = 'flex'
timer.style.display = 'none'

pomoOn = false

// remove animation functions
loadSpans.forEach(function (span) {
    span.style.animation = ''
})
finalLoadSpan.style.animation = 'none'
sessions = 0
}

