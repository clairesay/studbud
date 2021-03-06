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
})({"jxrgz":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "57caf8ea5ec31d005d3fe7cd05443c22";
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

},{}],"xKZW3":[function(require,module,exports) {
var _task = require('./task');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _taskDefault = _parcelHelpers.interopDefault(_task);
var _kanban = require('./kanban');
var subjectList = [];
// suggested subjects should not be duplicated
function updateSubjectList() {
  // check the task list for each subject
  taskList.forEach(function (task) {
    let taskSubject = task.subject.trim().toUpperCase();
    let duplicate = false;
    // if the subject already exists in the subjectlist, its a duplicate so don't push
    for (i in subjectList) {
      if (subjectList[i] == taskSubject) {
        duplicate = true;
      }
    }
    // otherwise, it's a unique subject, save to datalist --> user be recommended subjects they have already inputted when creating new tasks
    if (duplicate == false) {
      subjectList.push(taskSubject);
    }
  });
  // actually setting the options in the subjectlist
  let subjectOptions = document.querySelector('datalist#subject');
  subjectOptions.innerHTML = '';
  subjectList.forEach(function (subject) {
    let option = document.createElement('option');
    option.textContent = subject;
    subjectOptions.appendChild(option);
  });
}
// opening or closing the task form and changing its type
function toggleTaskForm(type) {
  // clearing validate text and resetting required status
  validateText.innerHTML = '';
  createTaskForm.querySelector('input').removeAttribute('required');
  // check if its an update form if so, reword, and show corresponding buttons :)
  if (type == 'update') {
    createTaskForm.querySelector('h1').textContent = 'Edit task';
    createTaskForm.classList.add('update');
  } else {
    createTaskForm.querySelector('h1').textContent = 'Create new task';
    createTaskForm.classList.remove('update');
  }
  // check if we're closing or opening the form
  if (formVisible == false) {
    createTaskForm.classList.add('active');
    formVisible = true;
    modalBackground.style.display = 'flex';
  } else if (formVisible == true) {
    createTaskForm.classList.remove('active');
    formVisible = false;
    modalBackground.style.display = 'none';
    createTaskForm.reset();
    taskSaveButton.value = '';
    _kanban.countCards();
    _kanban.sortability();
  }
}
// adding event listeners to edit buttons
function reupdate() {
  // each card has an edit button that allows users to reaccess and update task details
  let editButtons = document.querySelectorAll('.edit');
  editButtons.forEach(function (editButton) {
    // if there hasn't been a listener previously attached, attach one
    if (editButton.getAttribute('listener') !== 'true') {
      editButton.addEventListener('click', addAutoFill);
      editButton.setAttribute('listener', 'true');
    }
    function addAutoFill() {
      autoFillTaskDetails(editButton);
    }
  });
}
// autopopulates the form with existing task data previously inputted by user
function autoFillTaskDetails(object) {
  let objectId = object.parentElement.id;
  objectId = objectId.replace('t-', '');
  // for each element in the task list already
  taskList.forEach(function (task) {
    let thisTask = task;
    if (thisTask.id == objectId) {
      let taskDetails = createTaskForm.querySelectorAll('form input');
      let textArea = createTaskForm.querySelector('textarea');
      // taskName
      taskDetails[0].value = thisTask.name;
      // taskDescription
      textArea.value = thisTask.description;
      // taskSubject
      taskDetails[1].value = thisTask.subject;
      // taskStatus
      let statuses = createTaskForm.querySelector('select[name=status]');
      statuses.value = object.parentElement.parentElement.parentElement.querySelector('div.title input.column-name').value;
      // taskPriorityRating
      if (thisTask.priorityRating == 'Low') {
        taskDetails[2].checked = true;
      } else if (thisTask.priorityRating == 'Mid') {
        taskDetails[3].checked = true;
      } else if (thisTask.priorityRating == 'High') {
        taskDetails[4].checked = true;
      }
      // taskEstimatedTimeHr
      taskDetails[5].value = thisTask.estimatedTimeHr;
      // taskEstimatedTimeMin
      taskDetails[6].value = thisTask.estimatedTimeMin;
      // taskDueDate
      taskDetails[7].value = thisTask.dueDate;
      taskSaveButton.value = thisTask.id;
      toggleTaskForm('update');
    }
  });
}
// updating disabled/enabled status for all buttons
function enableButtons() {
  let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column');
  allDeleteColumnButtons.forEach(function (button) {
    let columns = document.getElementsByClassName('column');
    let column = button.parentElement.parentElement;
    let cards = column.querySelectorAll('.card');
    // checking for more than 3 columns and no cards within column
    if (columns.length > 3 && cards.length == 0) {
      button.classList.remove('disabled');
    } else if (columns.length <= 3 || cards.length > 0) {
      button.classList.add('disabled');
    }
  });
}
// getting all of the task details inputted by the user
function getTaskDetails(taskDetails) {
  let name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate;
  name = taskDetails[0].value;
  let textArea = createTaskForm.querySelector('textarea');
  description = textArea.value;
  subject = taskDetails[1].value;
  let statuses = createTaskForm.querySelector('select[name=status]');
  status = statuses.value;
  // checking the radios
  if (taskDetails[2].checked == true) {
    priorityRating = taskDetails[2].value;
  } else if (taskDetails[3].checked == true) {
    priorityRating = taskDetails[3].value;
  } else if (taskDetails[4].checked == true) {
    priorityRating = taskDetails[4].value;
  }
  // estimated time
  estimatedTimeHr = taskDetails[5].value;
  estimatedTimeMin = taskDetails[6].value;
  dueDate = taskDetails[7].value;
  // return all input values from the form
  return {
    name,
    description,
    subject,
    status,
    priorityRating,
    estimatedTimeHr,
    estimatedTimeMin,
    dueDate
  };
}
// selecting relevant elements
var taskList = [];
const newTask = document.getElementById('new-task');
const createTaskForm = document.getElementById('create-task-form');
const modalBackground = document.getElementById('modal-background');
var formVisible = false;
// create a new task
newTask.addEventListener('click', toggleTaskForm);
// adding event listeners to the form buttons.
const taskSaveButton = document.getElementById('task-save');
const taskCancelButton = document.getElementById('edit-task-cancel');
const taskCloseButton = taskCancelButton.nextElementSibling;
const taskDeleteButton = document.getElementById('edit-task-delete');
// cancelling the creation of a task without saving
taskCancelButton.addEventListener('click', function () {
  toggleTaskForm();
  reupdate();
});
taskCloseButton.addEventListener('click', function () {
  toggleTaskForm();
  reupdate();
});
// deleting a task
taskDeleteButton.addEventListener('click', function () {
  let id = parseInt(taskSaveButton.value);
  // iterate through existing elements in the task list and remove the match
  for (let i = 0; i < taskList.length; i++) {
    let oldTask = taskList[i];
    if (oldTask.id == id) {
      taskList.splice(taskList.indexOf(oldTask), 1);
      let oldCard = document.getElementById('t-' + id);
      oldCard.remove();
    }
  }
  // reset form and other functionality
  toggleTaskForm();
  reupdate();
  enableButtons();
  updateSubjectList();
});
var validateText = createTaskForm.querySelector('.validate-message');
// saving a new task or updating
taskSaveButton.addEventListener('click', function (event) {
  event.preventDefault();
  // initialising variables
  let taskDetails = createTaskForm.querySelectorAll('form input');
  // get all of the user input in the input fields
  let task = getTaskDetails(taskDetails);
  // if there isn't at least a task name included in the form input, prevent form submission - ask for user to input name
  if (task.name == '') {
    taskDetails[0].setAttribute('required', 'true');
    validateText.innerHTML = 'Please enter a task name to save this task.';
  } else {
    // depends whether we are updating or creating a task
    // if updating, replace old content at the same ID
    let taskID;
    if (createTaskForm.classList.contains('update')) {
      taskID = parseInt(taskSaveButton.value);
      for (let i = 0; i < taskList.length; i++) {
        var oldTask = taskList[i];
        if (oldTask.id == taskID) {
          taskList.splice(taskList.indexOf(oldTask), 1);
          let oldCard = document.getElementById('t-' + taskID);
          oldCard.remove();
          taskSaveButton.value = '';
        }
      }
    } else {
      taskID = Date.now();
    }
    // create a new task using the task class
    let newTask = new _taskDefault.default(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate, taskList);
    // append to taskList and create new card with task
    newTask.createCard(newTask.addTask());
    // close the form and add event listeners to any new items
    toggleTaskForm();
    reupdate();
    enableButtons();
    // update subjects
    updateSubjectList();
  }
});
// if user chooses to create new task through CTA in empty state message, open form like user clicked on top right hand CTA
var emptyStateButton = document.querySelector('#empty-state-tasks button');
emptyStateButton.addEventListener('click', function () {
  if (deviceSize != 'desktop') {
    // counter click for the 'buttons container dropdown'
    document.querySelector('#task-buttons button.icon').click();
  }
  newTask.click();
});

},{"./task":"3EAmk","./kanban":"3b9tq","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3EAmk":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
  // this is what it's made of
  constructor(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, taskList) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.subject = subject;
    this.status = status;
    this.priorityRating = priorityRating;
    this.estimatedTimeHr = estimatedTimeHr;
    this.estimatedTimeMin = estimatedTimeMin;
    this.dueDate = dueDate;
    // array of tasks
    this.taskList = taskList;
  }
  /*this adds tasks to the array taskList*/
  addTask() {
    this.taskList.push(this);
    return this.id;
  }
  /*this creates a new card and applies it to the kanban board*/
  createCard(n) {
    // initialising new elements
    let card = document.createElement('article'), subjectTag = document.createElement('span'), title = document.createElement('h3'), description = document.createElement('p'), informationDiv = document.createElement('div'), timeDetails = document.createElement('div'), dueDate = document.createElement('h4'), timeTag = document.createElement('span'), editIcon = document.createElement('a'), timeIcon = document.createElement('div'), line = document.createElement('HR');
    // setting classes and attributes
    editIcon.classList.add('edit');
    editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`;
    // time icon has been replaced with a priority rating - the priority is ranked in traffic light colors from green to red
    timeIcon.style.width = '12px';
    timeIcon.style.height = '12px';
    timeIcon.style.borderRadius = '12px';
    if (this.priorityRating == 'Low') {
      timeIcon.style.backgroundColor = '#70B815';
    } else if (this.priorityRating == 'Mid') {
      timeIcon.style.backgroundColor = '#E5C44C';
    } else if (this.priorityRating == 'High') {
      timeIcon.style.backgroundColor = '#F59273';
    }
    // setting relevant attributes
    card.classList.add('card');
    card.setAttribute('id', 't-' + n);
    subjectTag.classList.add('tag');
    subjectTag.classList.add('subject');
    timeDetails.classList.add('time-details');
    timeTag.classList.add('time');
    timeTag.classList.add('tag');
    // setting values
    title.textContent = this.name;
    description.textContent = this.description;
    subjectTag.textContent = this.subject;
    // if there is a due date, reformat for display on the cards
    if (this.dueDate.length != 0) {
      let dueDateElements = this.dueDate.split('-');
      let month = months[parseInt(dueDateElements[1]) - 1];
      let day = dueDateElements[2];
      dueDate.textContent = 'Due ' + day + ' ' + month;
    } else {
      dueDate.textContent = 'No due date';
    }
    // concatenating hour and minute estimated time durations
    if (this.estimatedTimeHr > 0 && this.estimatedTimeMin > 0) {
      timeTag.textContent = this.estimatedTimeHr + ' HR ' + this.estimatedTimeMin + ' MIN';
    } else if (this.estimatedTimeHr == 0 && this.estimatedTimeMin > 0) {
      timeTag.textContent = this.estimatedTimeMin + ' MIN';
    } else if (this.estimatedTimeHr > 0 && this.estimatedTimeMin == 0) {
      timeTag.textContent = this.estimatedTimeHr + ' HR';
    } else {
      timeTag.textContent = '???';
    }
    // appending time details to time div
    timeDetails.appendChild(timeIcon);
    timeDetails.appendChild(dueDate);
    timeDetails.appendChild(timeTag);
    // appending everything to whole div
    // if (this.subject.length != 0) {
    card.appendChild(subjectTag);
    // }
    informationDiv.appendChild(title);
    informationDiv.appendChild(description);
    // card.appendChild(title)
    // card.appendChild(description)
    card.appendChild(informationDiv);
    card.appendChild(line);
    card.appendChild(timeDetails);
    card.appendChild(editIcon);
    // appending card to column
    let columnNames = document.querySelectorAll('.column-name');
    let cardContainers = document.querySelectorAll('.cards');
    let currentStatus = this.status;
    columnNames.forEach(function setColumn(object, index) {
      if (object.value == currentStatus) {
        cardContainers[index].appendChild(card);
      }
    });
  }
}
exports.default = Task;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"3b9tq":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "countCards", function () {
  return countCards;
});
_parcelHelpers.export(exports, "sortability", function () {
  return sortability;
});
function countCards() {
  let total = document.querySelectorAll('.total'), cardContainers = document.querySelectorAll('.cards'), columns = document.querySelectorAll('.column'), cards = document.getElementsByClassName('card');
  let emptyStateMessage = document.getElementById('empty-state-tasks');
  // if there are no cards, add an empty state message, otherwise remove it.
  if (cards.length == 0) {
    cardContainers[0].appendChild(emptyStateMessage);
    emptyStateMessage.style.display = 'flex';
  } else {
    columns[0].appendChild(emptyStateMessage);
    emptyStateMessage.style.display = 'none';
  }
  // writing the total number of cards at the head of each column
  total.forEach(function count(object, index) {
    let cardCount = 0;
    for (let i = 0; i < cardContainers[index].querySelectorAll('.card').length; i++) {
      if (cardContainers[index].querySelectorAll('.card')[i].classList.length == 1) {
        cardCount += 1;
      }
    }
    total[index].textContent = cardCount;
  });
}
countCards();
function sortability() {
  // applying sortability to the children of each .cards container
  let cardContainers = document.querySelectorAll('.cards');
  cardContainers.forEach(function (element) {
    new Sortable(element, {
      group: 'nested',
      animation: 200,
      swapThreshold: 0.65,
      ghostClass: 'ghost-card',
      chosenClass: 'chosen-card',
      dragClass: "sortable-drag",
      filter: '.filtered',
      // 'filtered' class is not draggable
      forceFallback: true,
      onStart: function (evt) {
        // setting the cursor to grabbing while user is holding card
        let itemEl = evt.item;
        itemEl.style.cursor = 'grabbing';
        let body = document.getElementsByTagName('body')[0];
        body.style.cursor = 'grabbing';
      },
      onEnd: function (evt) {
        // setting the cursor to grab
        let itemEl = evt.item;
        itemEl.style.cursor = 'grab';
        // reset cursor to normal arrow
        let body = document.getElementsByTagName('body')[0];
        body.style.cursor = 'initial';
        // recount all the cards in each column and update their totals
        countCards();
        // set enabled/disabled status to each of the buttons after the reallocation happened
        let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column');
        allDeleteColumnButtons.forEach(function (button) {
          let columns = document.getElementsByClassName('column');
          let column = button.parentElement.parentElement;
          let cards = column.querySelectorAll('.card');
          // ensuring there are mroe than 3 columns and no cards within the column
          if (columns.length > 3 && cards.length == 0) {
            button.classList.remove('disabled');
          } else if (columns.length <= 3) {
            button.classList.add('disabled');
          } else if (cards.length > 0) {
            button.classList.add('disabled');
          }
        });
      }
    });
  });
}
sortability();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["jxrgz","xKZW3"], "xKZW3", "parcelRequirec526")

//# sourceMappingURL=index.05443c22.js.map
