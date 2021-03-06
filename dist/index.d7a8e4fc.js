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
})({"1fLfW":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "3223197b2865936fe4b1ea28d7a8e4fc";
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

},{}],"4vhJW":[function(require,module,exports) {
var _column = require('./column');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _columnDefault = _parcelHelpers.interopDefault(_column);
var _kanban = require('./kanban');
const createTaskForm = document.getElementById('create-task-form');
// updates all column names after any change/renaming is done
function updateColumnNames() {
  let columnNames = document.querySelectorAll('.column-name');
  // reset the form statuses for the create task form
  let statuses = createTaskForm.querySelector('select[name=status]');
  statuses.innerHTML = '';
  // apply all the new column names
  columnNames.forEach(function (object) {
    let newOption = document.createElement('option');
    newOption.textContent = object.value;
    newOption.value = object.value;
    statuses.appendChild(newOption);
  });
}
updateColumnNames();
const modalBackground = document.getElementById('modal-background');
const addColumnForm = document.getElementById('add-column-form');
var newColumnToggle = false;
const newColumn = document.getElementById('new-column');
// toggle the column form to either show or hide
function toggleColumnForm() {
  // reset the validation required messages
  validateText.innerHTML = '';
  let name = addColumnForm.querySelector('input');
  name.removeAttribute('required');
  // toggle the column form to show/hide
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
}
// enable sortable functionality for new created column
function createNewSortable() {
  let newCard = document.querySelectorAll('.cards');
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
    onEnd: function (evt) {
      _kanban.countCards();
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
// adding an event listener to bring up the form
newColumn.addEventListener('click', toggleColumnForm);
// adding an event listener for submitting the column
const columnCancelButton = document.getElementById('add-column-cancel');
const columnCloseButton = columnCancelButton.nextElementSibling;
// closing the column without saving
columnCancelButton.addEventListener('click', function () {
  toggleColumnForm();
});
columnCloseButton.addEventListener('click', function () {
  toggleColumnForm();
});
// submitting column
const columnSubmitButton = document.getElementById('add-column-submit');
var validateText = addColumnForm.querySelector('.validate-message');
columnSubmitButton.addEventListener('click', function (event) {
  event.preventDefault();
  let id = Date.now();
  let name = addColumnForm.querySelector('input');
  // if there isn't a name for the column, don't submit the form. ask user to input
  if (name.value == '') {
    validateText.innerHTML = 'Please enter a name for this column.';
    name.setAttribute('required', 'true');
  } else {
    // create a column
    let col = new _columnDefault.default(id, name.value);
    col.createColumn();
    // reset statuses
    enableButtons();
    updateColumnNames();
    toggleColumnForm();
    createNewSortable();
    columnEditDeleteFunctionality();
  }
});
// //////////// COLUMN DELETE and EDIT BUTTONS
const columnDeleteToolTip = document.querySelector('div.tooltip#delete');
const columnEditToolTip = document.querySelector('div.tooltip#edit');
// for all the columns
function columnEditDeleteFunctionality() {
  const columnTitles = document.querySelectorAll('div.title');
  columnTitles.forEach(function (columnTitle) {
    let editColumnButton = columnTitle.querySelector('svg.edit-column');
    let deleteColumnButton = columnTitle.querySelector('svg.delete-column');
    let columnNameInput = columnTitle.querySelector('input.column-name');
    // focus when clicked
    editColumnButton.addEventListener('click', function () {
      columnNameInput.focus();
    });
    // on change, reupdate all column names
    columnNameInput.addEventListener('change', function (event) {
      updateColumnNames();
    });
    // 'save' column name
    columnNameInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        columnNameInput.blur();
      }
      updateColumnNames();
    });
    // tooltip on hover
    editColumnButton.addEventListener('mouseover', function () {
      editColumnButton.parentElement.appendChild(columnEditToolTip);
    });
    // delete columns as long as there are more than 3 and there are no cards within it
    deleteColumnButton.addEventListener('click', function () {
      let columns = document.getElementsByClassName('column');
      let column = columnTitle.parentElement;
      let cards = column.querySelectorAll('.card');
      if (columns.length > 3 && cards.length == 0) {
        column.remove();
        updateColumnNames();
      }
      // updating the 'disabled' visual of each delete icon
      let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column');
      allDeleteColumnButtons.forEach(function (button) {
        let columns = document.getElementsByClassName('column');
        let column = button.parentElement.parentElement;
        let cards = column.querySelectorAll('.card');
        // if there are cards inside the column, or there are only 3 columns, delete is disabled.
        if (columns.length > 3 && cards.length == 0) {
          button.classList.remove('disabled');
        } else if (columns.length <= 3 || cards.length > 0) {
          button.classList.add('disabled');
        }
      });
    });
    // updating 'disabled' status for icons on hover
    deleteColumnButton.addEventListener('mouseover', function () {
      let columns = document.getElementsByClassName('column');
      let column = columnTitle.parentElement;
      let cards = column.querySelectorAll('.card');
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

},{"./column":"4Vh9G","./kanban":"3b9tq","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4Vh9G":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class Column {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  createColumn() {
    // duplicating existing columns and tweaking some elements to make it unique
    let column = document.querySelector('div.column');
    column = column.cloneNode(true);
    let columnName = column.querySelector('input.column-name');
    columnName.value = this.name;
    let editButton = column.querySelector('svg.edit-column');
    let deleteButton = column.querySelector('svg.delete-column');
    let total = column.querySelector('h3.total');
    total.textContent = 0;
    // remove any existing cards inside the column
    let cards = column.querySelectorAll('.cards > *');
    cards.forEach(function (card) {
      card.remove();
    });
    // appending to the tasks container
    let tasks = document.getElementById('tasks');
    tasks.appendChild(column);
    // adding the final padding
    tasks.appendChild(document.querySelector('#tasks div.padding'));
    // smooth scroll to the new column
    tasks.scrollTo({
      top: 0,
      left: tasks.clientWidth,
      behavior: 'smooth'
    });
  }
}
exports.default = Column;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["1fLfW","4vhJW"], "4vhJW", "parcelRequirec526")

//# sourceMappingURL=index.d7a8e4fc.js.map
