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
})({"1u20u":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "80fe72c108227fb9cd0b46dd61a69f93";
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

},{}],"5qt2H":[function(require,module,exports) {
// Import the URL to an image file
// import music from "url:../audio/songs/BEAST.mp3";

// import allMusic from "url:../audio/songs/*.mp3";

// https://github.com/sampotts/plyr/#options
const player = new Plyr('audio', {
    controls: ['progress']
});

// Expose player so it can be used from the console
window.player = player;

// music, artists and album art all drawn from the open source music sight Free Music Archive https://freemusicarchive.org/home
var songs = [
    {
        source: './BEAST.mp3',
        title: 'Amerika',
        artist: 'Audiobinger',
        album_art: './audiobinger.jpg'
    },
    {
        source: './public/audio/songs/If-I-Could-Remember.mp3',
        title: 'If I Could Remember',
        artist: 'Ketsa',
        album_art: 'images\albumart\Ketsa.jpg'
    },
    // {
    //     source: 'audio\songs\Ketsa - Snow-Dawn.mp3',
    //     title: 'Snow Dawn',
    //     artist: 'Ketsa',
    //     album_art: 'images\albumart\Ketsa.jpg'
    // },
    // {
    //     source: 'Synchronised.mp3',
    //     title: 'Synchronised',
    //     artist: 'Ketsa',
    //     album_art: 'images\albumart\Ketsa.jpg'
    // },
    // {
    //     source: 'Pray.mp3',
    //     title: 'Pray',
    //     artist: 'Makaih Beats',
    //     album_art: 'images\albumart\makaih Beats.jpg'
    // },
    // {
    //     source: 'BEAST.mp3',
    //     title: 'BEAST',
    //     artist: 'Paul Cesar Beats',
    //     album_art: 'images\albumart\paul-cesar-beats.jpg'
    // },
    // {
    //     source: 'COFFEE FI.mp3',
    //     title: 'COFFEE FI',
    //     artist: 'Paul Cesar Beats',
    //     album_art: 'images\albumart\paul-cesar-beats.jpg'
    // },
    // {
    //     source: 'Chuckin-It.mp3',
    //     title: 'Chuckin It',
    //     artist: 'Shaolin Dub',
    //     album_art: 'images\albumart\shaolin-dub3.jpg'
    // },
    // {
    //     source: 'Dogman.mp3',
    //     title: 'Dogman',
    //     artist: 'Shaolin Dub',
    //     album_art: 'images\albumart\shaolin-dub.jpg'
    // },
    // {
    //     source: 'Moods.mp3',
    //     title: 'Moods',
    //     artist: 'Shaolin Dub',
    //     album_art: 'images\albumart\shaolin-dub2.jpg'
    // },
    // {
    //     source: 'Point-Pleasant.mp3',
    //     title: 'Point Pleasant',
    //     artist: 'Shaolin Dub',
    //     album_art: 'images\albumart\shaolin-dub.jpg'
    // },
    // {
    //     source: 'Empire-of-Light.mp3',
    //     title: 'Empire of Light',
    //     artist: 'Siddhartha Corsus',
    //     album_art: 'images\albumart\siddharthacorsus.jpg'
    // },
]

const musicPlayer = document.querySelector('#music')
var audioContainer = musicPlayer.querySelector('audio')
const playlistContainer = musicPlayer.querySelector('ul.playlist')
const previousButton = musicPlayer.querySelector('#previous')
const nextButton = musicPlayer.querySelector('#next')
const shuffleButton = musicPlayer.querySelector('#shuffle')
var playButton = musicPlayer.querySelector('#play-pause')

// on click, toggle play or pause
playButton.addEventListener('click', function(event) {
    event.stopPropagation()
    player.togglePlay()
    buttonIcon()
})

// replace the SVG of the button icon pending its status (playing or paused)
function buttonIcon() {
    if (player.paused) {
        playButton.innerHTML = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V21L18 10.5L0 0Z" fill="#303030"/>
        </svg>`
    } else if (player.playing) {
        playButton.innerHTML = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 21H6V0H0V21ZM12 0V21H18V0H12Z" fill="#303030"/>
        </svg>`
    }
}

var tracks;
// autopopulating the playlist based on the music available
function addMusic() {
    // for each of the songs, create a list item and populate with semantic elements
    songs.forEach(function (song, index) {
        let songListItem = document.createElement('li'),
            albumArt = document.createElement('img'),
            title = document.createElement('h3'),
            artist = document.createElement('h4');

        // set the source based on the object
        albumArt.setAttribute('src', song.album_art)
        title.textContent = song.title
        artist.textContent = song.artist

        // append each element to the list item, and then the list to the container
        title.appendChild(artist)
        songListItem.appendChild(albumArt)
        songListItem.appendChild(title)
        playlistContainer.appendChild(songListItem)

        // add event listener
        songListItem.addEventListener('click', function () { playTrack(index) })
    })
    tracks = musicPlayer.querySelectorAll('li')
}
addMusic()

// if the user clicks previous butotn 
previousButton.addEventListener('click', function (event) {
    event.stopPropagation()
    let songIndex;
    // set the song index to one below, or the last song in the list if the user is at index 0
    if (currentIndex == 0) {
        songIndex = songs.length - 1
    } else {
        songIndex = currentIndex - 1
    }
    // play the track
    playTrack(songIndex)
})

// if the user clicks next button
nextButton.addEventListener('click', function (event) {
    event.stopPropagation()
    let songIndex;
    // set the song index to one above, or the first song in the list if the user is at the last song
    if (currentIndex == songs.length - 1) {
        songIndex = 0
    } else {
        songIndex = currentIndex + 1
    }
    // play the track
    playTrack(songIndex)
})

// if hitting shuffle, this randomises the song array's order.
shuffleButton.addEventListener('click', function (event) {
    event.stopPropagation()
    // shuffling array src: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (i = songs.length - 1; i > 0; i --) {
        // generate random number
        var j = Math.floor(Math.random() * (i + 1))
        // assign the current item to a random
        var temporaryValue = songs[i]
        songs[i] = songs[j]
        songs[j] = temporaryValue
    }

    // re-populate the playlist
    playlistContainer.innerHTML = ''
    addMusic()
    // play the first song
    playTrack(0)
})

var currentIndex;
// this phantom button shows up to give perceived affordance of playing a song
var phantomPlayButton = document.getElementById('phantom-play-button')

// function to play a track
function playTrack(n, mode) {
    // if we are at the end of the playlist, stop playing. 
    if (n == songs.length) {
        currentIndex = n = 0
        mode = 'initial'
    }
    // adding the appropriate style to the item that is currently playing
    tracks[n].classList.add('active')
    // and removing that class to absolutely everything else
    tracks.forEach(function (track, index) {
        if (index != n) {
            track.classList.remove('active')
        }
        if (track.getAttribute('listener') != 'true') {
            track.addEventListener('mouseover', function() {
                track.appendChild(phantomPlayButton)
                if (track.classList.contains('active')) {
                    phantomPlayButton.style.display = 'none'
                } else {
                    phantomPlayButton.style.display = 'flex'
                }

            })
            track.setAttribute('listener', 'true')
        }
    })
    // moving that track to the bottom of the playlist 
    playlistContainer.appendChild(tracks[n])
    // updating global variable
    currentIndex = n
    // get the current song object
    let currentSong = songs[n]
    // selecting all the current elements
    let currentContainer = document.getElementById('current'),
        currentAlbumArt = currentContainer.querySelector('img'),
        currentTitle = document.querySelector('h1.title'),
        currentArtist = document.querySelector('h3.artist'),
        currentSource = document.createElement('source');

    // populate the current container with the appropriate elements
    currentSource.setAttribute('type', 'audio/mp3')
    currentSource.setAttribute('src', currentSong.source)
    audioContainer.innerHTML = ''
    audioContainer.appendChild(currentSource)
    // audioContainer.innerHTML = `<source src="` + currentSong.source + `" type="audio/mp3">`
    currentAlbumArt.setAttribute('src', currentSong.album_art)
    currentTitle.textContent = currentSong.title
    currentArtist.textContent = currentSong.artist

    // replace the player's source and play
    player.source = {
        type: 'audio',
        title: currentSong.title,
        sources: [
            {
                src: currentSong.source,
            }
        ],

    };
    // if we are initialising, don't play any music, otherwise, play and set static status to false
    if (mode != 'initial') {
        musicPlayer.setAttribute('static', 'false')
        player.play();
    }
    buttonIcon()

}
playTrack(0, 'initial')

// events https://github.com/sampotts/plyr#events
player.on('playing', () => {
    musicPlayer.setAttribute('static', 'false')
})
player.on('pause', () => {
    musicPlayer.setAttribute('static', 'true')
})
player.on('ended', () => {
    playTrack(currentIndex + 1)
    musicPlayer.setAttribute('static', 'true')
});

// borrowed code for detecting scroll directionhttps://stackoverflow.com/questions/31223341/detecting-scroll-direction
var lastScrollTop = 0;
var scrollCount = 0;

// if the user scrolls down, the playlist is expanded. if tehy scroll to the top, the playlist is condensed
playlistContainer.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st = playlistContainer.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
      scrollCount += 1
   } else if (st  == 0) {
      // upscroll code
    setTimeout(function() {
        playlistContainer.style.height = '100px';
    }, 500)
      
   }
   if (scrollCount > 5) {
      playlistContainer.style.height = '250px';
      scrollCount = 0
   } 

   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

},{}]},["1u20u","5qt2H"], "5qt2H", "parcelRequirec526")

//# sourceMappingURL=index.61a69f93.js.map
