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

// denne function beregner vores dropZoner ud fra de #id'er som vores puzzel pices er tilskrevet
function creatDropZones() {
  document.querySelector(
    "#PuzzelContainer"
  ).style.gridTemplateColumns = `repeat(${numbOfXPieces}, 1fr)`;
  document.querySelector(
    "#PuzzelContainer"
  ).style.width = `${PuzzelContainer_width}px`;

  for (let y = 0; y < numbOfYPieces; y++) {
    for (let x = 0; x < numbOfXPieces; x++) {
      //her laves en ny html div hvor vi:
      let piece = document.createElement("div");
      piece.style.height = PuzzelContainer_hight / numbOfYPieces + "px";

      //tildeler piece et uniqet id,
      piece.dataset.xyid = `id${x}${y}`;

      //samt adder classen .dropZone
      piece.classList.add("dropZone");

      // og til slut appender den vores piece i vores #puzzelContainer
      document.querySelector("#PuzzelContainer").appendChild(piece);
    }
  }

  //her laves udregning for positionering af vores puzzel pieces. Hvorefter de appendes og dispalyes via vores #pieceContainer
  for (let y = 0; y < numbOfYPieces; y++) {
    for (let x = 0; x < numbOfXPieces; x++) {
      let piece = document.createElement("div");
      piece.style.width = PuzzelContainer_width / numbOfXPieces + "px";
      piece.style.height = PuzzelContainer_hight / numbOfYPieces + "px";
      piece.style.backgroundImage = `url(${puzzelImageUrl})`;
      piece.style.backgroundPosition = `${x *
        (PuzzelContainer_width / numbOfXPieces)}px ${y *
        (PuzzelContainer_hight / numbOfYPieces)}px`;
      piece.dataset.xyid = `id${x}${y}`;
      piece.classList.add("piece");
      document.querySelector("#pieceContainer").appendChild(piece);
    }
  }
  dragPieces();
}

//function der lader os drag'n'droppe vores puzzel pices
let dragged;
document.querySelectorAll(".piece").draggable = true;

function dragPieces() {
  /* events fired on the draggable target */
  document.addEventListener("drag", function(event) {});
  document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
  });
  document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
  });
  /* events fired on the drop targets */
  document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
  });
  //
  document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    console.log("DROP", event.target.className);

    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      dragged.style.left = event.target.style.left;
      dragged.style.top = event.target.style.top;
    } else if (event.target.className == "theBody") {
      // park the dragged elem somewhere on the body
      dragged.style.left = event.pageX + "px";
      dragged.style.top = event.pageY + "px";
    }
  });

  randomPiece();
}

function randomPiece() {
  document.querySelectorAll(".piece").forEach(eachpiece => {
    eachpiece.style.left = `${Math.random() * 500 + 250}px`;
  });
}
