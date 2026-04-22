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
  {artist: "The Smiths", track: "This Charming Man", date: "1983", file: "ThisCharmingMan.mp3", desc: "This is like a week before the culture fair, before I found out I was being cheated on. I listened to this nonstop because it felt fun, like a break from all the conflict I didn’t know was coming. I even learned it on guitar, thought maybe I could be the sender for once and say something through music since my verbal communication sucks. Yeah that didn’t work. Still, even after everything, I listen to it and it cuts through all the noise in my head."},
  {artist: "Nirvana", track: "About a Girl", date: "1989", file: "AboutAGirl.mp3", desc: "Arguably a good Nirvana song. I wish I could play this with a band, feels like that kind of communication climate where you don’t need perfect verbal communication, just sound. Like I could be a receiver and sender at the same time without judgment. It feels like a safe space, like inclusion without having to explain myself. I like this song because it makes everything quieter."},
  {artist: "Mac Demarco", track: "No Other Heart", date: "2015", file: "NoOtherHeart.mp3", desc: "I don’t remember how I found this, probably through some random media scroll. But it reminds me of before everything collapsed. Back when I thought the world had some kind of justice and equity to it. Like I was just a kid believing things worked out. Now it just feels like I was naive, but I still like revisiting that version of me."},
  {artist: "Good Kid", track: "Cicada", date: "2026", file: "04-cicada.mp3", desc: "This dropped the same day everything went down. I hyped myself up to finally use verbal communication, tell her how I felt, be direct for once. Then I got hit with pure nonverbal communication instead—being ignored, brushed off. Then I saw her with someone else. That was the moment conflict became real, not just something in my head. It was loud, like all signal and no clarity."},
  {artist: "batta", track: "chase", date: "2015", file: "chase.mp3", desc: "I was listening to this when life felt repetitive but still had something to look forward to. One best friend, someone who liked me, simple stuff. I’d think about playing this in a band, like actual interpersonal communication through music instead of awkward talking. It made me think about connection, diversity in people, and how I wanted more than just routine."},
  {artist: "Kurt Cobain", track: "Do Re Mi", date: "1994", file: "DoReMi.mp3", desc: "One of Nirvana’s demos. I played this for my crush once, and it felt like real communication for once. Like I was the sender and she actually received it, no distortion, no noise. It felt straight out of a movie, like nonverbal communication actually worked better than anything I could say."},
  {artist: "The Pillows", track: "Last Dinosaur", date: "1999", file: "LAST DINOSAUR.mp3", desc: "I think about playing this in a band a lot. But then I start overthinking—like who would even want me there? There’s always someone better. I feel like I’d mess up the communication climate or just not fit in. I’m not great at verbal communication, and I worry I’d just become background noise instead of actually contributing."},
  {artist: "Good Kid", track: "Coffee", date: "2026", file: "03-coffee.mp3", desc: "This song is supposed to be about burnout and stress, but to me it’s just coffee. Still, I guess burnout is its own kind of conflict, like internal noise that messes with everything else. Makes it harder to communicate, even with yourself."},
  {artist: "Good Kid", track: "Rift", date: "2026", file: "01-rift.mp3", desc: "This song is cool. I want to play it in a band so bad. I keep thinking about it, like being part of something with actual inclusion and shared energy. But I feel like I’m more of a receiver than a sender. Like I take things in but don’t give enough back. I don’t know if there’s space for someone like that."},
  {artist: "Sunny Day Service", track: "Kokoro Ni Kumo Wo Motsu Shonen", date: "2020", file: "Kokoro Ni Kumo Wo Motsu Shonen.mp3", desc: "This might get personal. Every time I hear this, I think about leaving everything behind and just going. Exploring, meeting new people, experiencing intercultural communication instead of being stuck in the same environment. I imagine freedom, no conflict, no expectations. Just existing somewhere new where I’m not already defined."},
  {artist: "Franz Liszt", track: "Liebestraum No. 3", date: "1850", file: "Liszt - Liebestraum No. 3 (Love Dream).mp3", desc: "Love, that’s what this is. It feels like pure emotion without needing verbal communication. Like the kind of thing where the sender doesn’t need words and the receiver just understands. I think about performing it, being vulnerable in front of people, but I don’t think I have the confidence for that kind of exposure."},
  {artist: "Vundabar", track: "Alien Blues", date: "2015", file: "Alien Blues.mp3", desc: "This song marks a huge shift in my life. Martial arts, learning to code, my first relationship, trying to stop being lazy. It was like I was trying to rebuild my communication with the world, like figuring out my place in everything. It wasn’t perfect, but it felt like progress toward something more meaningful."},
  {artist: "Kurt Cobain", track: "Montage of Kurt", date: "1988", file: "goofykurtsong.mp3", desc: "I added this because it’s funny. It sounds like noise, honestly, but in a good way. I have a friend who finds it scary, which is interesting because it shows how different receivers interpret the same thing. I don’t know, it’s just here for inclusion. You can skip it if you want."}
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
