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
})({"6c6yg":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "631208e8e08d7e4a79a63af689a9e78d";
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
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
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
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
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
          🚨 ${diagnostic.message}
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

},{}],"51IO2":[function(require,module,exports) {
const newTask = document.getElementById('new-task');
var editTask = document.querySelectorAll('.card');
const createTaskForm = document.getElementById('create-task-form')
function updateColumnNames() {
  var columnNames = document.querySelectorAll('.column-name')
  var statuses = createTaskForm.querySelector('select[name=status]');
  statuses.innerHTML = ''
  columnNames.forEach(function(object) {
    var newOption = document.createElement('option')
    newOption.textContent = object.value
    newOption.value = object.value
    statuses.appendChild(newOption)
  })
}
updateColumnNames()

// STACK OVERFLOW https://stackoverflow.com/questions/4880381/check-whether-html-element-has-scrollbars

// RESIZING CARD WIDTH BASED ON OVERFLOW PROPERTIES TO ACCOUNT FOR SCROLLBAR
function cardWidth() {
  editTask.forEach(function(element) {
    var cardContainer = element.parentElement
    var hasVerticalScrollbar = cardContainer.scrollHeight > cardContainer.clientHeight;
    if (hasVerticalScrollbar) {
      element.style.width = 'auto';
      element.style.maxWidth = '90%'; 
    } else {
      element.style.width = 'auto';
      cardContainer.style.paddingRight = '36px';
    }
  })
}

// CREATE A NEW TASK

var overlayToggle = false;
newTask.addEventListener('click', openTaskForm)
function openTaskForm(type) {
  console.log('task-form-opened')
    if (type == 'update') {
      createTaskForm.querySelector('h1').textContent = 'Edit an existing task'
      createTaskForm.classList.add('update')

    } else {
      createTaskForm.querySelector('h1').textContent = 'Create a new task'
      createTaskForm.classList.remove('update')
    }
    if (overlayToggle == false) {
      // check if its an update form if so, reword, and show corresponding buttons :)
      createTaskForm.classList.add('active')
      overlayToggle = true;
      // reupdate()
    } else if (overlayToggle == true) {
      // createTaskForm.classList.remove('update')
      createTaskForm.classList.remove('active')
      createTaskForm.reset()
      overlayToggle = false;
      // reupdate()
    }
}

function reupdate() {
  console.log('reupdate')
  var card = document.querySelectorAll('.edit')
 card.forEach(function(object, index) {
     object.addEventListener('click', function() {
      console.log('click')
      autoFill(object)
      //  if (overlayToggle == false) {
      //    createTaskForm.classList.add('active')
         
      //    overlayToggle = true;
      //  } else if (overlayToggle == true) {
      //    createTaskForm.classList.remove('active')
      //    overlayToggle = false;
      //  }
     })
 })
 }
function autoFill(object) {
  console.log('autofill')
  var objectId = object.parentElement.id;
  objectId = objectId.replace('t-', '')

  for (let i = 0; i < taskList.length; i ++) {
    var thisTask = taskList[i]
    if (thisTask.id == objectId) {
      var taskDetails = createTaskForm.querySelectorAll('form input');
     
      // taskName
      taskDetails[0].value = thisTask.name
      // taskDescription
      taskDetails[1].value = thisTask.description
      // taskSubject 
      taskDetails[2].value = thisTask.subject
      //status SELECT THE STATUS

      var statuses = createTaskForm.querySelector('select[name=status]');
      // statuses.value = thisTask.status
      // console.log(object.parentElement.parentElement.parentElement.query)
      statuses.value = object.parentElement.parentElement.parentElement.querySelector('div.title input.column-name').value
      // 3 is low
      // 4 is mid
      // 5 is high
      if (thisTask.priorityRating == 'Low') {
        taskDetails[3].checked = true
      } else if (thisTask.priorityRating == 'Mid') {
        taskDetails[4].checked = true
      } else if (thisTask.priorityRating == 'High') {
        taskDetails[5].checked = true
      }
      // name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, saveStatus
      // taskEstimatedTimeHr
      taskDetails[6].value = thisTask.estimatedTimeHr
      // taskEstimatedTimeMin
      taskDetails[7].value = thisTask.estimatedTimeMin
      // taskDueDate
      taskDetails[8].value = thisTask.dueDate
      taskSaveButton.value = objectId
      openTaskForm('update')

    }
  }
}

// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
    // this is what it's made of
    constructor(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, saveStatus) {
    // constructor(id, name, description, dueDate, priorityRating, estimatedTime, completionStatus, saveStatus) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.subject = subject;
      this.status = status;
      this.priorityRating = priorityRating;
      this.estimatedTimeHr = estimatedTimeHr;
      this.estimatedTimeMin = estimatedTimeMin;
      this.dueDate = dueDate;

      this.saveStatus = saveStatus;
    }
  
    // this adds tasks to the array taskList
    addTask() {
      taskList.push(this);
      // returns its index
      // return taskList.indexOf(this)
      return this.id
    }

    updateTask(id) {
      var myObject = taskList.filter(function(element) {
        return element.id == id;
      })
    }
  
    createCard(n) {
      var card = document.createElement('article');
      var subjectTag = document.createElement('span'),
          title = document.createElement('h3'),
          description = document.createElement('p'),
          timeDetails = document.createElement('div'),
              dueDate = document.createElement('h4'),
              timeTag = document.createElement('span'),
          
          editIcon = document.createElement('a')
          editIcon.classList.add('edit') 
          editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`
      card.classList.add('card')
      card.setAttribute('id', 't-'+ n)
      subjectTag.classList.add('tag')
      subjectTag.classList.add('subject')
      timeDetails.classList.add('time-details')
      timeTag.classList.add('time')
      timeTag.classList.add('tag')
      title.textContent = this.name;
      description.textContent = this.description;
      subjectTag.textContent = this.subject;
      dueDate.textContent = this.dueDate;
      timeTag.textContent = this.estimatedTimeHr + this.estimatedTimeMin;

      // appending time details to time div
      timeDetails.appendChild(dueDate)
      timeDetails.appendChild(timeTag)

      // appending everything to whole div
      card.appendChild(subjectTag)
      card.appendChild(title)
      card.appendChild(description)
      card.appendChild(editIcon)
      card.appendChild(timeDetails)

      // appending card to column

      var columnNames = document.querySelectorAll('.column-name')
      var cardContainers = document.querySelectorAll('.cards')
      var currentStatus = this.status
      columnNames.forEach(function setColumn(object, index) {
        if (object.value == currentStatus) {
          cardContainers[index].appendChild(card)
        }
      })
      // if (this.status == 'ready') {
      //   cardContainer[0].appendChild(card)
      // } else if (this.status == 'in-progress') {
      //   cardContainer[1].appendChild(card)
      // } else if (this.status == 'done') {
      //   cardContainer[2].appendChild(card)
      // }
      reupdate()
    }
}
  
// initialising task delete button
// var taskDelete = document.createElement('button')

// creating an array that will be populated with tasks
var taskList = [];

// accessing the full form to create tasks
// var taskForm = document.getElementById('task-form');

// article to display tasks
// var taskDisplay = document.getElementById('task-display');


// selecting the submit button for the form
var taskSubmitButton = document.getElementById('create-task-submit');
var taskSaveButton = document.getElementById('edit-task-save');
var taskCancelButton = document.getElementById('edit-task-cancel');
var taskDeleteButton = document.getElementById('edit-task-delete');
taskDeleteButton.addEventListener('click', function(event) {
    var id = parseInt(taskSaveButton.value)
    // console.log('we are in the save button. the id is '+ id)
    // if (id) {
    taskID = id
    for (let i = 0; i < taskList.length; i ++) {
      var oldTask = taskList[i]
      if (oldTask.id == id) {
        taskList.splice(taskList.indexOf(oldTask), 1)
        var oldCard = document.getElementById('t-' + id)
        oldCard.remove();
        taskSaveButton.value = ''
      }
    }
    overlayToggle = false;
    createTaskForm.classList.remove('active')
    createTaskForm.reset();
    counter()
    // reupdate()
})
taskCancelButton.addEventListener('click', function(event) {
  event.preventDefault()
  overlayToggle = false;
  createTaskForm.classList.remove('active')
  createTaskForm.reset();
  // reupdate()
})
taskSaveButton.addEventListener('click', function(event) {

  event.preventDefault()
  var taskDetails, task, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus;
  // taskDetailer(taskSaveButton.value)
  /////////////////////////////
  // initialising variables
  taskDetails = createTaskForm.querySelectorAll('form input');

  var id = parseInt(taskSaveButton.value)
  // console.log('we are in the save button. the id is '+ id)
  // if (id) {
  taskID = id
  for (let i = 0; i < taskList.length; i ++) {
    var oldTask = taskList[i]
    if (oldTask.id == id) {
      taskList.splice(taskList.indexOf(oldTask), 1)
      var oldCard = document.getElementById('t-' + id)
      oldCard.remove();
      taskSaveButton.value = ''
    }
  }
  
  // get all of the user input in the input fields

  taskName = taskDetails[0].value;
  taskDescription = taskDetails[1].value;
  taskSubject = taskDetails[2].value;
  var statuses = createTaskForm.querySelector('select[name=status]');
  taskStatus = statuses.value;

  // checking the radios 
  if (taskDetails[3].checked == true) {
    taskPriorityRating = taskDetails[3].value
  } else if (taskDetails[4].checked == true) {
    taskPriorityRating = taskDetails[4].value
  } else if (taskDetails[5].checked == true) {
    taskPriorityRating = taskDetails[5].value
  }

  taskEstimatedTimeHr = taskDetails[6].value;
  taskEstimatedTimeMin = taskDetails[7].value;
  taskDueDate = taskDetails[8].value;
  /////////////////////////////
  task = new Task(taskID, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus)
  task.createCard(task.addTask());
  overlayToggle = false;
  createTaskForm.classList.remove('active')
  createTaskForm.reset();
  counter()
  // reupdate()
})
// something to populate tasks with on the page

// on submit:
taskSubmitButton.addEventListener('click', function(event) {
  event.preventDefault()
  var taskDetails, task, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus;

  // taskDetailer()
  taskSaveStatus = 'saved';

  /////////////////////////////
    // initialising variables
    taskDetails = createTaskForm.querySelectorAll('form input');
    taskID = taskList.length
    // get all of the user input in the input fields
  
    taskName = taskDetails[0].value;
    taskDescription = taskDetails[1].value;
    taskSubject = taskDetails[2].value;
    var statuses = createTaskForm.querySelector('select[name=status]');
    taskStatus = statuses.value;
  
    // checking the radios 
    if (taskDetails[3].checked == true) {
      taskPriorityRating = taskDetails[3].value
    } else if (taskDetails[4].checked == true) {
      taskPriorityRating = taskDetails[4].value
    } else if (taskDetails[5].checked == true) {
      taskPriorityRating = taskDetails[5].value
    }
  
    taskEstimatedTimeHr = taskDetails[6].value;
    taskEstimatedTimeMin = taskDetails[7].value;
    taskDueDate = taskDetails[8].value;
  /////////////////////////////
  // create a new task using the task class
  task = new Task(taskID, taskName, taskDescription, taskSubject, taskStatus, taskPriorityRating, taskEstimatedTimeHr, taskEstimatedTimeMin, taskDueDate, taskSaveStatus)
  // task = new Task(taskID, taskName, taskDescription, taskDueDate, taskPriorityRating, taskEstimatedTime, taskCompletionStatus, taskSaveStatus)

  // add the task to the task list (repo)

  // task.printTask(task.addTask());
  task.createCard(task.addTask());
  // create new card with task
  // exit form
  overlayToggle = false;
  createTaskForm.classList.remove('active')
  createTaskForm.reset();
  // print to check

  counter()
  // reupdate()
})

// getting values of the card for editing

// //////////////////////////////////////////// ADD COLUMN //////////////////////////////////////////////// //
const addColumnForm = document.getElementById('add-column-form')
var newColumnToggle = false;
const newColumn = document.getElementById('new-column');

// adding an event listener to bring up the form
newColumn.addEventListener('click', function() {
  if (newColumnToggle == false) {
    addColumnForm.classList.add('active')
    newColumnToggle = true
  } else if (newColumnToggle == true) {
    addColumnForm.classList.remove('active')
    newColumnToggle = false
  }
})

// adding an event listener for submitting the column
const columnSubmitButton = document.getElementById('add-column-submit')
columnSubmitButton.addEventListener('click', function(event) {
  event.preventDefault();

  // creating the column
  let column = document.createElement('div')
  column.classList.add('column')
  let title = document.createElement('div')
  title.classList.add('title')
  let columnName = document.createElement('input')
  columnName.classList.add('column-name')

  // giving it the name provided by the user
  let columnNameValue = addColumnForm.querySelectorAll('input')[0]
  columnName.value = columnNameValue.value
  let total = document.createElement('h3')
  total.classList.add('total')
  total.textContent = 0;
  let cards = document.createElement('div')
  cards.classList.add('cards')

  title.appendChild(columnName)
  title.appendChild(total)
  column.appendChild(title)
  column.appendChild(cards)
  let tasks = document.getElementById('tasks')
  tasks.appendChild(column)
  // smooth scroll to the new column
  tasks.scrollTo({
    top: 0,
    left: tasks.clientWidth,
    behavior: 'smooth'
  })
  updateColumnNames()
  // close the form
  newColumnToggle = false;
  addColumnForm.reset()
  addColumnForm.classList.remove('active')

  var newCards = document.querySelectorAll('.cards')
  newCards = newCards[newCards.length - 1]
  createNewSortable(newCards);
})

function createNewSortable(element) {
  new Sortable(element, {
  group: 'nested',
  animation: 200,
  swapThreshold: 0.65,
      ghostClass: 'ghost-card',
      chosenClass: 'chosen-card',
      forceFallback: true,
      onEnd: function (evt) {
        // console.log(evt.to)
        counter()

      }
    })
}

function counter() {
  var total = document.querySelectorAll('.total'),
  cards = document.querySelectorAll('.cards')
    total.forEach(function count(object, index) {
      counta = 0;
      for (let i = 0; i < cards[index].querySelectorAll('.card').length; i ++) {
          if (cards[index].querySelectorAll('.card')[i].classList.length == 1) {
              counta += 1
          }
      }
      total[index].textContent = counta;
  })
}
},{}]},["6c6yg","51IO2"], "51IO2", "parcelRequirec526")

//# sourceMappingURL=index.89a9e78d.js.map
