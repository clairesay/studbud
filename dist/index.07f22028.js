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
})({"7BtEn":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "3cbe52486674d16d12063f4807f22028";
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

},{}],"2SnbP":[function(require,module,exports) {
var _content = require('./content');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _contentDefault = _parcelHelpers.interopDefault(_content);
var _resource = require('./resource');
// declaring relevant variables
const newContent = document.getElementById('new-content');
const createContentForm = document.getElementById('create-content-form');
var overlayToggle = false;
const modalBackground = document.getElementById('modal-background');
newContent.addEventListener('click', function () {
  toggleContentForm();
});
// open content form (may be prepopulated or blank)
function toggleContentForm(type) {
  // reset the validation status of the form
  validateText.innerHTML = '';
  let contentDetails = createContentForm.querySelectorAll('form input');
  contentDetails[0].removeAttribute('required');
  contentDetails[1].removeAttribute('required');
  // if updating existing content, set type update
  if (type == 'update') {
    createContentForm.querySelector('h1').textContent = 'Edit existing resource';
    createContentForm.classList.add('update');
  } else {
    createContentForm.querySelector('h1').textContent = 'Add new content';
    createContentForm.classList.remove('update');
  }
  // show/hide
  if (overlayToggle == false) {
    createContentForm.classList.add('active');
    overlayToggle = true;
    modalBackground.style.display = 'flex';
  } else if (overlayToggle == true) {
    createContentForm.classList.remove('active');
    createContentForm.reset();
    overlayToggle = false;
    modalBackground.style.display = 'none';
    contentSaveButton.value = '';
  }
}
// adding event listeners to edit buttons on for each resource card
function reupdate() {
  // each card has an edit button that allows users to reaccess and update task details
  let editButtons = document.querySelectorAll('.edit-content');
  editButtons.forEach(function (editButton) {
    // if there hasn't been a listener previously attached, attach one
    if (editButton.getAttribute('listener') !== 'true') {
      editButton.addEventListener('click', addAutoFill);
      editButton.setAttribute('listener', 'true');
    }
    // autofill existing details into form
    function addAutoFill() {
      autoFillContentDetails(editButton);
    }
  });
}
// autofill existing details into form ^^
function autoFillContentDetails(object) {
  // get id of content card
  let objectId = object.parentElement.id;
  objectId = objectId.replace('c-', '');
  // for each item, get the value and set to the for inputs
  contentList.forEach(function (content) {
    let thisContent = content;
    // if we find a match
    if (thisContent.id == objectId) {
      // get all the input values
      let contentDetails = createContentForm.querySelectorAll('form input');
      let codeArea = createContentForm.querySelector('textArea');
      // title
      contentDetails[0].value = thisContent.title;
      // description
      codeArea.value = thisContent.description;
      // link
      contentDetails[1].value = thisContent.link;
      // group
      let group = createContentForm.querySelector('select[name=group]');
      group.value = object.parentElement.parentElement.parentElement.querySelector('div.group-title input.group-name').value;
      // open up the form with updated content
      contentSaveButton.value = thisContent.id;
      toggleContentForm('update');
    }
  });
}
// this function resets whether each group is deletable or not, based on whether it is the only group, or whether there are tiles inside it
function enableButtons() {
  let groups = document.getElementsByClassName('group');
  let deleteGroupButtons = document.querySelectorAll('svg.delete-group');
  // for each delete group button
  deleteGroupButtons.forEach(function (deleteGroupButton) {
    let tiles = deleteGroupButton.parentElement.parentElement.parentElement.querySelectorAll('.tile');
    // set the disabled status
    if (groups.length > 1 && tiles.length == 0) {
      deleteGroupButton.classList.remove('disabled');
    } else if (groups.length <= 1 || tiles.length > 0) {
      deleteGroupButton.classList.add('disabled');
    }
  });
}
// array where we store all the content
var contentList = [];
// selecting relevant DOM elements
var validateText = createContentForm.querySelector('.validate-message');
const contentSaveButton = document.getElementById('content-save');
const contentCancelButton = document.getElementById('edit-content-cancel');
const contentCloseButton = contentCancelButton.nextElementSibling;
const contentDeleteButton = document.getElementById('edit-content-delete');
// cancel/close without saving - note that resetting the form is still required
contentCancelButton.addEventListener('click', function (event) {
  event.preventDefault();
  toggleContentForm();
  reupdate();
});
contentCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  toggleContentForm();
  reupdate();
});
// delete this card
contentDeleteButton.addEventListener('click', function (event) {
  event.preventDefault();
  let contentID = parseInt(contentSaveButton.value);
  // iterate to find match in ID and delete its card and its presence in the array
  for (let i = 0; i < contentList.length; i++) {
    var oldContent = contentList[i];
    // if we find a match
    if (oldContent.id == contentID) {
      // remove from array
      contentList.splice(contentList.indexOf(oldContent), 1);
      // remove element
      let oldTile = document.getElementById('c-' + contentID);
      oldTile.remove();
      contentSaveButton.value = '';
    }
  }
  // reset form status
  toggleContentForm();
  reupdate();
  _resource.countTiles();
  enableButtons();
});
// save the content
contentSaveButton.addEventListener('click', function (event) {
  event.preventDefault();
  let contentDetails, content, contentID, contentTitle, contentDescription, contentLink, contentGroup;
  // extract values from input form
  contentDetails = createContentForm.querySelectorAll('form input');
  // title
  contentTitle = contentDetails[0].value;
  // code snippet
  let codeArea = createContentForm.querySelector('textarea');
  contentDescription = codeArea.value;
  // link
  contentLink = contentDetails[1].value;
  // group
  let groups = createContentForm.querySelector('select[name=group]');
  contentGroup = groups.value;
  // for resource to be saved, user must have inputted a title and a link, because this is a resource library
  if (contentTitle == "" || contentLink == "") {
    contentDetails[0].setAttribute('required', 'true');
    contentDetails[1].setAttribute('required', 'true');
    validateText.innerHTML = 'Please enter a title and a resource link to save this content.';
  } else {
    // if updating the card, look for content with same id value and replace it
    if (createContentForm.classList.contains('update')) {
      contentID = parseInt(contentSaveButton.value);
      for (let i = 0; i < contentList.length; i++) {
        var oldContent = contentList[i];
        if (oldContent.id == contentID) {
          contentList.splice(contentList.indexOf(oldContent), 1);
          let oldTile = document.getElementById('c-' + contentID);
          oldTile.remove();
          contentSaveButton.value = '';
        }
      }
    } else {
      contentID = Date.now();
    }
    // create new object in class
    content = new _contentDefault.default(contentID, contentTitle, contentDescription, contentLink, contentGroup, contentList);
    // create DOM and also save to list
    content.createCard(content.addContent());
    // update tile count and group links
    toggleContentForm();
    _resource.countTiles();
    _resource.openGroupLinks();
    reupdate();
    enableButtons();
  }
});
// if the user decides to create a new card through the empty state CTA, emulate what would happen with the create task button
var emptyStateButton = document.querySelector('#empty-state-content button');
emptyStateButton.addEventListener('click', function () {
  if (deviceSize != 'desktop') {
    // counter click for the 'buttons container dropdown'
    document.querySelector('#content-buttons button.icon').click();
  }
  newContent.click();
});
// if user pastes code content into the content cards
// https://stackoverflow.com/questions/12027137/javascript-trick-for-paste-as-plain-text-in-execcommand
document.querySelector('[contenteditable]').addEventListener('paste', function (event) {
  event.preventDefault();
  document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});

},{"./content":"7gsTB","./resource":"5g5MX","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7gsTB":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class Content {
  // declare variables
  constructor(id, title, description, link, group, contentList) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.group = group;
    this.link = link;
    this.contentList = contentList;
  }
  /*add content to array*/
  addContent() {
    this.contentList.push(this);
    return this.id;
  }
  /*create new card with relevant elements*/
  createCard() {
    let groupNames = document.querySelectorAll('.group-name');
    let cards = document.querySelectorAll('.tiles'), card = document.createElement('article'), title = document.createElement('h3'), descriptionContainer = document.createElement('pre'), description = document.createElement('code'), link = document.createElement('a'), linkIcon = document.createElement('svg'), editIcon = document.createElement('a'), line = document.createElement('HR');
    card.setAttribute('id', 'c-' + this.id);
    card.classList.add('tile');
    title.textContent = this.title;
    // only add the code snippet to the card if there is any user input
    if (this.description.length > 0) {
      description.textContent = this.description;
      descriptionContainer.appendChild(description);
    }
    // fix links to support validity
    if (this.link.includes('https://') || this.link.includes('http://')) {
      link.textContent = this.link;
      link.setAttribute('href', this.link);
    } else {
      link.textContent = 'https://' + this.link;
      link.setAttribute('href', 'https://' + this.link);
    }
    // set attribute for 'open in new tab' functionality
    link.classList.add('external-link');
    link.setAttribute('target', '_blank');
    link.appendChild(linkIcon);
    // add icons
    linkIcon.innerHTML = `<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.9 5.00003C1.9 3.29003 3.29 1.90003 5 1.90003H9V3.05176e-05H5C2.24 3.05176e-05 0 2.24003 0 5.00003C0 7.76003 2.24 10 5 10H9V8.10003H5C3.29 8.10003 1.9 6.71003 1.9 5.00003ZM6 6.00003H14V4.00003H6V6.00003ZM15 3.05176e-05H11V1.90003H15C16.71 1.90003 18.1 3.29003 18.1 5.00003C18.1 6.71003 16.71 8.10003 15 8.10003H11V10H15C17.76 10 20 7.76003 20 5.00003C20 2.24003 17.76 3.05176e-05 15 3.05176e-05Z" fill="#909090"/>
        </svg>`;
    editIcon.classList.add('edit-content');
    editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`;
    // append elements to the card
    card.appendChild(title);
    card.appendChild(descriptionContainer);
    card.appendChild(line);
    card.appendChild(link);
    card.appendChild(editIcon);
    // add card to relevant group, or to 'Ungrouped' as the default
    let currentGroup = this.group;
    if (this.group == 'None') {
      cards[0].appendChild(card);
    } else {
      groupNames.forEach(function setGroup(object, index) {
        if (object.value == currentGroup) {
          cards[index].appendChild(card);
        }
      });
    }
    hljs.highlightAll();
  }
}
exports.default = Content;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5g5MX":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "countTiles", function () {
  return countTiles;
});
_parcelHelpers.export(exports, "openGroupLinks", function () {
  return openGroupLinks;
});
function countTiles() {
  let groups = document.querySelectorAll('.group'), total = document.querySelectorAll('.open-link'), tileContainers = document.querySelectorAll('.tiles'), tiles = document.querySelectorAll('.tile'), openLinkSVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z" fill="#909090"/>
        </svg>`;
  // writing the total number of cards at the head of each column
  // counts how many resource cards there are in each list
  total.forEach(function count(object, index) {
    let tileCount = 0;
    // iterates through each list of tiles, to add to tileCount
    for (let i = 0; i < tileContainers[index].querySelectorAll('.tile').length; i++) {
      if (tileContainers[index].querySelectorAll('.tile')[i].classList.length == 1) {
        tileCount += 1;
      }
    }
    // if the tilecount is empty, there are no links to open in that group
    if (tileCount == 0) {
      total[index].innerHTML = '0 links' + openLinkSVG;
      total[index].classList.add('link-absent');
    } else if (tileCount == 1) {
      total[index].innerHTML = 'Open ' + tileCount + ' link' + openLinkSVG;
      total[index].classList.remove('link-absent');
    } else {
      total[index].innerHTML = 'Open ' + tileCount + ' links' + openLinkSVG;
      total[index].classList.remove('link-absent');
    }
  });
  // show or hide the empty state message pending if there are tiles or not.
  let emptyStateMessage = document.getElementById('empty-state-content');
  if (tiles.length == 0) {
    tileContainers[0].appendChild(emptyStateMessage);
    emptyStateMessage.style.display = 'flex';
  } else {
    emptyStateMessage.style.display = 'none';
  }
  // show or hide ungrouped if there are none in it
  if (tiles.length > 0 && groups[0].querySelectorAll('.tile').length == 0) {
    groups[0].style.display = 'none';
  } else {
    groups[0].style.display = 'flex';
  }
}
function openGroupLinks() {
  let groupLinks = document.querySelectorAll('h3.open-link');
  // for each group link
  groupLinks.forEach(function (groupLink) {
    if (groupLink.getAttribute('listener') != 'true') {
      // add an event listener so that on click, it opens up all links in child element
      groupLink.addEventListener('click', function () {
        let links = groupLink.parentElement.parentElement.querySelectorAll('a.external-link');
        links.forEach(function (link) {
          let url = link.getAttribute('href');
          // opens url in a new tab
          window.open(url);
        });
      });
      groupLink.setAttribute('listener', 'true');
    }
  });
}
openGroupLinks();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["7BtEn","2SnbP"], "2SnbP", "parcelRequirec526")

//# sourceMappingURL=index.07f22028.js.map
