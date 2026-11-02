let audio = document.getElementById("main-audio");
let button = document.getElementById("play-pause");
let songLoop = document.getElementById("loop");
let showSongDesc = document.getElementById("showDesc");
let volumeSlider = document.querySelector(".volume_slider");
let seekSlider = document.querySelector(".seek_slider");
let trackName = document.querySelector(".track-name");
let artistName = document.querySelector(".track-artist");
let dateRelease = document.querySelector(".release-date");
let songDesc = document.querySelector(".description");
let currentTimeEl = document.getElementById("current-time");
let maxTimeEl = document.getElementById("max-time");
let trackIndex = 0;
let isHoveringLink = false;
const interactive = document.querySelectorAll("a, button");
const cursor = document.getElementById("PumpkinPieCookie");
const cursorAsset = document.getElementById("cursorAsset");
const idle = "cursor/pumpkinPieCookieIdle.png";
const hover = "cursor/pumpkinPieCookieLaugh.gif";
const click = "cursor/explosion.gif";

function loadTrack(index) {
  audio.pause();
  audio.currentTime = 0;
  let song = availableSongs[index];
  audio.src = `audio/${song.file}`
  audio.load()
  trackName.textContent = song.track
  artistName.textContent = song.artist
  dateRelease.textContent = song.date || "Unknown"
  songDesc.textContent = song.desc || "I dont know"
  document.body.style.backgroundImage = song.bg ? `url(background/${song.bg})` : "none";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  if (song.track === "battlecry") {
    console.log("video testing failed...")
  }

  seekSlider.value = 0
  button.textContent = "▶︎"
  currentTimeEl.textContent = "0:00";
  maxTimeEl.textContent = "0:00";
}

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) secs = "0" + secs;
  return `${mins}:${secs}`
}

function playPauseTrack() {
  if (audio.paused) playTrack();
  else pauseTrack()
}

function playTrack() {
  audio.play()
    .then(() => {
      button.textContent = "❚❚";
      document.querySelector(".player").classList.add("playing");
    })
    .catch(err => {
      alert("Song failed to load");
      console.log(err);
    });
}

function toggleLoop() {
  audio.loop = !audio.loop;
  
  if (audio.loop) {
    songLoop.textContent = "Loop: ON";
  } else {
    songLoop.textContent = "Loop: OFF";
  }
}

function displayDesc() {
  if (getComputedStyle(songDesc).display === "none") {
    songDesc.style.display = "block";
  } else {
    songDesc.style.display = "none";
  }
}

function pauseTrack() {
  audio.pause();
  button.textContent = "▶︎";
  document.querySelector(".player").classList.remove("playing");
}

function nextTrack() {
  trackIndex++;
  
  if (trackIndex >= availableSongs.length) {
    trackIndex = 0;
  }
  
  loadTrack(trackIndex);
  playTrack();
}

function previousTrack() {
  trackIndex--;
  
  if (trackIndex < 0) {
    trackIndex = availableSongs.length - 1;
  }

  loadTrack(trackIndex);
  playTrack();
}

function setVolume() {
  audio.volume = volumeSlider.value / 100;
}

function seekTo() {
  if (!isNaN(audio.duration)) {
    let seekTime = audio.duration * (seekSlider.value / 100);
    audio.currentTime = seekTime;
  }
}

audio.addEventListener("timeupdate", () => {

  if (!isNaN(audio.duration)) {
    let value = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = value;
  }
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  maxTimeEl.textContent = formatTime(audio.duration);
});

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  if (!isHoveringLink && !document.querySelector(".cursor-container.is-clicking")) {
    cursorAsset.src = idle;
  }
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('is-clicking');
  cursorAsset.src = click;
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('is-clicking');
  cursorAsset.src = isHoveringLink ? hover : idle;
});

interactive.forEach(el => {
  el.addEventListener('mouseenter', () => {
    isHoveringLink = true;
    cursorAsset.src = hover;
  });

  el.addEventListener('mouseleave', () => {
    isHoveringLink = false;
    cursorAsset.src = idle;
  });
});

songLoop.addEventListener("click", toggleLoop);
showSongDesc.addEventListener("click", displayDesc);
audio.addEventListener("ended", nextTrack);
button.addEventListener("click", playPauseTrack);
const navButtons = document.querySelectorAll(".buttons button");
navButtons[0].addEventListener("click", previousTrack);
navButtons[1].addEventListener("click", playPauseTrack);
navButtons[2].addEventListener("click", nextTrack);
volumeSlider.addEventListener("input", setVolume);
seekSlider.addEventListener("input", seekTo)
loadTrack(trackIndex);
setVolume();
