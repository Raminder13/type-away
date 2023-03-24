'use strict';

/* 
Raminder Singh
*/

import { Score } from "./score.js";
import { words } from "./words.js";

const wordElement = document.querySelector("#word");
const timerElement = document.querySelector("#timer");
const scoreElement = document.querySelector("#score");
const inputWordElement = document.querySelector("#input-word");
const startButtonElement = document.querySelector("#start");
const resetButtonElement = document.querySelector("#reset");
const audioElement = document.querySelector("audio");
console.log(audioElement)

var timer;
var sec = 99;

let wordCount = 0;
let score = 0;
let gameStatus = "stop";

function startTime() {
  timer = setInterval(function () {
    document.querySelector("#timer").innerHTML = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      result();
      reset();
    }
  }, 1000);
}

const shuffleArray = () => {
  return words.sort((a, b) => 0.5 - Math.random());
};

let shuffledWords = shuffleArray();

const next = () => {
  if (gameStatus === "start") {
    score += 10;
    scoreElement.innerHTML = score;

    wordElement.innerHTML = shuffledWords[wordCount];

    inputWordElement.value = "";

    if (wordCount === 99) {
      result();
      audioElement.pause();
      audioElement.currentTime = 0;
      clearInterval(timer);
      inputWordElement.disabled = true;
    }
  }
};

const start = () => {
  if (gameStatus === "stop") {
    startTime();
    gameStatus = "start";
    wordElement.innerHTML = shuffledWords[0];
    audioElement.volume = 0.2;
    audioElement.play();
    inputWordElement.disabled = false;
  }
};

const reset = () => {
  if (gameStatus === "start") {
    wordCount = 0;
    score = 0;
    inputWordElement.value = "";
    timerElement.innerHTML = 99;
    sec = 99;
    audioElement.pause();
    audioElement.currentTime = 0;
    shuffledWords = shuffleArray();
    inputWordElement.disabled = true;
    clearInterval(timer);
    gameStatus = "stop";
  }
};

const checkWordInput = () => {
  if (
    wordElement.innerHTML === inputWordElement.value &&
    gameStatus === "start"
  ) {
    wordCount++;
    next();
  }
};

const result = () => {
  let resultScore = new Score(score, (wordCount / 99) * 100);
  wordElement.innerHTML=`You score ${resultScore.percentage} and had ${wordCount} correct`;
};

startButtonElement.addEventListener("click", start);
resetButtonElement.addEventListener("click", reset);
inputWordElement.addEventListener("input", checkWordInput);
