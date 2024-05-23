(() => {
  // to set the time
  let time = document.querySelector("#time");
  // audio sound for every hit
  let sound = new Audio("assets_smash.mp3");
  // holes list to place mole randomly;
  let holes = document.querySelectorAll("#container>div");
  // score variable
  let s = document.querySelector("#score");
  // Total time is 15sec
  let i = 15;
  let score = 0;
  // moveMole is global variable to clearinterval after game is over
  let moveMole = null;
  // this is the first function which will run when start is pressed
  let start_time = () => {
    // start will be disabled for duration of gameplay
    document.querySelector("button").disabled = true;
    s.innerText = score;
    // setting score to zero again
    // console.log("in timer function");
    // run function initiated one time which places mole randomly is called
    run();
    // setinterval for changing timer on screen
    let time_rem = setInterval(() => {
      time.innerText = i + " Sec";
      i--;
      if (i == -1) {
        // once timer is -1 stopgame is called with interval id time_rem which performs reset operations
        stopGame(time_rem);
      }
    }, 1000);
  };
  document.querySelector("button").addEventListener("click", start_time);

  let stopGame = (time_rem) => {
    // interval is cleared
    clearInterval(time_rem);
    // time reset to total time and start button enabled
    i = 15;
    document.querySelector("button").disabled = false;
    // moveMole interval which moves mole randomly is also cleared so that mole is not moving anymore(move mole is global)
    clearInterval(moveMole);
    score = 0;

    // for each to clear last mole element as position is not known so all holes are cleared
    holes.forEach(function (el) {
      el.innerHTML = null;
    });
  };

  function run() {
    // geneerated random number between 0 to 9
    let position = Math.floor(Math.random() * 9);
    // console.log(position);
    // hole selected with random position
    let mole = holes[position];
    // console.log(mole);
    // image tag is appended
    let i = document.createElement("img");
    i.src = "https://cdn-icons-png.flaticon.com/512/5050/5050857.png";
    // hitmole triggered on correct click
    i.addEventListener("click", hitMole);
    mole.append(i);
    moveMole = setTimeout(() => {
      // set timeouot to move mole around by recursively calling same function
      // current mole is cleared before appending again
      mole.innerHTML = null;
      run();
    }, 450);
  }
  function hitMole() {
    //score incremented and sound player
    score = score + 10;
    sound.play();
    s.innerText = score;
    // console.log(score);
  }
})();
