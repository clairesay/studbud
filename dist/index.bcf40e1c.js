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
})({"1iDMg":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "775dd3375d988df772d37b46bcf40e1c";
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

},{}],"4d4Rm":[function(require,module,exports) {
var _group = require('./group');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _groupDefault = _parcelHelpers.interopDefault(_group);
var _resource = require('./resource');
// begin by updating how many tiles there are in the groups
_resource.countTiles();
// selecting some DOM elements
const createContentForm = document.getElementById('create-content-form');
const modalBackground = document.getElementById('modal-background');
const addGroupForm = document.getElementById('add-group-form');
var newGroupToggle = false;
const newGroup = document.getElementById('new-group');
// updating the group names that a card can be organised in, if any change happens to the group names
function updateGroupNames() {
  let groupNames = document.querySelectorAll('.group-name');
  let groups = createContentForm.querySelector('select[name=group]');
  groups.innerHTML = '';
  // for all of the group names, we'll want to update the select options
  groupNames.forEach(function (object) {
    let newOption = document.createElement('option');
    newOption.textContent = object.value;
    newOption.value = object.value;
    groups.appendChild(newOption);
  });
}
updateGroupNames();
// opening/closing the 'add a new group' form
function toggleGroupForm() {
  // resetting any validation errors
  validateText.innerHTML = '';
  let name = addGroupForm.querySelector('input');
  name.removeAttribute('required');
  // open or close the group form
  if (newGroupToggle == false) {
    addGroupForm.classList.add('active');
    newGroupToggle = true;
    modalBackground.style.display = 'flex';
  } else if (newGroupToggle == true) {
    addGroupForm.classList.remove('active');
    addGroupForm.reset();
    newGroupToggle = false;
    modalBackground.style.display = 'none';
  }
}
// adding an event listener to bring up the form
newGroup.addEventListener('click', toggleGroupForm);
// adding event listeners to close the form without saving any input
const groupCancelButton = document.getElementById('add-group-cancel');
const groupCloseButton = groupCancelButton.nextElementSibling;
groupCancelButton.addEventListener('click', function () {
  toggleGroupForm();
});
groupCloseButton.addEventListener('click', function () {
  toggleGroupForm();
});
// adding an event listener for submitting the column
const groupSubmitButton = document.getElementById('add-group-submit');
var validateText = addGroupForm.querySelector('.validate-message');
groupSubmitButton.addEventListener('click', function (event) {
  event.preventDefault();
  // setting an id and name
  let id = Date.now();
  let name = addGroupForm.querySelector('input');
  // if the user hasn't inputted anything, disallow form submission
  if (name.value == '') {
    validateText.innerHTML = 'Please enter a name for this group.';
    name.setAttribute('required', 'true');
  } else {
    // create new object in group class
    let group = new _groupDefault.default(id, name.value);
    group.createGroup();
    // reset states
    toggleGroupForm();
    updateGroupNames();
    _resource.openGroupLinks();
    _resource.countTiles();
    groupEditDeleteFunctionality();
  }
});
// allow for each group's edit and delete functionality
function groupEditDeleteFunctionality() {
  const groupTitles = document.querySelectorAll('div.group-title');
  groupTitles.forEach(function (groupTitle) {
    let editGroupButton = groupTitle.querySelector('svg.edit-group');
    let deleteGroupButton = groupTitle.querySelector('svg.delete-group');
    let groupNameInput = groupTitle.querySelector('input.group-name');
    // focus when clicked
    editGroupButton.addEventListener('click', function () {
      groupNameInput.focus();
    });
    // on change, reupdate all group names
    groupNameInput.addEventListener('change', function (event) {
      updateGroupNames();
    });
    // 'save' column name
    groupNameInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        groupNameInput.blur();
      }
      updateGroupNames();
    });
    // tooltip on hover
    editGroupButton.addEventListener('mouseover', function () {
      let groupEditToolTip = document.querySelector('div.tooltip#edit-group');
      if (groupEditToolTip === null) {
        let newToolTip = document.createElement('div');
        newToolTip.setAttribute('id', 'edit-group');
        newToolTip.classList.add('tooltip');
        newToolTip.textContent = 'Rename group';
        editGroupButton.parentElement.appendChild(newToolTip);
      } else {
        editGroupButton.parentElement.appendChild(groupEditToolTip);
      }
    });
    // delete groups as long as there is more than 1 and there are no cards within it
    deleteGroupButton.addEventListener('click', function () {
      let groups = document.getElementsByClassName('group');
      let group = groupTitle.parentElement;
      let tiles = group.querySelectorAll('.tile');
      if (groups.length > 1 && tiles.length == 0) {
        group.remove();
        updateGroupNames();
      }
    });
    // on hover, appending the right tooltip to the 'delete' button
    deleteGroupButton.addEventListener('mouseover', function () {
      let groups = document.getElementsByClassName('group');
      let group = groupTitle.parentElement;
      let tiles = group.querySelectorAll('.tile');
      let groupDeleteToolTip = document.querySelector('div.tooltip#delete-group');
      if (groupDeleteToolTip === null) {
        let newToolTip = document.createElement('div');
        newToolTip.setAttribute('id', 'delete-group');
        newToolTip.classList.add('tooltip');
        newToolTip.textContent = 'Delete group';
        deleteGroupButton.parentElement.appendChild(newToolTip);
      } else {
        deleteGroupButton.parentElement.appendChild(groupDeleteToolTip);
      }
      // checking for the need to enable or disable buttons
      if (groups.length > 1 && tiles.length == 0) {
        deleteGroupButton.classList.remove('disabled');
      } else if (groups.length <= 1 || tiles.length > 0) {
        deleteGroupButton.classList.add('disabled');
      }
    });
  });
}

},{"./group":"271l5","./resource":"5g5MX","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"271l5":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class Group {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  createGroup() {
    // creating the group
    let group = document.querySelector('div.group');
    group = group.cloneNode(true);
    group.style.display = 'flex';
    // setting the relevant name, link values and edit and delete buttons
    let groupName = group.querySelector('input.group-name'), groupLink = group.querySelector('h3.open-link'), editButton = group.querySelector('svg.edit-group'), deleteButton = group.querySelector('svg.delete-group');
    // setting attributes
    groupName.value = this.name;
    groupName.removeAttribute('disabled');
    groupLink.setAttribute('listener', 'false');
    editButton.classList.remove('first');
    deleteButton.classList.remove('first');
    // removing any tiles that might have duplicated over
    let tiles = group.querySelectorAll('.tiles > *');
    tiles.forEach(function (tile) {
      tile.remove();
    });
    // append the group to the content tab
    let content = document.getElementById('content');
    content.appendChild(group);
    // smooth scroll to the new column
    group.scrollTo({
      top: content.clientHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
exports.default = Group;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["1iDMg","4d4Rm"], "4d4Rm", "parcelRequirec526")

//# sourceMappingURL=index.bcf40e1c.js.map
