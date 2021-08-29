"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("playBtn");
var muteBtn = document.getElementById("muteBtn");
var volumeRange = document.getElementById("volumeRange");
var currenTime = document.getElementById("currenTime");
var totalTime = document.getElementById("totalTime");
var timeLine = document.getElementById("timeLine");
var fullScreenBtn = document.getElementById("fullScreenBtn");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.getElementById("videoControls");
var videoVolume = 0.5;
var controlsTimeout = null;
var controlsMovementTimeout = null;
video.volume = videoVolume;

var handleStart = function handleStart() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtn.classList = video.paused ? "fas fa-play fa-lg" : "fas fa-pause fa-lg";
};

var handleMute = function handleMute() {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtn.classList = video.muted ? "fas fa-volume-mute fa-lg" : "fas fa-volume-up fa-lg";
  volumeRange.value = video.muted ? 0 : videoVolume;
};

var handleVolumn = function handleVolumn(event) {
  var value = event.target.value;

  if (video.muted) {
    video.muted = false;
    muteBtn.classList = "fas fa-volume-up fa-lg";
  }

  videoVolume = value;
  video.volume = value;
};

var handleLoadedMetadata = function handleLoadedMetadata(event) {
  timeLine.max = Math.floor(video.duration);
  totalTime.innerText = formatTime(Math.floor(video.duration));
};

var handleTimeUpdate = function handleTimeUpdate(event) {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

var formatTime = function formatTime(second) {
  var getTime = new Date(second * 1000).getTime();
  return new Date(getTime).toISOString().substr(14, 5);
};

var handleTimelineChange = function handleTimelineChange(event) {
  var value = event.target.value;
  video.currentTime = value;
};

var handleFullScreen = function handleFullScreen() {
  var fullscreen = document.fullscreenElement;

  if (fullscreen) {
    video.classList.add("video");
    document.exitFullscreen();
  } else {
    video.classList.remove("video");
    videoContainer.requestFullscreen();
  }

  fullScreenBtn.classList = fullscreen ? "fas fa-expand fa-lg" : "fas fa-compress fa-lg";
};

var hideControls = function hideControls() {
  return videoControls.classList.remove("showing");
};

var handleMouseMove = function handleMouseMove() {
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

var handleMouseLeave = function handleMouseLeave() {
  controlsTimeout = setTimeout(hideControls, 3000);
};

var handleKeyboard = function handleKeyboard(event) {
  var key = event.key;

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

var handleEnded = function handleEnded(event) {
  var id = videoContainer.dataset.id;
  console.log(id);
  fetch("/api/video/".concat(id, "/view"), {
    method: "POST"
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