"use strict";

var darkMode = document.getElementById("darkMode");
var body = document.querySelector("body");
var main = document.querySelector("main");
var span = main.getElementsByTagName("span");
var input = main.getElementsByTagName("input");
var button = main.getElementsByTagName("button");
var h2 = main.getElementsByTagName("h2");

var handleWhiteMode = function handleWhiteMode() {
  body.style.backgroundColor = "#181818";

  for (var i = 0; i < span.length; i++) {
    span[i].style.color = "white";
  }

  for (var _i = 0; _i < input.length; _i++) {
    input[_i].style.backgroundColor = "white";
    input[_i].style.color = "black";
  }

  for (var _i2 = 0; _i2 < button.length; _i2++) {
    button[_i2].style.backgroundColor = "white";
    button[_i2].style.color = "black";
  }

  for (var _i3 = 0; _i3 < h2.length; _i3++) {
    h2[_i3].style.color = "white";
  }

  darkMode.removeEventListener("click", handleWhiteMode);
  darkMode.addEventListener("click", handleDarkMode);
};

var handleDarkMode = function handleDarkMode() {
  body.style.backgroundColor = "white";

  for (var i = 0; i < span.length; i++) {
    span[i].style.color = "black";
  }

  for (var _i4 = 0; _i4 < input.length; _i4++) {
    input[_i4].style.backgroundColor = "black";
    input[_i4].style.color = "white";
  }

  for (var _i5 = 0; _i5 < button.length; _i5++) {
    button[_i5].style.backgroundColor = "black";
    button[_i5].style.color = "white";
  }

  for (var _i6 = 0; _i6 < h2.length; _i6++) {
    h2[_i6].style.color = "black";
  }

  darkMode.removeEventListener("click", handleDarkMode);
  darkMode.addEventListener("click", handleWhiteMode);
};

darkMode.addEventListener("click", handleDarkMode);