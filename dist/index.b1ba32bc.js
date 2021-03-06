// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1K8Em":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "22342ba94697b643da94d680b1ba32bc";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] ???? Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"Yzrvm":[function(require,module,exports) {
// toggling time popup window
const timeToolsOverlay = document.getElementById('time'),
    timeSelector = document.getElementById('time-selector'),
    dropdown = document.getElementById('dropdown');

var peekStatusDisplay = document.querySelector('#time nav #peek-status'),
    peekTimeDisplay = document.querySelector('#time nav h1'),
    peekMinutes = peekTimeDisplay.querySelector('span.min'),
    peekSeconds = peekTimeDisplay.querySelector('span.sec');

var timeMenuToggleOpen = false

// toggling whether the dropdown menu isopen or closed
function toggleTimeMenu() {
    if (timeMenuToggleOpen == false) {
        timeSelector.classList = 'open'
        timeMenuToggleOpen = true
    } else if (timeMenuToggleOpen == true) {
        timeSelector.classList = 'close'
        timeMenuToggleOpen = false
    }
}
// listening for the dropdown selector
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

// set the timer type to stopwatch or pomodoro, pending user selection in dropdown
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

//////////////////////////////////////////////////////////////////////////////
///////////////////////////// COMMON FUNCTIONALITY ///////////////////////////
//////////////////////////////////////////////////////////////////////////////

// setting two integer digits for all time functions
// making sure there are always 2 digits https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers
function round(value) {
    return (value).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////// STOPWATCH FUNCTIONALITY /////////////////////////
//////////////////////////////////////////////////////////////////////////////

var min = sec = milli = 0,
    minutes = document.querySelector('#stopwatch .minutes'),
    seconds = document.querySelector('#stopwatch .seconds'),
    milliseconds = document.querySelector('#stopwatch .milliseconds');

const stopwatchStart = document.querySelector('#stopwatch button.start-stop')
const stopwatchReset = document.querySelector('#stopwatch button.reset')

var stopwatchOn = false,
    intervals;

// resetting the stopwatch
stopwatchReset.addEventListener('click', function () {
    // set numbers to 0
    milli = sec = min = offset = 0
    minutes.textContent = round(min)
    seconds.textContent = round(sec)
    milliseconds.textContent = round(milli)
    peekMinutes.textContent = round(min)
    peekSeconds.textContent = round(sec)

    // reset inner text of button
    stopwatchStart.textContent = 'Start'
    stopwatchStart.classList.remove('danger')
    stopwatchStart.classList.add('primary')

    // enable reset button clicking
    stopwatchReset.disabled = false
    stopwatchOn = false
    timeToolsOverlay.setAttribute('static', 'true')

    // turn off counting
    clearInterval(intervals)

    // enable dropdown
    dropdown.addEventListener('click', toggleTimeMenu)
})

var start, currentTime, elapsedTime, stringify;
var offset = 0;

// stopwatch start/stop button
stopwatchStart.addEventListener('click', function () {
    timeToolsOverlay.setAttribute('static', 'false')

    // if the stopwatch is on, we want to turn it off
    if (stopwatchOn == true) {
        clearInterval(intervals)
        stopwatchStart.textContent = 'Start'
        stopwatchStart.classList.remove('danger')
        stopwatchStart.classList.add('primary')
        stopwatchOn = false
        offset = parseInt(milli) * 10

    // otherwise, if the stopwatch is not on,
    } else if (stopwatchOn == false) {

        start = Date.now()
        incrementUp()
        // increment the time upwards from the time the start button was clicked
        // learnt from https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
        function incrementUp() {
            currentTime = Date.now()
            elapsedTime = currentTime - start + offset
            
            // formatting the elapsed time
            stringify = (elapsedTime).toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })
            milli = stringify[0] + stringify[1]

            // incrementing seconds
            if (elapsedTime >= 1000) {
                start += 1000
                sec += 1
            }
            // incrementing minutes
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
            peekMinutes.textContent = round(min)
            peekSeconds.textContent = round(sec)
            incrementUp()
        }, 10); // update every 10 milliseconds

        // enable the reset button
        stopwatchReset.disabled = false

        // replace text content for relevance and restyle button
        stopwatchStart.textContent = 'Stop'
        stopwatchStart.classList.remove('primary')
        stopwatchStart.classList.add('danger')

        // disable the timer dropdown
        dropdown.removeEventListener('click', toggleTimeMenu)
        stopwatchOn = true
    }
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////// POMODORO FUNCTIONALITY //////////////////////////
//////////////////////////////////////////////////////////////////////////////
var workMin = 25,
    workSec = 0,
    breakMin = 5,
    breakSec = 0,
    workMinutes = document.querySelector('#pomodoro #work .minutes'),
    workSeconds = document.querySelector('#pomodoro #work .seconds'),
    breakMinutes = document.querySelector('#pomodoro #break .minutes'),
    breakSeconds = document.querySelector('#pomodoro #break .seconds');

