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
})({"main.js":[function(require,module,exports) {
////////// MEDIA QUERIES https://www.w3schools.com/howto/howto_js_media_queries.asp ///////////////
// test for tablet
function mediaQueryTablet(query) {
  if (query.matches) {
    // If media query matches
    deviceSize = 'tablet';
  } else {
    deviceSize = 'desktop';
  }
}

var tablet = window.matchMedia("(max-width: 700px)"); // Call listener function at run time

mediaQueryTablet(tablet); // Attach listener function on state changes

tablet.addEventListener('change', mediaQueryTablet); // test for mobile

function mediaQueryMobile(query) {
  if (query.matches) {
    // If media query matches
    deviceSize = 'mobile';
  }
}

var mobile = window.matchMedia("(max-width: 500px)");
mediaQueryMobile(mobile); // Call listener function at run time

mobile.addEventListener('change', mediaQueryMobile); ////////////// SELECTING MAIN TAB ///////////////////

var main = document.getElementsByTagName('main')[0];
var tasksTab = document.getElementById('tasks-tab');
var contentTab = document.getElementById('content-tab');
var taskCreateButtonsContainer = document.getElementById('task-buttons');
var contentCreateButtonsContainer = document.getElementById('content-buttons');
var taskCreateButtons = document.querySelectorAll('#task-buttons button.create');
var contentCreateButtons = document.querySelectorAll('#content-buttons button.create');
var tasks = document.getElementById('tasks');
var content = document.getElementById('content'); // setting tasks to show when the page is first loaded

displayMain('tasks'); // change tabs according to the user's selection

tasksTab.addEventListener('click', function () {
  displayMain('tasks');
});
contentTab.addEventListener('click', function () {
  displayMain('content');
}); // display the corresponding tab

function displayMain(option) {
  if (option == 'tasks') {
    main.appendChild(document.getElementById('tasks'));
    tasksTab.classList.add('active');
    contentTab.classList.remove('active');
    tasks.style.visibility = 'visible';
    content.style.visibility = 'hidden';
    taskCreateButtonsContainer.style.display = 'flex';
    contentCreateButtonsContainer.style.display = 'none';
  } else if (option == 'content') {
    main.appendChild(document.getElementById('content'));
    tasksTab.classList.remove('active');
    contentTab.classList.add('active');
    tasks.style.visibility = 'hidden';
    content.style.visibility = 'visible';
    taskCreateButtonsContainer.style.display = 'none';
    contentCreateButtonsContainer.style.display = 'flex';
  }
} ////////////// SHOWING/HIDING THE CTA's IN THE TOP RIGHT HAND CORNER


var contentExpandButton = document.querySelector('#content-buttons button.icon'); // this is the (+) button on mobile

var newContent = document.getElementById('new-content');
var newGroup = document.getElementById('new-group');
var taskExpandButton = document.querySelector('#task-buttons button.icon'); // this is the (+) button on mobile

var newTask = document.getElementById('new-task');
var newColumn = document.getElementById('new-column');
var buttonBackground = document.getElementById('button-background');
var contentButtonVisible = false;
var taskButtonVisible = false; // listen for clicking from the content buttons

contentExpandButton.addEventListener('click', contentButtonVisibility);
newContent.addEventListener('click', contentButtonVisibility);
newGroup.addEventListener('click', contentButtonVisibility); // if on mobile, the buttons are open with the overlay, listen for any click to hide those buttons

buttonBackground.addEventListener('click', function () {
  if (contentButtonVisible == true) {
    contentButtonVisibility();
  } else if (taskButtonVisible == true) {
    taskButtonVisibility();
  }
}); // toggles between visibility of content CTA's

function contentButtonVisibility() {
  if (contentButtonVisible == false) {
    newContent.classList.add('active');
    newGroup.classList.add('active');
    contentButtonVisible = true;

    if (deviceSize != 'desktop') {
      buttonBackground.style.display = 'flex';
    }
  } else if (contentButtonVisible == true) {
    newContent.classList.remove('active');
    newGroup.classList.remove('active');
    contentButtonVisible = false;

    if (deviceSize != 'desktop') {
      buttonBackground.style.display = 'none';
    }
  }
} // same premise for the tasks


taskExpandButton.addEventListener('click', taskButtonVisibility);
newTask.addEventListener('click', taskButtonVisibility);
newColumn.addEventListener('click', taskButtonVisibility);

function taskButtonVisibility() {
  if (taskButtonVisible == false) {
    newTask.classList.add('active');
    newColumn.classList.add('active');
    taskButtonVisible = true;

    if (deviceSize != 'desktop') {
      buttonBackground.style.display = 'flex';
    }
  } else if (taskButtonVisible == true) {
    newTask.classList.remove('active');
    newColumn.classList.remove('active');
    taskButtonVisible = false;

    if (deviceSize != 'desktop') {
      buttonBackground.style.display = 'none';
    }
  }
} // TOGGLING BETWEEN LIST AND KANBAN VIEW FOR THE TASK LIST


var listIcon = document.querySelector('.list-icon');
var gridIcon = document.querySelector('.grid-icon');
listIcon.style.display = 'none';
var toggleTaskView = document.querySelector('#tasks-tab a');
var listView = false; // ON TOGGLE BUTTON CLICK

toggleTaskView.addEventListener('click', function () {
  // only allow toggling if the tasks tab is active 
  if (tasksTab.classList.contains('active')) {
    // if currently in list view, switch to grid view, and vice versa
    if (listView) {
      listIcon.style.display = 'none';
      gridIcon.style.display = 'inline';
      tasks.classList.add('grid');
      tasks.classList.remove('list');
      listView = false;
    } else {
      listIcon.style.display = 'inline';
      gridIcon.style.display = 'none';
      tasks.classList.remove('grid');
      tasks.classList.add('list');
      listView = true;
    }
  }
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51393" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map