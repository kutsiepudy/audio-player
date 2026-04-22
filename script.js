let audio = document.getElementById("main-audio")
let button = document.getElementById("play-pause")
let volumeSlider = document.querySelector(".volume_slider")
let seekSlider = document.querySelector(".seek_slider")
let trackName = document.querySelector(".track-name")
let artistName = document.querySelector(".track-artist")
let dateRelease = document.querySelector(".release-date")
let songDesc = document.querySelector(".description")
let currentTimeEl = document.getElementById("current-time")
let maxTimeEl = document.getElementById("max-time")
let trackIndex = 0;
const availableSongs = [
  {artist: "The Smiths", track: "This Charming Man", date: "1983", file: "ThisCharmingMan.mp3", desc: "This is like a week before the culture fair, before I found out I was being cheated on. I listened to this nonstop because it felt fun, like a break from everything. I even learned it on guitar, thought maybe I could actually say something through it since my Verbal Communication is terrible. Yeah that didn’t work. Still, even after everything, I listen to it and it cuts through my head a bit."},
  {artist: "Nirvana", track: "About a Girl", date: "1989", file: "AboutAGirl.mp3", desc: "Arguably a good Nirvana song. I wish I could play this with a band, feels like the kind of place where you don’t have to explain yourself. Like the Communication Climate would just be understood, no judgment, just sound. It feels safe in a way."},
  {artist: "Mac Demarco", track: "No Other Heart", date: "2015", file: "NoOtherHeart.mp3", desc: "I don’t remember how I found this, probably through some random Media scroll. But it reminds me of before everything collapsed. Back when I thought things made sense. Now it just feels like I was naive, but I still like going back to that version of me."},
  {artist: "Good Kid", track: "Cicada", date: "2026", file: "04-cicada.mp3", desc: "This dropped the same day everything went down. I hyped myself up to finally say something, then got hit with pure Nonverbal Communication instead, being ignored, and brushed it off. Then I saw her with someone else. That was it. No misunderstanding, just clarity in the worst way."},
  {artist: "batta", track: "chase", date: "2015", file: "chase.mp3", desc: "I was listening to this when life felt repetitive but still had something to look forward to. One best friend, someone who liked me, simple stuff. I’d think about playing this in a band, like actual Interpersonal Communication instead of awkward conversations."},
  {artist: "Kurt Cobain", track: "Do Re Mi", date: "1994", file: "DoReMi.mp3", desc: "One of Nirvana’s demos. I played this for my crush once, and it felt like real communication for once. Like I was the Sender and she actually got it. No confusion, no weirdness, just a moment that made sense."},
  {artist: "The Pillows", track: "Last Dinosaur", date: "1999", file: "LAST DINOSAUR.mp3", desc: "I think about playing this in a band a lot. But then I overthink it, like who would even want me there? There’s always someone better. I feel like I’d just turn into Noise instead of actually adding anything."},
  {artist: "Good Kid", track: "Coffee", date: "2026", file: "03-coffee.mp3", desc: "This song is supposed to be about burnout and stress, but to me it’s just coffee. Still, I guess burnout feels like constant Conflict in your own head, like you can’t even chill properly."},
  {artist: "Good Kid", track: "Rift", date: "2026", file: "01-rift.mp3", desc: "This song is cool. I want to play it in a band so bad. But I feel like I’m more of a Receiver than anything. Like I take things in but don’t really give enough back for it to matter."},
  {artist: "Sunny Day Service", track: "Kokoro Ni Kumo Wo Motsu Shonen", date: "2020", file: "Kokoro Ni Kumo Wo Motsu Shonen.mp3", desc: "This might get personal. Every time I hear this, I think about leaving everything and just going somewhere new. Meeting people, seeing different cultures, experiencing Intercultural Communication instead of being stuck in one place forever."},
  {artist: "Franz Liszt", track: "Liebestraum No. 3", date: "1850", file: "Liszt - Liebestraum No. 3 (Love Dream).mp3", desc: "Love, that’s what this is. It feels like something pure, like it should be understood without explanation. I think about performing it, but I don’t think I have the confidence for that kind of exposure. Maybe that’s where Inclusion matters, feeling like you belong before you even start."},
  {artist: "Vundabar", track: "Alien Blues", date: "2015", file: "Alien Blues.mp3", desc: "This song marks a huge shift in my life. Martial arts, coding, my first relationship, trying to stop being lazy. It felt like I was trying to build something fair for myself, like my own sense of Equity in how I live."},
  {artist: "Kurt Cobain", track: "Montage of Kurt", date: "1988", file: "goofykurtsong.mp3", desc: "I added this because it’s funny. I have a friend who finds it scary, which is weird to me. I don’t know, it just shows how people hear things differently. You can skip it if you want, it’s just here."}
]

function loadTrack(index) {
  audio.pause();
  audio.currentTime = 0;
  let song = availableSongs[index];
  audio.src = song.file
  trackName.textContent = song.track
  artistName.textContent = song.artist
  dateRelease.textContent = song.date || "Unknown"
  songDesc.textContent = song.desc || "I dont know"

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

audio.addEventListener("ended", nextTrack);
loadTrack(trackIndex);
setVolume();
