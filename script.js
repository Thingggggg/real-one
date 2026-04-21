const songs = [
  {
    name: "1 - Chill",
    src: "https://lambda.vgmtreasurechest.com/soundtracks/restaurant-tycoon-2-roblox-gamerip-2021/bchfeelt/01.%20Classical.mp3",
    class: "chill"
  },
  {
    name: "2 - Restaurant",
    src: "https://lambda.vgmtreasurechest.com/soundtracks/restaurant-tycoon-2-roblox-gamerip-2021/adomsbgb/08.%20Slow%20Piano.mp3",
    class: "restaurant"
  },
  {
    name: "3 - Ocean 🌊",
    src: "https://nu.vgmtreasurechest.com/soundtracks/fortnite-music-packs-gamerip-2017/iyrrfbre/1-08.%20Coral%20Chorus.mp3",
    class: "ocean"
  }
];

let i = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const vinyl = document.getElementById("vinyl");
const arm = document.getElementById("arm");
const deck = document.getElementById("deck");
const progress = document.getElementById("progress");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

/* AUDIO SETTINGS */
audio.preload = "auto";
audio.volume = 1;
audio.muted = false;

/* LOAD SONG */
function loadSong(index){
  const song = songs[index];

  audio.src = song.src;
  audio.load();

  title.textContent = song.name;
  deck.className = "deck " + song.class;

  progress.value = 0;
}

/* UI UPDATE */
function updateUI(){
  if(audio.paused){
    vinyl.classList.remove("spin");
    arm.classList.remove("active");
    playBtn.textContent = "▶";
  } else {
    vinyl.classList.add("spin");
    arm.classList.add("active");
    playBtn.textContent = "⏸";
  }
}

/* PLAY BUTTON */
playBtn.addEventListener("click", async () => {
  try {
    if(!audio.src){
      loadSong(i);
    }

    if(audio.paused){
      await audio.play();
    } else {
      audio.pause();
    }
  } catch(e){
    console.log(e);
  }
});

/* NEXT */
nextBtn.addEventListener("click", async () => {
  i = (i + 1) % songs.length;
  loadSong(i);
  try { await audio.play(); } catch(e){}
});

/* PREV */
prevBtn.addEventListener("click", async () => {
  i = (i - 1 + songs.length) % songs.length;
  loadSong(i);
  try { await audio.play(); } catch(e){}
});

/* KEEP UI SYNCED */
audio.addEventListener("play", updateUI);
audio.addEventListener("pause", updateUI);

/* AUTO NEXT */
audio.addEventListener("ended", async () => {
  i = (i + 1) % songs.length;
  loadSong(i);
  try { await audio.play(); } catch(e){}
});

/* PROGRESS UPDATE (VIEW ONLY) */
audio.addEventListener("timeupdate", () => {
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});
