document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const volumeSlider = document.getElementById("volume-slider");
    const musicInfo = document.getElementById("music-info");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const volumeIcon = document.getElementById("volume-icon");

    let savedTime = localStorage.getItem("musicTime");
    let savedVolume = localStorage.getItem("musicVolume");
    let isPaused = localStorage.getItem("musicPaused") === "true";
    let isMuted = localStorage.getItem("musicMuted") === "true";

    if (savedTime) audio.currentTime = parseFloat(savedTime);
    audio.volume = savedVolume ? parseFloat(savedVolume) : 0.1;
    volumeSlider.value = audio.volume;

    updateVolumeIcon(audio.volume);

    if (isMuted) {
        audio.muted = true;
        volumeIcon.textContent = "🔇";
    }

    if (isPaused) {
        playPauseBtn.textContent = "▶";
    } else {
        audio.play();
        playPauseBtn.textContent = "❚❚";
    }

    function updateMusicInfo() {
        let current = formatTime(audio.currentTime);
        let total = formatTime(audio.duration);
        musicInfo.textContent = `${current} / ${total}`;
    }

    audio.addEventListener("timeupdate", () => {
        updateMusicInfo();
        localStorage.setItem("musicTime", audio.currentTime);
    });

    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "❚❚";
            localStorage.setItem("musicPaused", "false");
        } else {
            audio.pause();
            playPauseBtn.textContent = "▶";
            localStorage.setItem("musicPaused", "true");
        }
    });

    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        audio.muted = false;
        localStorage.setItem("musicVolume", this.value);
        localStorage.setItem("musicMuted", "false");
        updateVolumeIcon(audio.volume);
    });

    volumeIcon.addEventListener("click", function () {
        if (audio.muted) {
            audio.muted = false;
            volumeSlider.value = audio.volume;
            volumeIcon.textContent = getVolumeIcon(audio.volume);
            localStorage.setItem("musicMuted", "false");
        } else {
            audio.muted = true;
            volumeIcon.textContent = "🔇";
            localStorage.setItem("musicMuted", "true");
        }
    });

    function updateVolumeIcon(volume) {
        if (audio.muted || volume == 0) {
            volumeIcon.textContent = "🔇";
        } else {
            volumeIcon.textContent = getVolumeIcon(volume);
        }
    }

    function getVolumeIcon(volume) {
        if (volume == 0) return "🔇";
        if (volume < 0.3) return "🔈"; 
        if (volume < 0.7) return "🔉"; 
        return "🔊"; 
    }

    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" + sec : sec}`;
    }

    audio.addEventListener("loadedmetadata", updateMusicInfo);
});