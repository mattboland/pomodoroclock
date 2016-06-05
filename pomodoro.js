(function pomodoro() {

  //sounds cache
  var breakSound = document.getElementById('asound'); 
  var backToWorkSound = document.getElementById('bsound'); 

  //pomodoro clock stuff(cache?)
  var clock = document.getElementById('timer');
  var pomMore = document.getElementById('more');
  var pomLess = document.getElementById('less');

  //buttons functioning for both timers
  var begin = document.getElementById('start');
  var reset = document.getElementById('reset');

  //pomodoro break stuff(cache?)
  var brake = document.getElementById('break');
  var breakMore = document.getElementById('breakMore');
  var breakLess = document.getElementById('breakLess');

  //clicks and listner functions
  pomMore.addEventListener('click', add);
  pomLess.addEventListener('click', minus);
  breakMore.addEventListener('click', add2);
  breakLess.addEventListener('click', minus2);
  begin.addEventListener('click', start);
  reset.addEventListener('click', refresh);

  //baselines
  var pom = 25 * 60;
  var pomBreak = 5 * 60;
  
 
  //determines if clock is running
  var isRunning = false;
  
  //stores id created by setInterval
  var intervalID;
  var intervalID2;

  

  //clock set

  function clockSet() {
    var mins = Math.floor(pom / 60);
    var secs = pom % 60;
    var setTime = twoDigits(mins) + ':' + twoDigits(secs);
    clock.innerHTML = setTime;
  }

  function brakeSet() {
    var mins2 = Math.floor(pomBreak / 60);
    var secs2 = pomBreak % 60;
    var setTime2 = twoDigits(mins2) + ':' + twoDigits(secs2);
    brake.innerHTML = setTime2;
  }
  
  //start-pause
  
  function start(){
    if(!isRunning){
      intervalID = setInterval(decTime, 1000);
      isRunning = true;
    }else{
      clearInterval(intervalID);
      isRunning = false;
    }
  };
  

  function decTime(){
    if(pom > 0){
      pom --;
      clockSet(pom);
    }else{
      clearInterval(intervalID);
      intervalID2 = setInterval(decTime2,1000);
      breakSound.play();
    }
  }
  
  function decTime2(){
    if(pomBreak > 0){
      pomBreak --;
      brakeSet(pomBreak);
    }else{
      clearInterval(intervalID2);
      backToWorkSound.play();
    }
  }

  //adds time pom
  function add() {
    pom+=60;
    clockSet(pom);
  }

  //takes away time pom
  function minus() {
    pom-=60;
    clockSet(pom);
  }

  //adds time break
  function add2() {
    pomBreak+=60;
    brakeSet(pomBreak);
  }

  //takes time break
  function minus2() {
    pomBreak-=60;
    brakeSet(pomBreak);
  }

  //makes sure time outputs with two digits
  function twoDigits(n) {
    if (n <= 9) {
      return "0" + n;
    } else {
      return n;
    }
  }

  //refresh clocks to 25:5 productivity to break
  function refresh() {
    pom = 25*60;
    pomBreak = 5*60;
    clockSet(pom);
    brakeSet(pomBreak);
    if(isRunning){
      clearInterval(intervalID);
      clearInterval(intervalID2);
      isRunning = false;
    }
  }

  clockSet(pom);
  brakeSet(pomBreak);

})()