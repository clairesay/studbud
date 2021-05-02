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
})({"601xX":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "79265beda1fc22f516bf2d49d87e8e9e";
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

},{}],"4Ufvt":[function(require,module,exports) {
var edgeSize = 200;
		var timer = null;

		window.addEventListener( "mousemove", handleMousemove, false );

		// drawGridLines();

		// --------------------------------------------------------------------------- //
		// --------------------------------------------------------------------------- //

		// I adjust the window scrolling in response to the given mousemove event.
		function handleMousemove( event ) {

			// NOTE: Much of the information here, with regard to document dimensions,
			// viewport dimensions, and window scrolling is derived from JavaScript.info.
			// I am consuming it here primarily as NOTE TO SELF.
			// --
			// Read More: https://javascript.info/size-and-scroll-window
			// --
			// CAUTION: The viewport and document dimensions can all be CACHED and then
			// recalculated on window-resize events (for the most part). I am keeping it
			// all here in the mousemove event handler to remove as many of the moving
			// parts as possible and keep the demo as simple as possible.

			// Get the viewport-relative coordinates of the mousemove event.
			var viewportX = event.clientX;
			var viewportY = event.clientY;

			// Get the viewport dimensions.
			var viewportWidth = document.documentElement.clientWidth;
			var viewportHeight = document.documentElement.clientHeight;

			// Next, we need to determine if the mouse is within the "edge" of the 
			// viewport, which may require scrolling the window. To do this, we need to
			// calculate the boundaries of the edge in the viewport (these coordinates
			// are relative to the viewport grid system).
			var edgeTop = edgeSize;
			var edgeLeft = edgeSize;
			var edgeBottom = ( viewportHeight - edgeSize );
			var edgeRight = ( viewportWidth - edgeSize );

			var isInLeftEdge = ( viewportX < edgeLeft );
			var isInRightEdge = ( viewportX > edgeRight );
			var isInTopEdge = ( viewportY < edgeTop );
			var isInBottomEdge = ( viewportY > edgeBottom );

			// If the mouse is not in the viewport edge, there's no need to calculate
			// anything else.
			if ( ! ( isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge ) ) {

				clearTimeout( timer );
				return;

			}

			// If we made it this far, the user's mouse is located within the edge of the
			// viewport. As such, we need to check to see if scrolling needs to be done.

			// Get the document dimensions.
			// --
			// NOTE: The various property reads here are for cross-browser compatibility
			// as outlined in the JavaScript.info site (link provided above).
            var tasks = document.getElementById('#tasks');
			var documentWidth = Math.max(
				tasks.scrollWidth,
				tasks.offsetWidth,
				tasks.clientWidth,
				document.documentElement.scrollWidth,
				document.documentElement.offsetWidth,
				document.documentElement.clientWidth
			);
			var documentHeight = Math.max(
				tasks.scrollHeight,
				tasks.offsetHeight,
				tasks.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight,
				document.documentElement.clientHeight
			);

			// Calculate the maximum scroll offset in each direction. Since you can only
			// scroll the overflow portion of the document, the maximum represents the
			// length of the document that is NOT in the viewport.
			var maxScrollX = ( documentWidth - viewportWidth );
			var maxScrollY = ( documentHeight - viewportHeight );

			// As we examine the mousemove event, we want to adjust the window scroll in
			// immediate response to the event; but, we also want to continue adjusting
			// the window scroll if the user rests their mouse in the edge boundary. To
			// do this, we'll invoke the adjustment logic immediately. Then, we'll setup
			// a timer that continues to invoke the adjustment logic while the window can
			// still be scrolled in a particular direction.
			// --
			// NOTE: There are probably better ways to handle the ongoing animation
			// check. But, the point of this demo is really about the math logic, not so
			// much about the interval logic.
			(function checkForWindowScroll() {

				clearTimeout( timer );

				if ( adjustWindowScroll() ) {

					timer = setTimeout( checkForWindowScroll, 30 );

				}

			})();

			// Adjust the window scroll based on the user's mouse position. Returns True
			// or False depending on whether or not the window scroll was changed.
			function adjustWindowScroll() {

				// Get the current scroll position of the document.
				var currentScrollX = window.pageXOffset;
				var currentScrollY = window.pageYOffset;

				// Determine if the window can be scrolled in any particular direction.
				var canScrollUp = ( currentScrollY > 0 );
				var canScrollDown = ( currentScrollY < maxScrollY );
				var canScrollLeft = ( currentScrollX > 0 );
				var canScrollRight = ( currentScrollX < maxScrollX );

				// Since we can potentially scroll in two directions at the same time,
				// let's keep track of the next scroll, starting with the current scroll.
				// Each of these values can then be adjusted independently in the logic
				// below.
				var nextScrollX = currentScrollX;
				var nextScrollY = currentScrollY;

				// As we examine the mouse position within the edge, we want to make the
				// incremental scroll changes more "intense" the closer that the user
				// gets the viewport edge. As such, we'll calculate the percentage that
				// the user has made it "through the edge" when calculating the delta.
				// Then, that use that percentage to back-off from the "max" step value.
				var maxStep = 50;

				// Should we scroll left?
				if ( isInLeftEdge && canScrollLeft ) {

					var intensity = ( ( edgeLeft - viewportX ) / edgeSize );

					nextScrollX = ( nextScrollX - ( maxStep * intensity ) );

				// Should we scroll right?
				} else if ( isInRightEdge && canScrollRight ) {

					var intensity = ( ( viewportX - edgeRight ) / edgeSize );

					nextScrollX = ( nextScrollX + ( maxStep * intensity ) );

				}

				// Should we scroll up?
				if ( isInTopEdge && canScrollUp ) {

					var intensity = ( ( edgeTop - viewportY ) / edgeSize );

					nextScrollY = ( nextScrollY - ( maxStep * intensity ) );

				// Should we scroll down?
				} else if ( isInBottomEdge && canScrollDown ) {

					var intensity = ( ( viewportY - edgeBottom ) / edgeSize );

					nextScrollY = ( nextScrollY + ( maxStep * intensity ) );

				}

				// Sanitize invalid maximums. An invalid scroll offset won't break the
				// subsequent .scrollTo() call; however, it will make it harder to
				// determine if the .scrollTo() method should have been called in the
				// first place.
				nextScrollX = Math.max( 0, Math.min( maxScrollX, nextScrollX ) );
				nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );

				if (
					( nextScrollX !== currentScrollX ) ||
					( nextScrollY !== currentScrollY )
					) {

					window.scrollTo( nextScrollX, nextScrollY );
					return( true );

				} else {

					return( false );

				}

			}

		}

},{}]},["601xX","4Ufvt"], "4Ufvt", "parcelRequirec526")

//# sourceMappingURL=index.d87e8e9e.js.map
