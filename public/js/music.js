// Change "{}" to your options:
// https://github.com/sampotts/plyr/#options
const player = new Plyr('audio', {});

// Expose player so it can be used from the console
window.player = player;

var songs = [
    {
        source: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
        title: 'It All Began with a Burst',
        artist: 'Kishi Bashi',
        album_art: 'meme.png'
    },
    {
        source: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3',
        title: 'Deezer Preview',
        artist: 'Deez',
        album_art: 'screenshot.jpg'
    },
    {
        source: 'track.mp3',
        title: '19th Floor',
        artist: 'Bobby Richards',
        album_art: 'file.jpg'
    },
]

const musicPlayer = document.querySelector('#music')
var audioContainer = musicPlayer.querySelector('audio')
const playlistContainer = musicPlayer.querySelector('ul.playlist')
const previousButton = musicPlayer.querySelector('#previous')
const nextButton = musicPlayer.querySelector('#next')
const shuffleButton = musicPlayer.querySelector('#shuffle')

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
        songListItem.appendChild(albumArt)
        songListItem.appendChild(title)
        songListItem.appendChild(artist)
        playlistContainer.appendChild(songListItem)

        // add event listener
        songListItem.addEventListener('click', function () { playTrack(index) })
    })
    tracks = musicPlayer.querySelectorAll('li')
}
addMusic()

// if the user clicks previous butotn 
previousButton.addEventListener('click', function () {
    let songIndex;
    // set the song index to one below, or the last song in the list if the user is at index 0
    if (currentIndex == 0) {
        songIndex = songs.length - 1
    } else {
        songIndex = currentIndex - 1
    }
    playTrack(songIndex)
})

nextButton.addEventListener('click', function () {
    let songIndex;
    // set the song index to one above, or the first song in the list if the user is at the last song
    if (currentIndex == songs.length - 1) {
        songIndex = 0
    } else {
        songIndex = currentIndex + 1
    }
    playTrack(songIndex)
})

shuffleButton.addEventListener('click', function () {
    // if hitting shuffle, first song can be anything but the current song
    // randomise the array's order!
})

var currentIndex;
// function to play a track
function playTrack(n, mode) {
    // adding the appropriate style to the item that is currently playing
    tracks[n].classList.add('active')
    // and removing that class to absolutely everything else
    tracks.forEach(function (track, index) {
        if (index != n) {
            track.classList.remove('active')
        }
    })
    // updating global variable
    currentIndex = n
    // get the current song object
    let currentSong = songs[n]
    // selecting all the current elements
    let currentContainer = document.getElementById('current'),
        currentAlbumArt = currentContainer.querySelector('img'),
        currentTitle = currentContainer.querySelector('h1.title'),
        currentArtist = currentContainer.querySelector('h3.artist')

    // populate the current container with the appropriate elements
    audioContainer.innerHTML = `<source src="` + currentSong.source + `" type="audio/mp3">`
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

    // if we are initialising, don't play any music
    if (mode != 'initial') {
        player.play();
    }

}
playTrack(0, 'initial')

        // if music paused, when user shrinks the container, it goes into standby mode
        // otherwise, if the music continues to play, it goes into peek mode.
        // if the user is in peek mode and pauses it, the music player should remain in peek mode until
        // it is opened and actually paused by the user. 


