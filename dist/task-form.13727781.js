// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // declaring a class called Task - this ordains the structure for all the elements to go into the class

var Task = /*#__PURE__*/function () {
  // this is what it's made of
  function Task(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, taskList) {
    _classCallCheck(this, Task);

    this.id = id;
    this.name = name;
    this.description = description;
    this.subject = subject;
    this.status = status;
    this.priorityRating = priorityRating;
    this.estimatedTimeHr = estimatedTimeHr;
    this.estimatedTimeMin = estimatedTimeMin;
    this.dueDate = dueDate; // array of tasks

    this.taskList = taskList;
  } // this adds tasks to the array taskList


  _createClass(Task, [{
    key: "addTask",
    value: function addTask() {
      this.taskList.push(this);
      return this.id;
    } // this creates a new card and applies it to the kanban board

  }, {
    key: "createCard",
    value: function createCard(n) {
      // initialising new elements
      var card = document.createElement('article'),
          subjectTag = document.createElement('span'),
          title = document.createElement('h3'),
          description = document.createElement('p'),
          informationDiv = document.createElement('div'),
          timeDetails = document.createElement('div'),
          dueDate = document.createElement('h4'),
          timeTag = document.createElement('span'),
          editIcon = document.createElement('a'),
          timeIcon = document.createElement('div'),
          line = document.createElement('HR'); // setting classes and attributes

      editIcon.classList.add('edit');
      editIcon.innerHTML = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z\" fill=\"#909090\"/>\n          </svg>"; // time icon has been replaced with a priority rating - the priority is ranked in traffic light colors from green to red

      timeIcon.style.width = '12px';
      timeIcon.style.height = '12px';
      timeIcon.style.borderRadius = '12px';

      if (this.priorityRating == 'Low') {
        timeIcon.style.backgroundColor = '#70B815';
      } else if (this.priorityRating == 'Mid') {
        timeIcon.style.backgroundColor = '#E5C44C';
      } else if (this.priorityRating == 'High') {
        timeIcon.style.backgroundColor = '#F59273';
      } // setting relevant attributes


      card.classList.add('card');
      card.setAttribute('id', 't-' + n);
      subjectTag.classList.add('tag');
      subjectTag.classList.add('subject');
      timeDetails.classList.add('time-details');
      timeTag.classList.add('time');
      timeTag.classList.add('tag'); // setting values

      title.textContent = this.name;
      description.textContent = this.description;
      subjectTag.textContent = this.subject; // if there is a due date, reformat for display on the cards

      if (this.dueDate.length != 0) {
        var dueDateElements = this.dueDate.split('-');
        var month = months[parseInt(dueDateElements[1]) - 1];
        var day = dueDateElements[2];
        dueDate.textContent = 'Due ' + day + ' ' + month;
      } else {
        dueDate.textContent = 'No due date';
      } // concatenating hour and minute estimated time durations


      if (this.estimatedTimeHr > 0 && this.estimatedTimeMin > 0) {
        timeTag.textContent = this.estimatedTimeHr + ' HR ' + this.estimatedTimeMin + ' MIN';
      } else if (this.estimatedTimeHr == 0 && this.estimatedTimeMin > 0) {
        timeTag.textContent = this.estimatedTimeMin + ' MIN';
      } else if (this.estimatedTimeHr > 0 && this.estimatedTimeMin == 0) {
        timeTag.textContent = this.estimatedTimeHr + ' HR';
      } else {
        timeTag.textContent = '∞';
      } // appending time details to time div


      timeDetails.appendChild(timeIcon);
      timeDetails.appendChild(dueDate);
      timeDetails.appendChild(timeTag); // appending everything to whole div
      // if (this.subject.length != 0) {

      card.appendChild(subjectTag); // }

      informationDiv.appendChild(title);
      informationDiv.appendChild(description); // card.appendChild(title)
      // card.appendChild(description)

      card.appendChild(informationDiv);
      card.appendChild(line);
      card.appendChild(timeDetails);
      card.appendChild(editIcon); // appending card to column

      var columnNames = document.querySelectorAll('.column-name');
      var cardContainers = document.querySelectorAll('.cards');
      var currentStatus = this.status;
      columnNames.forEach(function setColumn(object, index) {
        if (object.value == currentStatus) {
          cardContainers[index].appendChild(card);
        }
      });
    }
  }]);

  return Task;
}();

var _default = Task;
exports.default = _default;
},{}],"js/kanban.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countCards = countCards;
exports.sortability = sortability;

// counts how many cards are in a kanban column
function countCards() {
  var total = document.querySelectorAll('.total'),
      cardContainers = document.querySelectorAll('.cards'),
      columns = document.querySelectorAll('.column'),
      cards = document.getElementsByClassName('card');
  var emptyStateMessage = document.getElementById('empty-state-tasks'); // if there are no cards, add an empty state message, otherwise remove it.

  if (cards.length == 0) {
    cardContainers[0].appendChild(emptyStateMessage);
    emptyStateMessage.style.display = 'flex';
  } else {
    columns[0].appendChild(emptyStateMessage);
    emptyStateMessage.style.display = 'none';
  } // writing the total number of cards at the head of each column


  total.forEach(function count(object, index) {
    var cardCount = 0;

    for (var i = 0; i < cardContainers[index].querySelectorAll('.card').length; i++) {
      if (cardContainers[index].querySelectorAll('.card')[i].classList.length == 1) {
        cardCount += 1;
      }
    }

    total[index].textContent = cardCount;
  });
}

