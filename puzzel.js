"use strict";

// diverse variabler
const puzzelImageUrl = document.querySelector("#imgUrl").value;
let numbOfYPieces = 3;
let numbOfXPieces = 3;
let PuzzelContainer_width;
let PuzzelContainer_hight;
document.addEventListener("DOMContentLoaded", init);
function init() {
  document.querySelector("button").addEventListener("click", loadImage);
}

function loadImage() {
  document.querySelector("img").src = puzzelImageUrl;
  document.querySelector("img").onload = imageHasLoaded;
}

//gir os den størrelse billede er "født" med fra start af.
function imageHasLoaded() {
  console.log("Pics is loaded");
  PuzzelContainer_width = document.querySelector("img").naturalWidth;
  PuzzelContainer_hight = document.querySelector("img").naturalHeight;
  creatDropZones();
}

function creatDropZones() {
  document.querySelector(
    "#PuzzelContainer"
  ).style.gridTemplateColumns = `repeat(${numbOfXPieces}, 1fr)`;
  document.querySelector(
    "#PuzzelContainer"
  ).style.width = `${PuzzelContainer_width}px`;
  for (let y = 0; y < numbOfYPieces; y++) {
    for (let x = 0; x < numbOfXPieces; x++) {
      let piece = document.createElement("div");
      piece.style.height = PuzzelContainer_hight / numbOfYPieces + "px";
      piece.textContent = `${x}${y}`;
      piece.classList.add("piece");
      document.querySelector("#PuzzelContainer").appendChild(piece);
      addIdTopiece();
    }
  }
}
function addIdTopiece() {
  document.querySelectorAll(".piece").forEach(eachDot => {
    eachDot.dataset.xyid = `${Math.random() * 500 + 250}px`;
  });
}
