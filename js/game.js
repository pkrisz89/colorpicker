var colorNum = 6;
var colors = generateRandomColors(colorNum);
var pickedColor = pickColor();
var messageDisplay = document.querySelector("#message");
var colordisplay = document.getElementById('colordisplay');
var squares = document.querySelectorAll('.square');
var header = document.querySelector('.header');
var resetButton = document.querySelector('.controls .reset');
var easyButton = document.querySelector('#easy');
var hardButton = document.querySelector('#hard');
var winnerText = document.querySelector('.winnertext');


init();

function init() {
  popupControl();
  controls();
  colordisplay.textContent = pickedColor;
  for (var i=0; i < squares.length; i++) {
    squares[i].style.background = colors[i];
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.background
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        changeColors(pickedColor)
        header.style.background = pickedColor;
        resetButton.textContent = "Play again?"
        winnerText.style.display = "block";
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try again!";
      }
    });
  }
}

function popupControl() {
  var howtoplay = document.querySelector('#howto');
  var popup = document.querySelector('#howto-popup');
  var closeButton = document.querySelector('#close');

  howtoplay.addEventListener("click", function() {
    popup.style.display = 'block';
  });
  closeButton.addEventListener("click", function() {
    popup.style.display = 'none';
  });
}

function reset(colnum) {
  colors = generateRandomColors(colnum);
  resetButton.textContent = "New Colors"
  winnerText.style.display = "none";
  for (var i=0; i < squares.length; i++) {
    if (colors[i]){
      squares[i].style.background = colors[i];
      squares[i].style.display = 'block';
    } else if (colors.length < 6) {
      squares[i].style.display = 'none';
    } 
  }
  pickedColor = pickColor();
  colordisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  header.style.background = "#232323";
}



function controls() {
  easyButton.addEventListener("click", function() {
    easyButton.classList.add('active');
    hardButton.classList.remove('active');
    reset(3);
  });
  hardButton.addEventListener("click", function() {
    easyButton.classList.remove('active');
    hardButton.classList.add('active');
    reset(6);
  });
  resetButton.addEventListener("click", function(){
    reset(6);
  });
}

function changeColors(color) {
  for (var i=0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var arr = [];
  for (var i=0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" +r+ ", " +g+ ", "+b+ ")"
}