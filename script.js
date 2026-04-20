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
  {artist: "The Smiths", track: "This Charming Man", date: "1983", file: "ThisCharmingMan.mp3", desc: "This is a week before the culture fair, before I found I was being cheated on. I would listen to this nonstop because it was so fun learned it on guitar, told myself I can play this for her maybe let her know I still care. Yeah that didn't work out, I still listen to it even after I found out she cheated on me. Beats me though."},
  {artist: "Nirvana", track: "About a Girl", date: "1989", file: "AboutAGirl.mp3", desc: "Arguably a good Nirvana song. I wish I could play this with a band, y'know seems fun to play with a band, makes me feel like I get that safe space y'know. Like that emotional space you can have or where I can just scream without anyone looking at me weird. I like this song because it makes me feel safe. In a way."},
  {artist: "Mac Demarco", track: "No Other Heart", date: "2015", file: "NoOtherHeart.mp3", desc: "I honestly don't remember how I found this song, but makes me remember about what I was doing way before everything went down. How carefree I was, and how optimistic I was. Way way before everything collapsed."},
  {artist: "Good Kid", track: "Cicada", date: "2026", file: "04-cicada.mp3", desc: "This song was released the same day I was cheated on. I was getting ready to finally reconcile with my girlfriend at the time (now ex) I hyped myself up told myself I matter. The moment I go to school that day I get ignored by her I shrug it off y'know, and then I see her hanging out with someone else calling them their girlfriend."},
  {artist: "batta", track: "chase", date: "2015", file: "chase.mp3", desc: "I was listening to it during a time where I was just starting to get bored of following routine. Yeah there was something to look forward for everyday. I had one best friend at the time, and this song, followed by a girl who liked me and made it obvious. Whenever I played the song I would think about playing it with a band. I still do."},
  {artist: "Kurt Cobain", track: "Do Re Mi", date: "1994", file: "DoReMi.mp3", desc: "One of Kurts first ever songs he recorded. I played this on the guitar for my crush, she liked it. It was nice I mean first audience member I've had and I'm glad it was my crush. All I remember about finding this is just laying on the floor, and then I take a look at my phone, see it and play it."},
  {artist: "The Pillows", track: "Last Dinosaur", date: "1999", file: "LAST DINOSAUR.mp3", desc: "I think about playing this with a band. Y'know I want to play with a band but who would want to take me? I play guitar sure, but there are better guitarists out there. I mean I haven't played for a single person besides my crush."},
  {artist: "Good Kid", track: "Coffee", date: "2026", file: "03-coffee.mp3", desc: "This song is about burnout and stress, but to me it's about coffee."},
  {artist: "Good Kid", track: "Rift", date: "2026", file: "01-rift.mp3", desc: "Hey guys, so this song is cool. I also want to play this is in a band y'know, I really want to be in a band. I doubt I'll ever be in one. I'm don't think anyone would want the kid who gets excited about small stuff in their band."},
  {artist: "Sunny Day Service", track: "心に雲を持つ少年", date: "2020", file: "心に雲を持つ少年.mp3", desc: "I uhm, this might get personal. Every time I listen to this song I think about exploring the world and seeing stuff I've never been able to see. I think about running away and seeing the world and the beauties it has to offer. I think about the wind flowing through my hair, even if it's short. I think about meeting new people and not being stuck with my parents and family."},
  {artist: "Franz Liszt", track: "Liebestraum No. 3", date: "1850", file: "Liszt - Liebestraum No. 3 (Love Dream).mp3", desc: "Love, that's all it means to me. It perfectly describes how it feels to be in love. I mean I listen to it and I think about performing for someone, an audience but I don't have the courage to do that. I want to perform, like by a lot. I don't think I'm fit to be a performer."},
  {artist: "Vundabar", track: "Alien Blues", date: "2015", file: "Alien Blues.mp3", desc: "This song, means a lot to me. I listened to this when I started martial arts. When I started to self teach myself to code. When I started my first relationship (didn't last) when I told myself that I shouldn't just be a lazy bum and actually use my brain. It was the song that marked a huge pivot in my life."},
  {artist: "Kurt Cobain", track: "Montage of Kurt", date: "1988", file: "goofykurtsong.mp3", desc: "Thought it would be cool to add this. Even then don't ask why I added it, sounds funny. I find it funny I have a friend who finds it scary. I don't know why. I still fine it funny, you can skip this if you want to."}
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
