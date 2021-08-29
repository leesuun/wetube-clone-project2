const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const volumeRange = document.getElementById("volumeRange");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let videoVolume = 0.5;
let controlsTimeout = null;
let controlsMovementTimeout = null;
video.volume = videoVolume;

const handleStart = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.classList = video.paused
        ? "fas fa-play fa-lg"
        : "fas fa-pause fa-lg";
};

const handleMute = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.classList = video.muted
        ? "fas fa-volume-mute fa-lg"
        : "fas fa-volume-up fa-lg";
    volumeRange.value = video.muted ? 0 : videoVolume;
};

const handleVolumn = (event) => {
    const {
        target: { value },
    } = event;

    if (video.muted) {
        video.muted = false;
        muteBtn.classList = "fas fa-volume-up fa-lg";
    }

    videoVolume = value;
    video.volume = value;
};

const handleLoadedMetadata = (event) => {
    timeLine.max = Math.floor(video.duration);
    totalTime.innerText = formatTime(Math.floor(video.duration));
    console.log(video.duration);
};

const handleTimeUpdate = (event) => {
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
    console.log(video.currentTime);
};

const formatTime = (second) => {
    const getTime = new Date(second * 1000).getTime();
    return new Date(getTime).toISOString().substr(14, 5);
};

const handleTimelineChange = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

const handleFullScreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        video.classList.add("video");
        document.exitFullscreen();
    } else {
        video.classList.remove("video");
        videoContainer.requestFullscreen();
    }

    fullScreenBtn.classList = fullscreen
        ? "fas fa-expand fa-lg"
        : "fas fa-compress fa-lg";
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};

const handleKeyboard = (event) => {
    const { key } = event;

    switch (key) {
        case " ":
            handleStart();
            break;
        case "m":
            handleMute();
            break;
        case "ArrowLeft":
            video.currentTime -= 3;
            break;
        case "ArrowRight":
            video.currentTime += 3;
            break;

        case "Escape":
            video.classList.add("video");
            break;
        default:
            break;
    }
};

const handleEnded = (event) => {
    const {
        dataset: { id },
    } = videoContainer;

    fetch(`/api/video/${id}/view`, {
        method: "POST",
    });
};

video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
video.addEventListener("click", handleStart);

videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);

playBtn.addEventListener("click", handleStart);
muteBtn.addEventListener("click", handleMute);
fullScreenBtn.addEventListener("click", handleFullScreen);

volumeRange.addEventListener("input", handleVolumn);
timeLine.addEventListener("input", handleTimelineChange);

document.addEventListener("keyup", handleKeyboard);
