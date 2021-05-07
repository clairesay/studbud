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
})({"6ItLa":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "f68f0d94b932c61010d4b6544ead0e68";
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

},{}],"6dqWB":[function(require,module,exports) {
var _task = require('./task');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _taskDefault = _parcelHelpers.interopDefault(_task);
var _kanban = require('./kanban');
// opening or closing the task form and changing its type
function toggleTaskForm(type) {
  // check if its an update form if so, reword, and show corresponding buttons :)
  if (type == 'update') {
    createTaskForm.querySelector('h1').textContent = 'Edit an existing task';
    createTaskForm.classList.add('update');
  } else {
    createTaskForm.querySelector('h1').textContent = 'Create a new task';
    createTaskForm.classList.remove('update');
  }
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
  taskList.forEach(function (task) {
    let thisTask = task;
    if (thisTask.id == objectId) {
      let taskDetails = createTaskForm.querySelectorAll('form input');
      // taskName
      taskDetails[0].value = thisTask.name;
      // taskDescription
      taskDetails[1].value = thisTask.description;
      // taskSubject
      taskDetails[2].value = thisTask.subject;
      // taskStatus
      let statuses = createTaskForm.querySelector('select[name=status]');
      statuses.value = object.parentElement.parentElement.parentElement.querySelector('div.title input.column-name').value;
      // taskPriorityRating
      if (thisTask.priorityRating == 'Low') {
        taskDetails[3].checked = true;
      } else if (thisTask.priorityRating == 'Mid') {
        taskDetails[4].checked = true;
      } else if (thisTask.priorityRating == 'High') {
        taskDetails[5].checked = true;
      }
      // taskEstimatedTimeHr
      taskDetails[6].value = thisTask.estimatedTimeHr;
      // taskEstimatedTimeMin
      taskDetails[7].value = thisTask.estimatedTimeMin;
      // taskDueDate
      taskDetails[8].value = thisTask.dueDate;
      taskSaveButton.value = thisTask.id;
      toggleTaskForm('update');
    }
  });
}
function populateTaskDetails(taskDetails) {
  let name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate;
  name = taskDetails[0].value;
  description = taskDetails[1].value;
  subject = taskDetails[2].value;
  var statuses = createTaskForm.querySelector('select[name=status]');
  status = statuses.value;
  // checking the radios
  if (taskDetails[3].checked == true) {
    priorityRating = taskDetails[3].value;
  } else if (taskDetails[4].checked == true) {
    priorityRating = taskDetails[4].value;
  } else if (taskDetails[5].checked == true) {
    priorityRating = taskDetails[5].value;
  }
  estimatedTimeHr = taskDetails[6].value;
  estimatedTimeMin = taskDetails[7].value;
  dueDate = taskDetails[8].value;
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
// /////
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
const taskDeleteButton = document.getElementById('edit-task-delete');
taskDeleteButton.addEventListener('click', function () {
  let id = parseInt(taskSaveButton.value);
  for (let i = 0; i < taskList.length; i++) {
    let oldTask = taskList[i];
    if (oldTask.id == id) {
      taskList.splice(taskList.indexOf(oldTask), 1);
      let oldCard = document.getElementById('t-' + id);
      oldCard.remove();
    }
  }
  toggleTaskForm();
  reupdate();
});
taskCancelButton.addEventListener('click', function () {
  toggleTaskForm();
  reupdate();
});
taskSaveButton.addEventListener('click', function (event) {
  event.preventDefault();
  // depends whether we are updating or creating a task
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
  // initialising variables
  let taskDetails = createTaskForm.querySelectorAll('form input');
  // get all of the user input in the input fields
  let task = populateTaskDetails(taskDetails);
  // create a new task using the task class
  let newTask = new _taskDefault.default(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate, taskList);
  // append to taskList and create new card with task
  newTask.createCard(newTask.addTask());
  // close the form and add event listeners to any new items
  toggleTaskForm();
  reupdate();
});

},{"./task":"3EAmk","./kanban":"3b9tq","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3EAmk":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
  // this is what it's made of
  constructor(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, taskList) {
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
    this.taskList = taskList;
  }
  /*this adds tasks to the array taskList*/
  addTask() {
    this.taskList.push(this);
    return this.id;
  }
  createCard(n) {
    let card = document.createElement('article');
    let subjectTag = document.createElement('span'), title = document.createElement('h3'), description = document.createElement('p'), timeDetails = document.createElement('div'), dueDate = document.createElement('h4'), timeTag = document.createElement('span'), editIcon = document.createElement('a');
    editIcon.classList.add('edit');
    editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`;
    card.classList.add('card');
    card.setAttribute('id', 't-' + n);
    subjectTag.classList.add('tag');
    subjectTag.classList.add('subject');
    timeDetails.classList.add('time-details');
    timeTag.classList.add('time');
    timeTag.classList.add('tag');
    title.textContent = this.name;
    description.textContent = this.description;
    subjectTag.textContent = this.subject;
    dueDate.textContent = this.dueDate;
    timeTag.textContent = this.estimatedTimeHr + this.estimatedTimeMin;
    // appending time details to time div
    timeDetails.appendChild(dueDate);
    timeDetails.appendChild(timeTag);
    // appending everything to whole div
    card.appendChild(subjectTag);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(editIcon);
    card.appendChild(timeDetails);
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
function countCards() {
  let total = document.querySelectorAll('.total'), cards = document.querySelectorAll('.cards');
  total.forEach(function count(object, index) {
    cardCount = 0;
    for (let i = 0; i < cards[index].querySelectorAll('.card').length; i++) {
      if (cards[index].querySelectorAll('.card')[i].classList.length == 1) {
        cardCount += 1;
      }
    }
    total[index].textContent = cardCount;
  });
}
countCards();
// Sortable JS library
var cards = document.querySelectorAll('.cards');
cards.forEach(function (element) {
  new Sortable(element, {
    group: 'nested',
    animation: 200,
    swapThreshold: 0.65,
    ghostClass: 'ghost-card',
    chosenClass: 'chosen-card',
    forceFallback: true,
    onEnd: function (evt) {
      countCards();
    }
  });
});
var tasks = document.getElementById('tasks');
new Sortable(tasks, {
  animation: 150,
  swapThreshold: 0.8,
  ghostClass: 'ghost-column',
  chosenClass: 'chosen-column',
  forceFallback: true
});

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["6ItLa","6dqWB"], "6dqWB", "parcelRequirec526")

//# sourceMappingURL=index.4ead0e68.js.map