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
})({"js/pop-up.js":[function(require,module,exports) {
// POPUP TAB ACTIVITY
var timePopUp = document.getElementById('time');
var peekTime = document.querySelector('#time nav h1');
var dropdown = document.querySelector('#dropdown');
var dropdownOption = dropdown.querySelector('#time-selector h3');
var musicPopUp = document.getElementById('music');
var nav = musicPopUp.querySelector('nav');
var currentControls = musicPopUp.querySelector('#current-controls');
var currentContainer = musicPopUp.querySelector('#current');
timePopUp.setAttribute('state', 'standby');
musicPopUp.setAttribute('state', 'standby'); // collapse button for each of the pop-up windows

var collapseButtons = document.querySelectorAll('.pop-up nav button.collapse');
collapseButtons.forEach(function (button, index) {
  // on click, we open or close the corresponding popup window
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    popUpState(index);
  });
}); // if we click on the pop-up window itself, and its pcurrent state is either peek or standby, open it to active mode.

timePopUp.addEventListener('click', function () {
  if (timePopUp.getAttribute('state') == 'peek' || timePopUp.getAttribute('state') == 'standby') {
    popUpState(0);
  }
});
musicPopUp.addEventListener('click', function () {
  if (musicPopUp.getAttribute('state') == 'peek' || musicPopUp.getAttribute('state') == 'standby') {
    popUpState(1);
  }
}); // alternate states of the pop-up tab

function popUpState(index) {
  var popUp, mode;

  if (index == 0) {
    popUp = timePopUp;
    mode = 'time';
  } else if (index == 1) {
    popUp = musicPopUp;
    mode = 'music';
  } // setting responsive alternates in case device size is smaller


  responsivePopUp(popUp); // if/else tree to determine the status of the current pop-up being activated
  // active --> the pop-up tab is open
  // peek --> users can see a little bit of the timer/music player, but not the whole thing
  // standby --> the pop-up is reduced to an icon

  if (popUp.getAttribute('state') == 'standby') {
    popUp.setAttribute('state', 'active'); // checks for peek modes and alters styles in turn.

    peek(false, mode);
  } else if (popUp.getAttribute('state') == 'peek') {
    popUp.setAttribute('state', 'active');
    peek(false, mode);
  } else if (popUp.getAttribute('state') == 'active' && popUp.getAttribute('static') == 'true') {
    popUp.setAttribute('state', 'standby');
    peek(false, mode);
  } else if (popUp.getAttribute('state') == 'active') {
    popUp.setAttribute('state', 'peek');
    peek(true, mode);

    if (popUp == timePopUp) {
      // hide the dropdown if it the user is in peek mode, and the selected timer is a pomodoro timer
      // or if the device is a mobile (in that case there's no space for it)
      if (dropdownOption.getAttribute('id') == 'pomodoro-select' || deviceSize == 'mobile') {
        dropdown.style.display = 'none'; // otherwise, in stopwatch mode and if the device is bigger than mobile, still show the dropdown
      } else {
        dropdown.style.display = 'flex';
      }
    }
  } // positioning the time pop-up from the right hand side


  popUpPositioning();
} // on mobile/smaller device sizes, the other popUp is forced to be in 'standby' mode to ensure there is space on the screen


function responsivePopUp(popUp) {
  if (deviceSize != 'desktop') {
    if (popUp == timePopUp) {
      musicPopUp.setAttribute('state', 'standby');
    } else {
      timePopUp.setAttribute('state', 'standby');
    }
  }
} // make the appropriate alterations to the pop-up windows


function peek(bool, mode) {
  if (mode == 'time') {
    dropdown.style.display = 'flex';

    if (bool == true) {
      peekTime.style.display = 'flex';
      dropdown.style.left = 'auto';
      dropdown.style.right = '0px';
      dropdown.querySelector('h3').style.color = '#909090';
    } else {
      peekTime.style.display = 'none';
      dropdown.style.left = '60px';
      dropdown.style.right = 'auto';
      dropdown.querySelector('h3').style.color = '#303030';
    }
  } else if (mode == 'music') {
    if (bool == true) {
      nav.appendChild(currentControls);
    } else {
      currentContainer.appendChild(currentControls);
    }
  }
} // this determines the positioning of the time pop-up 


function popUpPositioning() {
  // if the music pop-up is on standby, calculate how far from the right the time pop-up will be 
  if (musicPopUp.getAttribute('state') != 'standby') {
    if (deviceSize == 'mobile') {
      timePopUp.style.right = '254px';
    } else {
      timePopUp.style.right = '354px';
    } // if the time pop-up is active and on mobile, it should open up to full device width and thus position right 0

  } else if (timePopUp.getAttribute('state') == 'active' && deviceSize == 'mobile') {
    timePopUp.style.right = '0'; // otherwise, we go with default position
  } else {
    timePopUp.style.right = '110px';
  }
}
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54726" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/pop-up.js"], null)
//# sourceMappingURL=/pop-up.cc1feb1b.js.map