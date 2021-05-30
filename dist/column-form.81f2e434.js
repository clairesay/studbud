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
})({"js/column.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Column = /*#__PURE__*/function () {
  function Column(id, name) {
    _classCallCheck(this, Column);

    this.id = id;
    this.name = name;
  }

  _createClass(Column, [{
    key: "createColumn",
    value: function createColumn() {
      // duplicating existing columns and tweaking some elements to make it unique
      var column = document.querySelector('div.column');
      column = column.cloneNode(true);
      var columnName = column.querySelector('input.column-name');
      columnName.value = this.name;
      var editButton = column.querySelector('svg.edit-column');
      var deleteButton = column.querySelector('svg.delete-column');
      var total = column.querySelector('h3.total');
      total.textContent = 0; // remove any existing cards inside the column

      var cards = column.querySelectorAll('.cards > *');
      cards.forEach(function (card) {
        card.remove();
      }); // appending to the tasks container

      var tasks = document.getElementById('tasks');
      tasks.appendChild(column); // adding the final padding

      tasks.appendChild(document.querySelector('#tasks div.padding')); // smooth scroll to the new column

      tasks.scrollTo({
        top: 0,
        left: tasks.clientWidth,
        behavior: 'smooth'
      });
    }
  }]);

  return Column;
}();

var _default = Column;
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
},{}],"js/column-form.js":[function(require,module,exports) {
"use strict";

var _column = _interopRequireDefault(require("./column"));

var kanban = _interopRequireWildcard(require("./kanban"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTaskForm = document.getElementById('create-task-form'); // updates all column names after any change/renaming is done

function updateColumnNames() {
  var columnNames = document.querySelectorAll('.column-name'); // reset the form statuses for the create task form

  var statuses = createTaskForm.querySelector('select[name=status]');
  statuses.innerHTML = ''; // apply all the new column names

  columnNames.forEach(function (object) {
    var newOption = document.createElement('option');
    newOption.textContent = object.value;
    newOption.value = object.value;
    statuses.appendChild(newOption);
  });
}

updateColumnNames();
var modalBackground = document.getElementById('modal-background');
var addColumnForm = document.getElementById('add-column-form');
var newColumnToggle = false;
var newColumn = document.getElementById('new-column'); // toggle the column form to either show or hide

function toggleColumnForm() {
  // reset the validation required messages
  validateText.innerHTML = '';
  var name = addColumnForm.querySelector('input');
  name.removeAttribute('required'); // toggle the column form to show/hide

  if (newColumnToggle == false) {
    addColumnForm.classList.add('active');
    newColumnToggle = true;
    modalBackground.style.display = 'flex';
  } else if (newColumnToggle == true) {
    addColumnForm.classList.remove('active');
    addColumnForm.reset();
    newColumnToggle = false;
    modalBackground.style.display = 'none';
  }
} // enable sortable functionality for new created column


function createNewSortable() {
  var newCard = document.querySelectorAll('.cards');
  newCard = newCard[newCard.length - 1];
  new Sortable(newCard, {
    group: 'nested',
    animation: 200,
    swapThreshold: 0.65,
    ghostClass: 'ghost-card',
    chosenClass: 'chosen-card',
    dragClass: "sortable-drag",
    filter: '.filtered',
    forceFallback: true,
    onEnd: function onEnd(evt) {
      kanban.countCards();
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
} // adding an event listener to bring up the form


newColumn.addEventListener('click', toggleColumnForm); // adding an event listener for submitting the column

var columnCancelButton = document.getElementById('add-column-cancel');
var columnCloseButton = columnCancelButton.nextElementSibling; // closing the column without saving

columnCancelButton.addEventListener('click', function () {
  toggleColumnForm();
});
columnCloseButton.addEventListener('click', function () {
  toggleColumnForm();
}); // submitting column

var columnSubmitButton = document.getElementById('add-column-submit');
var validateText = addColumnForm.querySelector('.validate-message');
columnSubmitButton.addEventListener('click', function (event) {
  event.preventDefault();
  var id = Date.now();
  var name = addColumnForm.querySelector('input'); // if there isn't a name for the column, don't submit the form. ask user to input

  if (name.value == '') {
    validateText.innerHTML = 'Please enter a name for this column.';
    name.setAttribute('required', 'true');
  } else {
    // create a column
    var col = new _column.default(id, name.value);
    col.createColumn(); // reset statuses

    enableButtons();
    updateColumnNames();
    toggleColumnForm();
    createNewSortable();
    columnEditDeleteFunctionality();
  }
}); // //////////// COLUMN DELETE and EDIT BUTTONS

var columnDeleteToolTip = document.querySelector('div.tooltip#delete');
var columnEditToolTip = document.querySelector('div.tooltip#edit'); // for all the columns

function columnEditDeleteFunctionality() {
  var columnTitles = document.querySelectorAll('div.title');
  columnTitles.forEach(function (columnTitle) {
    var editColumnButton = columnTitle.querySelector('svg.edit-column');
    var deleteColumnButton = columnTitle.querySelector('svg.delete-column');
    var columnNameInput = columnTitle.querySelector('input.column-name'); // focus when clicked

    editColumnButton.addEventListener('click', function () {
      columnNameInput.focus();
    }); // on change, reupdate all column names

    columnNameInput.addEventListener('change', function (event) {
      updateColumnNames();
    }); // 'save' column name

    columnNameInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        columnNameInput.blur();
      }

      updateColumnNames();
    }); // tooltip on hover

    editColumnButton.addEventListener('mouseover', function () {
      editColumnButton.parentElement.appendChild(columnEditToolTip);
    }); // delete columns as long as there are more than 3 and there are no cards within it

    deleteColumnButton.addEventListener('click', function () {
      var columns = document.getElementsByClassName('column');
      var column = columnTitle.parentElement;
      var cards = column.querySelectorAll('.card');

      if (columns.length > 3 && cards.length == 0) {
        column.remove();
        updateColumnNames();
      } // updating the 'disabled' visual of each delete icon


      var allDeleteColumnButtons = document.querySelectorAll('svg.delete-column');
      allDeleteColumnButtons.forEach(function (button) {
        var columns = document.getElementsByClassName('column');
        var column = button.parentElement.parentElement;
        var cards = column.querySelectorAll('.card'); //if there are cards inside the column, or there are only 3 columns, delete is disabled. 

        if (columns.length > 3 && cards.length == 0) {
          button.classList.remove('disabled');
        } else if (columns.length <= 3 || cards.length > 0) {
          button.classList.add('disabled');
        }
      });
    }); // updating 'disabled' status for icons on hover

    deleteColumnButton.addEventListener('mouseover', function () {
      var columns = document.getElementsByClassName('column');
      var column = columnTitle.parentElement;
      var cards = column.querySelectorAll('.card');
      deleteColumnButton.parentElement.appendChild(columnDeleteToolTip);

      if (columns.length > 3 && cards.length == 0) {
        deleteColumnButton.classList.remove('disabled');
      } else if (columns.length <= 3 || cards.length > 0) {
        deleteColumnButton.classList.add('disabled');
      }
    });
  });
}

columnEditDeleteFunctionality();
},{"./column":"js/column.js","./kanban":"js/kanban.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64417" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/column-form.js"], null)
//# sourceMappingURL=/column-form.81f2e434.js.map