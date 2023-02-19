////inisialisasi variabel & array
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

////start game
$(document).keypress(function () {
  if (!started) {
    //if !started sama aja seperti started === false;
    nextSequence();
    started = true;
  }
});

//fungsi untuk generate random pattern berikutnya
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  //jQuery Selector
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  //jalankan play Sound
  playSound(randomChosenColour);

  console.log(randomChosenColour);
}

//Deteksi klik button
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  //cek pake panjang array yang ada di userClickedPattern, seolah-olah loop untuk pengecekan tiap index

  console.log(userClickedPattern);
});

//cek jawaban
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Benar");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      // console.log("Sukses");
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

    console.log("Salah");
  }
}

//fungsi untuk jalankan suara sesuai warna
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animasi ketika diklik
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//game-over reset
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
