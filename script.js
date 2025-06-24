const musicList = [
    { name: "1 - Alok, Bruno Martini, Zeeba - Never Let Me Go", file: "./1 - Alok, Bruno Martini, Zeeba - Never Let Me Go.mp3" },
    { name: "2 - Tiësto & Karol G - Don't Be Shy", file: "./2 - Tiësto & Karol G - Don't Be Shy.mp3" },
    { name: "3 - SIA - Unstoppable  Lyryics", file: "./3 - SIA - Unstoppable  Lyryics.mp3" }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const loopBtn = document.getElementById('loop');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const list = document.getElementById('music-list');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const themeToggle = document.getElementById('toggle-theme');

let currentIndex = 0;
let isPlaying = false;

function loadMusic(index) {
    const song = musicList[index];
    audio.src = song.file;
    updateActiveSong(index);
}

function updateActiveSong(index) {
    const items = document.querySelectorAll('#music-list li');
    items.forEach((li, i) => li.classList.toggle('active', i === index));
}

function playMusic() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = '⏸️';
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = '▶️';
}

function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
}

function prevMusic() {
    currentIndex = (currentIndex - 1 + musicList.length) % musicList.length;
    loadMusic(currentIndex);
    playMusic();
}

function nextMusic() {
    currentIndex = (currentIndex + 1) % musicList.length;
    loadMusic(currentIndex);
    playMusic();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Lista de músicas
musicList.forEach((song, i) => {
    const li = document.createElement('li');
    li.textContent = song.name;
    li.addEventListener('click', () => {
    currentIndex = i;
        loadMusic(currentIndex);
        playMusic();
    });
    list.appendChild(li);
});

// Eventos
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextMusic);

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

loopBtn.addEventListener('click', () => {
    audio.loop = !audio.loop;
    loopBtn.classList.toggle('active', audio.loop);
});

// Modo escuro
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
});

// Inicializar
loadMusic(currentIndex);
