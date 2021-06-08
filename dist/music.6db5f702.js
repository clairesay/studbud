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
})({"js/music.js":[function(require,module,exports) {
// https://github.com/sampotts/plyr/#options
var player = new Plyr('audio', {
  controls: ['progress']
}); // Expose player so it can be used from the console

window.player = player; // music, artists and album art all drawn from the open source music sight Free Music Archive https://freemusicarchive.org/home

var songs = [{
  source: './audio/Moods.mp3',
  title: 'Moods',
  artist: 'Shaolin Dub',
  album_art: './albumart/shaolin-dub2.jpg'
}, {
  source: './audio/Amerika.mp3',
  title: 'Amerika',
  artist: 'Audiobinger',
  album_art: './albumart/audiobinger.jpg'
}, {
  source: './audio/Snow-Dawn.mp3',
  title: 'Snow Dawn',
  artist: 'Ketsa',
  album_art: './albumart/Ketsa.jpg'
}, {
  source: './audio/Pray.mp3',
  title: 'Pray',
  artist: 'Makaih Beats',
  album_art: './albumart/makaih Beats.jpg'
}, {
  source: './audio/BEAST.mp3',
  title: 'BEAST',
  artist: 'Paul Cesar Beats',
  album_art: './albumart/paul-cesar-beats.jpg'
}, {
  source: './audio/If-I-Could-Remember.mp3',
  title: 'If I Could Remember',
  artist: 'Ketsa',
  album_art: './albumart/Ketsa.jpg'
}, {
  source: './audio/Chuckin-It.mp3',
  title: 'Chuckin It',
  artist: 'Shaolin Dub',
  album_art: './albumart/shaolin-dub3.jpg'
}, {
  source: './audio/Synchronised.mp3',
  title: 'Synchronised',
  artist: 'Ketsa',
  album_art: './albumart/Ketsa.jpg'
}, {
  source: './audio/COFFEE FI.mp3',
  title: 'COFFEE FI',
  artist: 'Paul Cesar Beats',
  album_art: './albumart/paul-cesar-beats.jpg'
}, {
  source: './audio/Point-Pleasant.mp3',
  title: 'Point Pleasant',
  artist: 'Shaolin Dub',
  album_art: './albumart/shaolin-dub.jpg'
}, {
  source: './audio/Empire-of-Light.mp3',
  title: 'Empire of Light',
  artist: 'Siddhartha Corsus',
  album_art: './albumart/siddharthacorsus.jpg'
}, {
  source: './audio/Dogman.mp3',
  title: 'Dogman',
  artist: 'Shaolin Dub',
  album_art: './albumart/shaolin-dub.jpg'
}];
var musicPlayer = document.querySelector('#music');
var audioContainer = musicPlayer.querySelector('audio');
var playlistContainer = musicPlayer.querySelector('ul.playlist');
var previousButton = musicPlayer.querySelector('#previous');
var nextButton = musicPlayer.querySelector('#next');
var shuffleButton = musicPlayer.querySelector('#shuffle');
var playButton = musicPlayer.querySelector('#play-pause'); // on click, toggle play or pause

playButton.addEventListener('click', function (event) {
  event.stopPropagation();
  player.togglePlay();
  buttonIcon();
}); // replace the SVG of the button icon pending its status (playing or paused)

function buttonIcon() {
  if (player.paused) {
    playButton.innerHTML = "<svg width=\"18\" height=\"21\" viewBox=\"0 0 18 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 0V21L18 10.5L0 0Z\" fill=\"#303030\"/>\n        </svg>";
  } else if (player.playing) {
    playButton.innerHTML = "<svg width=\"18\" height=\"21\" viewBox=\"0 0 18 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 21H6V0H0V21ZM12 0V21H18V0H12Z\" fill=\"#303030\"/>\n        </svg>";
  }
}

var tracks; // autopopulating the playlist based on the music available

function addMusic() {
  // for each of the songs, create a list item and populate with semantic elements
  songs.forEach(function (song, index) {
    var songListItem = document.createElement('li'),
        albumArt = document.createElement('img'),
        title = document.createElement('h3'),
        artist = document.createElement('h4'); // set the source based on the object

    albumArt.setAttribute('src', song.album_art);
    title.textContent = song.title;
    artist.textContent = song.artist; // append each element to the list item, and then the list to the container

    title.appendChild(artist);
    songListItem.appendChild(albumArt);
    songListItem.appendChild(title);
    playlistContainer.appendChild(songListItem); // add event listener

    songListItem.addEventListener('click', function () {
      playTrack(index);
    });
  });
  tracks = musicPlayer.querySelectorAll('li');
}

addMusic(); // if the user clicks previous butotn 

previousButton.addEventListener('click', function (event) {
  event.stopPropagation();
  var songIndex; // set the song index to one below, or the last song in the list if the user is at index 0

  if (currentIndex == 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = currentIndex - 1;
  } // play the track


  playTrack(songIndex);
}); // if the user clicks next button

nextButton.addEventListener('click', function (event) {
  event.stopPropagation();
  var songIndex; // set the song index to one above, or the first song in the list if the user is at the last song

  if (currentIndex == songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = currentIndex + 1;
  } // play the track


  playTrack(songIndex);
}); // if hitting shuffle, this randomises the song array's order.

shuffleButton.addEventListener('click', function (event) {
  event.stopPropagation(); // shuffling array src: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  for (i = songs.length - 1; i > 0; i--) {
    // generate random number
    var j = Math.floor(Math.random() * (i + 1)); // assign the current item to a random

    var temporaryValue = songs[i];
    songs[i] = songs[j];
    songs[j] = temporaryValue;
  } // re-populate the playlist


  playlistContainer.innerHTML = '';
  addMusic(); // play the first song

  playTrack(0);
});
var currentIndex; // this phantom button shows up to give perceived affordance of playing a song

var phantomPlayButton = document.getElementById('phantom-play-button'); // function to play a track

function playTrack(n, mode) {
  // if we are at the end of the playlist, stop playing. 
  if (n == songs.length) {
    currentIndex = n = 0;
    mode = 'initial';
  } // adding the appropriate style to the item that is currently playing


  tracks[n].classList.add('active'); // and removing that class to absolutely everything else

  tracks.forEach(function (track, index) {
    if (index != n) {
      track.classList.remove('active');
    }

    if (track.getAttribute('listener') != 'true') {
      track.addEventListener('mouseover', function () {
        track.appendChild(phantomPlayButton);

        if (track.classList.contains('active')) {
          phantomPlayButton.style.display = 'none';
        } else {
          phantomPlayButton.style.display = 'flex';
        }
      });
      track.setAttribute('listener', 'true');
    }
  }); // moving that track to the bottom of the playlist 

  playlistContainer.appendChild(tracks[n]); // updating global variable

  currentIndex = n; // get the current song object

  var currentSong = songs[n]; // selecting all the current elements

  var currentContainer = document.getElementById('current'),
      currentAlbumArt = currentContainer.querySelector('img'),
      currentTitle = document.querySelector('h1.title'),
      currentArtist = document.querySelector('h3.artist'),
      currentSource = document.createElement('source'); // populate the current container with the appropriate elements

  currentSource.setAttribute('type', 'audio/mp3');
  currentSource.setAttribute('src', currentSong.source);
  audioContainer.innerHTML = '';
  audioContainer.appendChild(currentSource); // audioContainer.innerHTML = `<source src="` + currentSong.source + `" type="audio/mp3">`

  currentAlbumArt.setAttribute('src', currentSong.album_art);
  currentTitle.textContent = currentSong.title;
  currentArtist.textContent = currentSong.artist; // replace the player's source and play

  player.source = {
    type: 'audio',
    title: currentSong.title,
    sources: [{
      src: currentSong.source
    }]
  }; // if we are initialising, don't play any music, otherwise, play and set static status to false

  if (mode != 'initial') {
    musicPlayer.setAttribute('static', 'false');
    player.play();
  }

  buttonIcon();
}

playTrack(0, 'initial'); // events https://github.com/sampotts/plyr#events

player.on('playing', function () {
  musicPlayer.setAttribute('static', 'false');
});
player.on('pause', function () {
  musicPlayer.setAttribute('static', 'true');
});
player.on('ended', function () {
  playTrack(currentIndex + 1);
  musicPlayer.setAttribute('static', 'true');
}); // borrowed code for detecting scroll directionhttps://stackoverflow.com/questions/31223341/detecting-scroll-direction

var lastScrollTop = 0;
var scrollCount = 0; // if the user scrolls down, the playlist is expanded. if tehy scroll to the top, the playlist is condensed

playlistContainer.addEventListener("scroll", function () {
  // or window.addEventListener("scroll"....
  var st = playlistContainer.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

  if (st > lastScrollTop) {
    scrollCount += 1;
  } else if (st == 0) {
    // upscroll code
    setTimeout(function () {
      playlistContainer.style.height = '100px';
    }, 500);
  }

  if (scrollCount > 5) {
    playlistContainer.style.height = '200px';
    scrollCount = 0;
  }

  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52510" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/music.js"], null)
//# sourceMappingURL=/music.6db5f702.js.map