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
})({"js/content.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Content = /*#__PURE__*/function () {
  // declare variables
  function Content(id, title, description, link, group, contentList) {
    _classCallCheck(this, Content);

    this.id = id;
    this.title = title;
    this.description = description;
    this.group = group;
    this.link = link;
    this.contentList = contentList;
  } // add content to array


  _createClass(Content, [{
    key: "addContent",
    value: function addContent() {
      this.contentList.push(this);
      return this.id;
    } // create new card with relevant elements

  }, {
    key: "createCard",
    value: function createCard() {
      var groupNames = document.querySelectorAll('.group-name');
      var cards = document.querySelectorAll('.tiles'),
          card = document.createElement('article'),
          title = document.createElement('h3'),
          descriptionContainer = document.createElement('pre'),
          description = document.createElement('code'),
          link = document.createElement('a'),
          linkIcon = document.createElement('svg'),
          editIcon = document.createElement('a'),
          line = document.createElement('HR');
      card.setAttribute('id', 'c-' + this.id);
      card.classList.add('tile');
      title.textContent = this.title; // only add the code snippet to the card if there is any user input

      if (this.description.length > 0) {
        description.textContent = this.description;
        descriptionContainer.appendChild(description);
      } // fix links to support validity


      if (this.link.includes('https://') || this.link.includes('http://')) {
        link.textContent = this.link;
        link.setAttribute('href', this.link);
      } else {
        link.textContent = 'https://' + this.link;
        link.setAttribute('href', 'https://' + this.link);
      } // set attribute for 'open in new tab' functionality


      link.classList.add('external-link');
      link.setAttribute('target', '_blank');
      link.appendChild(linkIcon); // add icons

      linkIcon.innerHTML = "<svg width=\"20\" height=\"10\" viewBox=\"0 0 20 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M1.9 5.00003C1.9 3.29003 3.29 1.90003 5 1.90003H9V3.05176e-05H5C2.24 3.05176e-05 0 2.24003 0 5.00003C0 7.76003 2.24 10 5 10H9V8.10003H5C3.29 8.10003 1.9 6.71003 1.9 5.00003ZM6 6.00003H14V4.00003H6V6.00003ZM15 3.05176e-05H11V1.90003H15C16.71 1.90003 18.1 3.29003 18.1 5.00003C18.1 6.71003 16.71 8.10003 15 8.10003H11V10H15C17.76 10 20 7.76003 20 5.00003C20 2.24003 17.76 3.05176e-05 15 3.05176e-05Z\" fill=\"#909090\"/>\n        </svg>";
      editIcon.classList.add('edit-content');
      editIcon.innerHTML = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z\" fill=\"#909090\"/>\n          </svg>"; // append elements to the card

      card.appendChild(title);
      card.appendChild(descriptionContainer);
      card.appendChild(line);
      card.appendChild(link);
      card.appendChild(editIcon); // add card to relevant group, or to 'Ungrouped' as the default

      var currentGroup = this.group;

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
  }]);

  return Content;
}();

var _default = Content;
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
},{}],"js/content-form.js":[function(require,module,exports) {
"use strict";

var _content = _interopRequireDefault(require("./content"));

var resource = _interopRequireWildcard(require("./resource"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declaring relevant variables
var newContent = document.getElementById('new-content');
var createContentForm = document.getElementById('create-content-form');
var overlayToggle = false;
var modalBackground = document.getElementById('modal-background');
newContent.addEventListener('click', function () {
  toggleContentForm();
}); // open content form (may be prepopulated or blank)

function toggleContentForm(type) {
  // reset the validation status of the form
  validateText.innerHTML = '';
  var contentDetails = createContentForm.querySelectorAll('form input');
  contentDetails[0].removeAttribute('required');
  contentDetails[1].removeAttribute('required'); // if updating existing content, set type update

  if (type == 'update') {
    createContentForm.querySelector('h1').textContent = 'Edit existing resource';
    createContentForm.classList.add('update');
  } else {
    createContentForm.querySelector('h1').textContent = 'Add new content';
    createContentForm.classList.remove('update');
  } // show/hide


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
} // adding event listeners to edit buttons on for each resource card


function reupdate() {
  // each card has an edit button that allows users to reaccess and update task details
  var editButtons = document.querySelectorAll('.edit-content');
  editButtons.forEach(function (editButton) {
    // if there hasn't been a listener previously attached, attach one
    if (editButton.getAttribute('listener') !== 'true') {
      editButton.addEventListener('click', addAutoFill);
      editButton.setAttribute('listener', 'true');
    } // autofill existing details into form


    function addAutoFill() {
      autoFillContentDetails(editButton);
    }
  });
} // autofill existing details into form ^^


function autoFillContentDetails(object) {
  // get id of content card
  var objectId = object.parentElement.id;
  objectId = objectId.replace('c-', ''); // for each item, get the value and set to the for inputs

  contentList.forEach(function (content) {
    var thisContent = content; // if we find a match

    if (thisContent.id == objectId) {
      // get all the input values
      var contentDetails = createContentForm.querySelectorAll('form input');
      var codeArea = createContentForm.querySelector('textArea'); //title

      contentDetails[0].value = thisContent.title; //description

      codeArea.value = thisContent.description; //link

      contentDetails[1].value = thisContent.link; //group

      var group = createContentForm.querySelector('select[name=group]');
      group.value = object.parentElement.parentElement.parentElement.querySelector('div.group-title input.group-name').value; // open up the form with updated content

      contentSaveButton.value = thisContent.id;
      toggleContentForm('update');
    }
  });
} // this function resets whether each group is deletable or not, based on whether it is the only group, or whether there are tiles inside it


function enableButtons() {
  var groups = document.getElementsByClassName('group');
  var deleteGroupButtons = document.querySelectorAll('svg.delete-group'); // for each delete group button

  deleteGroupButtons.forEach(function (deleteGroupButton) {
    var tiles = deleteGroupButton.parentElement.parentElement.parentElement.querySelectorAll('.tile'); // set the disabled status

    if (groups.length > 1 && tiles.length == 0) {
      deleteGroupButton.classList.remove('disabled');
    } else if (groups.length <= 1 || tiles.length > 0) {
      deleteGroupButton.classList.add('disabled');
    }
  });
} // array where we store all the content


var contentList = []; // selecting relevant DOM elements

var validateText = createContentForm.querySelector('.validate-message');
var contentSaveButton = document.getElementById('content-save');
var contentCancelButton = document.getElementById('edit-content-cancel');
var contentCloseButton = contentCancelButton.nextElementSibling;
var contentDeleteButton = document.getElementById('edit-content-delete'); // cancel/close without saving - note that resetting the form is still required

contentCancelButton.addEventListener('click', function (event) {
  event.preventDefault();
  toggleContentForm();
  reupdate();
});
contentCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  toggleContentForm();
  reupdate();
}); // delete this card

contentDeleteButton.addEventListener('click', function (event) {
  event.preventDefault();
  var contentID = parseInt(contentSaveButton.value); // iterate to find match in ID and delete its card and its presence in the array

  for (var i = 0; i < contentList.length; i++) {
    var oldContent = contentList[i]; // if we find a match

    if (oldContent.id == contentID) {
      // remove from array
      contentList.splice(contentList.indexOf(oldContent), 1); // remove element

      var oldTile = document.getElementById('c-' + contentID);
      oldTile.remove();
      contentSaveButton.value = '';
    }
  } // reset form status


  toggleContentForm();
  reupdate();
  resource.countTiles();
  enableButtons();
}); // save the content

contentSaveButton.addEventListener('click', function (event) {
  event.preventDefault();
  var contentDetails, content, contentID, contentTitle, contentDescription, contentLink, contentGroup; // extract values from input form

  contentDetails = createContentForm.querySelectorAll('form input'); //  title

  contentTitle = contentDetails[0].value; //  code snippet

  var codeArea = createContentForm.querySelector('textarea');
  contentDescription = codeArea.value; //  link

  contentLink = contentDetails[1].value; //  group

  var groups = createContentForm.querySelector('select[name=group]');
  contentGroup = groups.value; //  for resource to be saved, user must have inputted a title and a link, because this is a resource library

  if (contentTitle == "" || contentLink == "") {
    contentDetails[0].setAttribute('required', 'true');
    contentDetails[1].setAttribute('required', 'true');
    validateText.innerHTML = 'Please enter a title and a resource link to save this content.';
  } else {
    // if updating the card, look for content with same id value and replace it
    if (createContentForm.classList.contains('update')) {
      contentID = parseInt(contentSaveButton.value);

      for (var i = 0; i < contentList.length; i++) {
        var oldContent = contentList[i];

        if (oldContent.id == contentID) {
          contentList.splice(contentList.indexOf(oldContent), 1);
          var oldTile = document.getElementById('c-' + contentID);
          oldTile.remove();
          contentSaveButton.value = '';
        }
      } // otherwise, generate one

    } else {
      contentID = Date.now();
    } // create new object in class


    content = new _content.default(contentID, contentTitle, contentDescription, contentLink, contentGroup, contentList); // create DOM and also save to list

    content.createCard(content.addContent()); // update tile count and group links

    toggleContentForm();
    resource.countTiles();
    resource.openGroupLinks();
    reupdate();
    enableButtons();
  }
}); // if the user decides to create a new card through the empty state CTA, emulate what would happen with the create task button

var emptyStateButton = document.querySelector('#empty-state-content button');
emptyStateButton.addEventListener('click', function () {
  if (deviceSize != 'desktop') {
    // counter click for the 'buttons container dropdown'
    document.querySelector('#content-buttons button.icon').click();
  }

  newContent.click();
}); // if user pastes code content into the content cards
// https://stackoverflow.com/questions/12027137/javascript-trick-for-paste-as-plain-text-in-execcommand

document.querySelector('[contenteditable]').addEventListener('paste', function (event) {
  event.preventDefault();
  document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});
},{"./content":"js/content.js","./resource":"js/resource.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/content-form.js"], null)
//# sourceMappingURL=/content-form.9e7e7ba9.js.map