countCards(); // Setting sortable functionality to the cards with the sortable.js library

function sortability() {
  // applying sortability to the children of each .cards container
  var cardContainers = document.querySelectorAll('.cards');
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
      onStart: function onStart(evt) {
        // setting the cursor to grabbing while user is holding card
        var itemEl = evt.item;
        itemEl.style.cursor = 'grabbing';
        var body = document.getElementsByTagName('body')[0];
        body.style.cursor = 'grabbing';
      },
      onEnd: function onEnd(evt) {
        // setting the cursor to grab 
        var itemEl = evt.item;
        itemEl.style.cursor = 'grab'; // reset cursor to normal arrow

        var body = document.getElementsByTagName('body')[0];
        body.style.cursor = 'initial'; // recount all the cards in each column and update their totals

        countCards(); // set enabled/disabled status to each of the buttons after the reallocation happened

        var allDeleteColumnButtons = document.querySelectorAll('svg.delete-column');
        allDeleteColumnButtons.forEach(function (button) {
          var columns = document.getElementsByClassName('column');
          var column = button.parentElement.parentElement;
          var cards = column.querySelectorAll('.card'); // ensuring there are mroe than 3 columns and no cards within the column

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
},{}],"js/task-form.js":[function(require,module,exports) {
"use strict";

var _task = _interopRequireDefault(require("./task"));

var kanban = _interopRequireWildcard(require("./kanban"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subjectList = []; // suggested subjects should not be duplicated

function updateSubjectList() {
  // check the task list for each subject
  taskList.forEach(function (task) {
    var taskSubject = task.subject.trim().toUpperCase();
    var duplicate = false; // if the subject already exists in the subjectlist, its a duplicate so don't push

    for (i in subjectList) {
      if (subjectList[i] == taskSubject) {
        duplicate = true;
      }
    } // otherwise, it's a unique subject, save to datalist --> user be recommended subjects they have already inputted when creating new tasks


    if (duplicate == false) {
      subjectList.push(taskSubject);
    }
  }); // actually setting the options in the subjectlist

  var subjectOptions = document.querySelector('datalist#subject');
  subjectOptions.innerHTML = '';
  subjectList.forEach(function (subject) {
    var option = document.createElement('option');
    option.textContent = subject;
    subjectOptions.appendChild(option);
  });
} // opening or closing the task form and changing its type


function toggleTaskForm(type) {
  // clearing validate text and resetting required status
  validateText.innerHTML = '';
  createTaskForm.querySelector('input').removeAttribute('required'); // check if its an update form if so, reword, and show corresponding buttons :)

  if (type == 'update') {
    createTaskForm.querySelector('h1').textContent = 'Edit task';
    createTaskForm.classList.add('update');
  } else {
    createTaskForm.querySelector('h1').textContent = 'Create new task';
    createTaskForm.classList.remove('update');
  } // check if we're closing or opening the form


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
    kanban.countCards();
    kanban.sortability();
  }
} // adding event listeners to edit buttons 


function reupdate() {
  // each card has an edit button that allows users to reaccess and update task details
  var editButtons = document.querySelectorAll('.edit');
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
} // autopopulates the form with existing task data previously inputted by user


function autoFillTaskDetails(object) {
  var objectId = object.parentElement.id;
  objectId = objectId.replace('t-', ''); // for each element in the task list already

  taskList.forEach(function (task) {
    var thisTask = task;

    if (thisTask.id == objectId) {
      var taskDetails = createTaskForm.querySelectorAll('form input');
      var textArea = createTaskForm.querySelector('textarea'); // taskName

      taskDetails[0].value = thisTask.name; // taskDescription

      textArea.value = thisTask.description; // taskSubject 

      taskDetails[1].value = thisTask.subject; // taskStatus

      var statuses = createTaskForm.querySelector('select[name=status]');
      statuses.value = object.parentElement.parentElement.parentElement.querySelector('div.title input.column-name').value; // taskPriorityRating

      if (thisTask.priorityRating == 'Low') {
        taskDetails[2].checked = true;
      } else if (thisTask.priorityRating == 'Mid') {
        taskDetails[3].checked = true;
      } else if (thisTask.priorityRating == 'High') {
        taskDetails[4].checked = true;
      } // taskEstimatedTimeHr


      taskDetails[5].value = thisTask.estimatedTimeHr; // taskEstimatedTimeMin

      taskDetails[6].value = thisTask.estimatedTimeMin; // taskDueDate

      taskDetails[7].value = thisTask.dueDate;
      taskSaveButton.value = thisTask.id;
      toggleTaskForm('update');
    }
  });
} //updating disabled/enabled status for all buttons


function enableButtons() {
  var allDeleteColumnButtons = document.querySelectorAll('svg.delete-column');
  allDeleteColumnButtons.forEach(function (button) {
    var columns = document.getElementsByClassName('column');
    var column = button.parentElement.parentElement;
    var cards = column.querySelectorAll('.card'); // checking for more than 3 columns and no cards within column

    if (columns.length > 3 && cards.length == 0) {
      button.classList.remove('disabled');
    } else if (columns.length <= 3 || cards.length > 0) {
      button.classList.add('disabled');
    }
  });
} // getting all of the task details inputted by the user


function getTaskDetails(taskDetails) {
  var name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate;
  name = taskDetails[0].value;
  var textArea = createTaskForm.querySelector('textarea');
  description = textArea.value;
  subject = taskDetails[1].value;
  var statuses = createTaskForm.querySelector('select[name=status]');
  status = statuses.value; // checking the radios 

  if (taskDetails[2].checked == true) {
    priorityRating = taskDetails[2].value;
  } else if (taskDetails[3].checked == true) {
    priorityRating = taskDetails[3].value;
  } else if (taskDetails[4].checked == true) {
    priorityRating = taskDetails[4].value;
  } // estimated time


  estimatedTimeHr = taskDetails[5].value;
  estimatedTimeMin = taskDetails[6].value;
  dueDate = taskDetails[7].value; // return all input values from the form

  return {
    name: name,
    description: description,
    subject: subject,
    status: status,
    priorityRating: priorityRating,
    estimatedTimeHr: estimatedTimeHr,
    estimatedTimeMin: estimatedTimeMin,
    dueDate: dueDate
  };
} // selecting relevant elements


var taskList = [];
var newTask = document.getElementById('new-task');
var createTaskForm = document.getElementById('create-task-form');
var modalBackground = document.getElementById('modal-background');
var formVisible = false; // create a new task

newTask.addEventListener('click', toggleTaskForm); // adding event listeners to the form buttons.

var taskSaveButton = document.getElementById('task-save');
var taskCancelButton = document.getElementById('edit-task-cancel');
var taskCloseButton = taskCancelButton.nextElementSibling;
var taskDeleteButton = document.getElementById('edit-task-delete'); // cancelling the creation of a task without saving

taskCancelButton.addEventListener('click', function () {
  toggleTaskForm();
  reupdate();
});
taskCloseButton.addEventListener('click', function () {
  toggleTaskForm();
  reupdate();
}); // deleting a task

taskDeleteButton.addEventListener('click', function () {
  var id = parseInt(taskSaveButton.value); // iterate through existing elements in the task list and remove the match

  for (var _i = 0; _i < taskList.length; _i++) {
    var oldTask = taskList[_i];

    if (oldTask.id == id) {
      taskList.splice(taskList.indexOf(oldTask), 1);
      var oldCard = document.getElementById('t-' + id);
      oldCard.remove();
    }
  } // reset form and other functionality


  toggleTaskForm();
  reupdate();
  enableButtons();
  updateSubjectList();
});
var validateText = createTaskForm.querySelector('.validate-message'); // saving a new task or updating

taskSaveButton.addEventListener('click', function (event) {
  event.preventDefault(); // initialising variables

  var taskDetails = createTaskForm.querySelectorAll('form input'); // get all of the user input in the input fields

  var task = getTaskDetails(taskDetails); // if there isn't at least a task name included in the form input, prevent form submission - ask for user to input name

  if (task.name == '') {
    taskDetails[0].setAttribute('required', 'true');
    validateText.innerHTML = 'Please enter a task name to save this task.';
  } else {
    // depends whether we are updating or creating a task
    // if updating, replace old content at the same ID 
    var taskID;

    if (createTaskForm.classList.contains('update')) {
      taskID = parseInt(taskSaveButton.value);

      for (var _i2 = 0; _i2 < taskList.length; _i2++) {
        var oldTask = taskList[_i2];

        if (oldTask.id == taskID) {
          taskList.splice(taskList.indexOf(oldTask), 1);
          var oldCard = document.getElementById('t-' + taskID);
          oldCard.remove();
          taskSaveButton.value = '';
        }
      } // otherwise, create a new ID

    } else {
      taskID = Date.now();
    } // create a new task using the task class


    var _newTask = new _task.default(taskID, task.name, task.description, task.subject, task.status, task.priorityRating, task.estimatedTimeHr, task.estimatedTimeMin, task.dueDate, taskList); // append to taskList and create new card with task


    _newTask.createCard(_newTask.addTask()); // close the form and add event listeners to any new items


    toggleTaskForm();
    reupdate();
    enableButtons(); // update subjects

    updateSubjectList();
  }
}); // if user chooses to create new task through CTA in empty state message, open form like user clicked on top right hand CTA

var emptyStateButton = document.querySelector('#empty-state-tasks button');
emptyStateButton.addEventListener('click', function () {
  if (deviceSize != 'desktop') {
    // counter click for the 'buttons container dropdown'
    document.querySelector('#task-buttons button.icon').click();
  }

  newTask.click();
});
},{"./task":"js/task.js","./kanban":"js/kanban.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62103" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
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
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
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
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/task-form.js"], null)
//# sourceMappingURL=/task-form.13727781.js.map