const pomoAlarm = document.getElementById('alarm-sound')

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

//es6 shorthand for event listeners https://josephcardillo.medium.com/arrow-functions-and-this-in-es6-4f1d350a85cf
workAdd.addEventListener('click', () => pomoTime('add', 'work'))
workSubtract.addEventListener('click', () => pomoTime('subtract', 'work'))
breakAdd.addEventListener('click', () => pomoTime('add', 'break'))
breakSubtract.addEventListener('click', () => pomoTime('subtract', 'break'))
workButtons.style.display = 'flex'
breakButtons.style.display = 'flex'
timer.style.display = 'none'

// timeline is the visual representation of work and break times in a pomodoro timer
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
        // recall ending sequence
        endPomo()
        phase = 'break'
        pomodoroTimer('static')

    } else if (pomoOn == false) {
        // timer is active
        timeToolsOverlay.setAttribute('static', 'false')        
        // increment downwards (uses similar functionality to stopwatch above^^)
        function incrementDown() {
            if (pomoMin == 0 && pomoSec == 0) {
                sessions += 1
                pomodoroTimer()
                pomoAlarm.play()
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
            peekMinutes.textContent = round(pomoMin)
            peekSeconds.textContent = round(pomoSec)
        }, 1000);

        // change timer status
        pomoStartStop.textContent = 'Stop'
        pomoStartStop.classList.remove('primary')
        pomoStartStop.classList.add('danger')
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

// this sets new phases of the timer if a phase ends.
function pomodoroTimer(mode) {
    // update 'status' for user when pomo time changes
    pomoStatus.textContent = phase;
    peekStatusDisplay.textContent = phase
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
            fullTime = breakSec + breakMin * 60

        } else if (phase == 'break') {
            fullTime = workSec + workMin * 60
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
        pomoAlarm.play()
        // otherwise, the pomodoro has ended - reset everything
        finalLoadSpanContainer.style.display = 'none'
        timeline.style.display = 'flex'
        endPomo()
        phase = 'work'
    }
}

function endPomo() {
// both timers are inactive
timeToolsOverlay.setAttribute('static', 'true')

// reset the pomo time
pomoMin = workMin
pomoSec = workSec
pomoMinutes.textContent = round(pomoMin)
pomoSeconds.textContent = round(pomoSec)
peekMinutes.textContent = round(pomoMin)
peekSeconds.textContent = round(pomoSec)

// stop the countup intervals
clearInterval(pomoIntervals)
// reset the text
pomoStartStop.textContent = 'Start'
pomoStartStop.classList.remove('danger')
pomoStartStop.classList.add('primary')
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


},{}]},["1K8Em","Yzrvm"], "Yzrvm", "parcelRequirec526")

//# sourceMappingURL=index.b1ba32bc.js.map
