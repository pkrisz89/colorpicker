var colors = generateRandomColors(6);
var pickedColor = pickColor();
var colordisplay = document.getElementById('colordisplay');
var squares = document.querySelectorAll('.square');
var header = document.querySelector('.header');
var winnerText = document.querySelector('.winnertext');
var choiceCounter = 0;
var maxChoices = 3;
var winCounter = 0;
var lossCounter = 0;

init();

function init() {
  popupControl();
  controls();
  colordisplay.textContent = pickedColor;
  clickSquare();
}

function clickSquare() {
  for (var i=0; i < squares.length; i++) {
    squares[i].style.background = colors[i];
      squares[i].addEventListener("click", function() {
      var clickedColor = this.style.background;
      if (choiceCounter !== maxChoices && !this.classList.contains('picked')) {
        choiceCounter++
        this.classList.add('picked');
        if (clickedColor === pickedColor) {
          win();
        } else if (clickedColor !== pickedColor && choiceCounter !== maxChoices) {
          this.style.background = "#232323";
        } else {
          this.style.background = "#232323";
          lose();
        }
      }
    });
  }
}

function win() {
  changeColors(pickedColor)
  header.style.background = pickedColor;
  winnerText.style.display = "block";
  winCounter++;
  updateCounters();
}

function lose() {
  winnerText.textContent = "You lost. Try again!"
  winnerText.style.display = "block";
  lossCounter++;
  updateCounters();
}

function updateCounters() {
  var totalCounter = winCounter + lossCounter;
  document.querySelector('#wins').textContent = winCounter;
  document.querySelector('#losses').textContent = lossCounter;
  document.querySelector('#total').textContent = totalCounter;
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
  winnerText.textContent = "You Win. Congratulations!"
  maxChoices = colnum/3;
  choiceCounter = 0;
  colors = generateRandomColors(colnum);
  winnerText.style.display = "none";
  for (var i=0; i < squares.length; i++) {
    squares[i].classList.remove('picked');
    if (colors[i]){
      squares[i].style.background = colors[i];
      squares[i].style.display = 'block';
    } else if (colors.length < 6) {
      squares[i].style.display = 'none';
    } 
  }
  pickedColor = pickColor();
  colordisplay.textContent = pickedColor;
  header.style.background = "#232323";
}

function controls() {
  var resetButton = document.querySelector('.controls .reset');
  var easyButton = document.querySelector('#easy');
  var hardButton = document.querySelector('#hard');

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