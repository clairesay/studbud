
// https://github.com/sampotts/plyr/#options
const player = new Plyr('audio', {
    controls: ['progress']
});

// Expose player so it can be used from the console
window.player = player;

// music, artists and album art all drawn from the open source music sight Free Music Archive https://freemusicarchive.org/home
var songs = [
    {
        source: './audio/Moods.mp3',
        title: 'Moods',
        artist: 'Shaolin Dub',
        album_art: './albumart/shaolin-dub2.jpg'
    },
    {
        source: './audio/Amerika.mp3',
        title: 'Amerika',
        artist: 'Audiobinger',
        album_art: './albumart/audiobinger.jpg'
    },

    {
        source: './audio/Snow-Dawn.mp3',
        title: 'Snow Dawn',
        artist: 'Ketsa',
        album_art: './albumart/Ketsa.jpg'
    },
    {
        source: './audio/Pray.mp3',
        title: 'Pray',
        artist: 'Makaih Beats',
        album_art: './albumart/makaih Beats.jpg'
    },
    {
        source: './audio/BEAST.mp3',
        title: 'BEAST',
        artist: 'Paul Cesar Beats',
        album_art: './albumart/paul-cesar-beats.jpg'
    },
    {
        source: './audio/If-I-Could-Remember.mp3',
        title: 'If I Could Remember',
        artist: 'Ketsa',
        album_art: './albumart/Ketsa.jpg'
    },
    {
        source: './audio/Chuckin-It.mp3',
        title: 'Chuckin It',
        artist: 'Shaolin Dub',
        album_art: './albumart/shaolin-dub3.jpg'
    },
    {
        source: './audio/Synchronised.mp3',
        title: 'Synchronised',
        artist: 'Ketsa',
        album_art: './albumart/Ketsa.jpg'
    },
    {
        source: './audio/COFFEE FI.mp3',
        title: 'COFFEE FI',
        artist: 'Paul Cesar Beats',
        album_art: './albumart/paul-cesar-beats.jpg'
    },
    {
        source: './audio/Point-Pleasant.mp3',
        title: 'Point Pleasant',
        artist: 'Shaolin Dub',
        album_art: './albumart/shaolin-dub.jpg'
    },
    {
        source: './audio/Empire-of-Light.mp3',
        title: 'Empire of Light',
        artist: 'Siddhartha Corsus',
        album_art: './albumart/siddharthacorsus.jpg'
    },
    {
        source: './audio/Dogman.mp3',
        title: 'Dogman',
        artist: 'Shaolin Dub',
        album_art: './albumart/shaolin-dub.jpg'
    },
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
      playlistContainer.style.height = '200px';
      scrollCount = 0
   } 

   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
