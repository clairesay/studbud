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
})({"js/group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Group = /*#__PURE__*/function () {
  function Group(id, name) {
    _classCallCheck(this, Group);

    this.id = id;
    this.name = name;
  }

  _createClass(Group, [{
    key: "createGroup",
    value: function createGroup() {
      // creating the group
      var group = document.querySelector('div.group');
      group = group.cloneNode(true);
      group.style.display = 'flex'; // setting the relevant name, link values and edit and delete buttons

      var groupName = group.querySelector('input.group-name'),
          groupLink = group.querySelector('h3.open-link'),
          editButton = group.querySelector('svg.edit-group'),
          deleteButton = group.querySelector('svg.delete-group'); // setting attributes

      groupName.value = this.name;
      groupName.removeAttribute('disabled');
      groupLink.setAttribute('listener', 'false');
      editButton.classList.remove('first');
      deleteButton.classList.remove('first'); // removing any tiles that might have duplicated over

      var tiles = group.querySelectorAll('.tiles > *');
      tiles.forEach(function (tile) {
        tile.remove();
      }); // append the group to the content tab

      var content = document.getElementById('content');
      content.appendChild(group); // smooth scroll to the new column

      group.scrollTo({
        top: content.clientHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }]);

  return Group;
}();

var _default = Group;
exports.default = _default;
},{}],"js/resource.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countTiles = countTiles;
exports.openGroupLinks = openGroupLinks;

// counts how many tiles there are in total, and within a group
function countTiles() {
  var groups = document.querySelectorAll('.group'),
      total = document.querySelectorAll('.open-link'),
      tileContainers = document.querySelectorAll('.tiles'),
      tiles = document.querySelectorAll('.tile'),
      openLinkSVG = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z\" fill=\"#909090\"/>\n        </svg>"; // writing the total number of cards at the head of each column
  // counts how many resource cards there are in each list

  total.forEach(function count(object, index) {
    var tileCount = 0; // iterates through each list of tiles, to add to tileCount

    for (var i = 0; i < tileContainers[index].querySelectorAll('.tile').length; i++) {
      if (tileContainers[index].querySelectorAll('.tile')[i].classList.length == 1) {
        tileCount += 1;
      }
    } // if the tilecount is empty, there are no links to open in that group


    if (tileCount == 0) {
      total[index].innerHTML = '0 links' + openLinkSVG;
      total[index].classList.add('link-absent'); // otherwise, enable group link opening with relevant CTA
    } else if (tileCount == 1) {
      total[index].innerHTML = 'Open ' + tileCount + ' link' + openLinkSVG;
      total[index].classList.remove('link-absent');
    } else {
      total[index].innerHTML = 'Open ' + tileCount + ' links' + openLinkSVG;
      total[index].classList.remove('link-absent');
    }
  }); // show or hide the empty state message pending if there are tiles or not.

  var emptyStateMessage = document.getElementById('empty-state-content');

  if (tiles.length == 0) {
    tileContainers[0].appendChild(emptyStateMessage);
    emptyStateMessage.style.display = 'flex';
  } else {
    emptyStateMessage.style.display = 'none';
  } // show or hide ungrouped if there are none in it


  if (tiles.length > 0 && groups[0].querySelectorAll('.tile').length == 0) {
    groups[0].style.display = 'none';
  } else {
    groups[0].style.display = 'flex';
  }
} // open all links within a group


function openGroupLinks() {
  var groupLinks = document.querySelectorAll('h3.open-link'); // for each group link

  groupLinks.forEach(function (groupLink) {
    if (groupLink.getAttribute('listener') != 'true') {
      // add an event listener so that on click, it opens up all links in child element
      groupLink.addEventListener('click', function () {
        var links = groupLink.parentElement.parentElement.querySelectorAll('a.external-link');
        links.forEach(function (link) {
          var url = link.getAttribute('href'); // opens url in a new tab

          window.open(url);
        });
      });
      groupLink.setAttribute('listener', 'true');
    }
  });
}

openGroupLinks();
},{}],"js/group-form.js":[function(require,module,exports) {
"use strict";

var _group = _interopRequireDefault(require("./group"));

var resource = _interopRequireWildcard(require("./resource"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// begin by updating how many tiles there are in the groups
resource.countTiles(); // selecting some DOM elements

var createContentForm = document.getElementById('create-content-form');
var modalBackground = document.getElementById('modal-background');
var addGroupForm = document.getElementById('add-group-form');
var newGroupToggle = false;
var newGroup = document.getElementById('new-group'); // updating the group names that a card can be organised in, if any change happens to the group names

function updateGroupNames() {
  var groupNames = document.querySelectorAll('.group-name');
  var groups = createContentForm.querySelector('select[name=group]');
  groups.innerHTML = ''; // for all of the group names, we'll want to update the select options

  groupNames.forEach(function (object) {
    var newOption = document.createElement('option');
    newOption.textContent = object.value;
    newOption.value = object.value;
    groups.appendChild(newOption);
  });
}

updateGroupNames(); // opening/closing the 'add a new group' form

function toggleGroupForm() {
  // resetting any validation errors
  validateText.innerHTML = '';
  var name = addGroupForm.querySelector('input');
  name.removeAttribute('required'); // open or close the group form

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
} // adding an event listener to bring up the form


newGroup.addEventListener('click', toggleGroupForm); // adding event listeners to close the form without saving any input

var groupCancelButton = document.getElementById('add-group-cancel');
var groupCloseButton = groupCancelButton.nextElementSibling;
groupCancelButton.addEventListener('click', function () {
  toggleGroupForm();
});
groupCloseButton.addEventListener('click', function () {
  toggleGroupForm();
}); // adding an event listener for submitting the column

var groupSubmitButton = document.getElementById('add-group-submit');
var validateText = addGroupForm.querySelector('.validate-message');
groupSubmitButton.addEventListener('click', function (event) {
  event.preventDefault(); // setting an id and name

  var id = Date.now();
  var name = addGroupForm.querySelector('input'); // if the user hasn't inputted anything, disallow form submission

  if (name.value == '') {
    validateText.innerHTML = 'Please enter a name for this group.';
    name.setAttribute('required', 'true');
  } else {
    // create new object in group class
    var group = new _group.default(id, name.value);
    group.createGroup(); // reset states

    toggleGroupForm();
    updateGroupNames();
    resource.openGroupLinks();
    resource.countTiles();
    groupEditDeleteFunctionality();
  }
}); // allow for each group's edit and delete functionality

function groupEditDeleteFunctionality() {
  var groupTitles = document.querySelectorAll('div.group-title');
  groupTitles.forEach(function (groupTitle) {
    var editGroupButton = groupTitle.querySelector('svg.edit-group');
    var deleteGroupButton = groupTitle.querySelector('svg.delete-group');
    var groupNameInput = groupTitle.querySelector('input.group-name'); // focus when clicked

    editGroupButton.addEventListener('click', function () {
      groupNameInput.focus();
    }); // on change, reupdate all group names

    groupNameInput.addEventListener('change', function (event) {
      updateGroupNames();
    }); // 'save' column name

    groupNameInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        groupNameInput.blur();
      }

      updateGroupNames();
    }); // tooltip on hover

    editGroupButton.addEventListener('mouseover', function () {
      var groupEditToolTip = document.querySelector('div.tooltip#edit-group');

      if (groupEditToolTip === null) {
        var newToolTip = document.createElement('div');
        newToolTip.setAttribute('id', 'edit-group');
        newToolTip.classList.add('tooltip');
        newToolTip.textContent = 'Rename group';
        editGroupButton.parentElement.appendChild(newToolTip);
      } else {
        editGroupButton.parentElement.appendChild(groupEditToolTip);
      }
    }); // delete groups as long as there is more than 1 and there are no cards within it

    deleteGroupButton.addEventListener('click', function () {
      var groups = document.getElementsByClassName('group');
      var group = groupTitle.parentElement;
      var tiles = group.querySelectorAll('.tile');

      if (groups.length > 1 && tiles.length == 0) {
        group.remove();
        updateGroupNames();
      }
    }); // on hover, appending the right tooltip to the 'delete' button

    deleteGroupButton.addEventListener('mouseover', function () {
      var groups = document.getElementsByClassName('group');
      var group = groupTitle.parentElement;
      var tiles = group.querySelectorAll('.tile');
      var groupDeleteToolTip = document.querySelector('div.tooltip#delete-group');

      if (groupDeleteToolTip === null) {
        var newToolTip = document.createElement('div');
        newToolTip.setAttribute('id', 'delete-group');
        newToolTip.classList.add('tooltip');
        newToolTip.textContent = 'Delete group';
        deleteGroupButton.parentElement.appendChild(newToolTip);
      } else {
        deleteGroupButton.parentElement.appendChild(groupDeleteToolTip);
      } // checking for the need to enable or disable buttons


      if (groups.length > 1 && tiles.length == 0) {
        deleteGroupButton.classList.remove('disabled');
      } else if (groups.length <= 1 || tiles.length > 0) {
        deleteGroupButton.classList.add('disabled');
      }
    });
  });
} // ////// ON LOAD
// import Content from './content'
// import Group from './group'
// import Task from './task'
// import Column from './column'
// If there are items in local storage - create groups create columns
// create card for each task in column
// create tile for each content in group
// window.addEventListener('load', function() {
//     if (localStorage.getItem('groupList') != null) {
//         let groups = JSON.parse(localStorage.getItem('groupList'));
//         groups.forEach(function(group) {
//             let newGroup = new Group(group.id, group.name)
//             newGroup.createGroup()
//             newGroup.addGroup()
//             updateGroupNames()
//             resource.openGroupLinks()
//             resource.resource()
//             groupEditDeleteFunctionality()
//         })
//     }
// })
},{"./group":"js/group.js","./resource":"js/resource.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50303" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/group-form.js"], null)
//# sourceMappingURL=/group-form.1dc0ff30.js.map