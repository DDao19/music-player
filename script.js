const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music List
const songs = [
  {
    name: 'jaden-smith',
    displayName: 'The Coolest',
    artist: 'Jaden Smith'
  },
  {
    name: 'mobius-8',
    displayName: 'On My Way',
    artist: 'Mobius 8'
  },
  {
    name: 'kingdom-of-giants',
    displayName: 'Griever',
    artist: 'Kingdom of Giants'
  },
  {
    name: 'karim_my-bae',
    displayName: 'My Bae',
    artist: 'Karim'
  },
]

// Check if Playing
let isPlaying = false;

// Play 
function playSong () {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong () {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong (song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0;

// Check song index
function checkSongIndex() {
  if(songIndex < 0) {
    songIndex = songs.length - 1
  } else if(songIndex > songs.length - 1) {
    songIndex = 0
  }
}

// Prev Song
function prevSong() {
  songIndex--;
  checkSongIndex()
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  checkSongIndex()
  loadSong(songs[songIndex]);
  playSong();
}

// ON Load = Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }

    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }

     // Calculate display for duration
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const { duration } = music
  
  music.currentTime = (clickX / width) * duration 
}

// Event Listerners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);