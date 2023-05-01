//////-------IMPORTED CONFETTI EFFECT FUNCTION START--------////
//-----------Var Inits--------------
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;
canvas.style.display = 'none';

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 25;
const drag = 0.075;
const colors = [
  { front: 'red', back: 'darkred' },
  { front: 'green', back: 'darkgreen' },
  { front: 'blue', back: 'darkblue' },
  { front: 'yellow', back: 'darkyellow' },
  { front: 'orange', back: 'darkorange' },
  { front: 'pink', back: 'darkpink' },
  { front: 'purple', back: 'darkpurple' },
  { front: 'turquoise', back: 'darkturquoise' },
];

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30),
      },
      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },
      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1,
      },
      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    });
  }
};
//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;
    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);
    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(
      confetto.velocity.y + gravity,
      terminalVelocity
    );
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;
    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;
    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle =
      confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);
    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });
  window.requestAnimationFrame(render);
};
  //---------Confetti Function Execution--------
  const confettiExecute = ()=>{
    canvas.style.display = 'block';
    initConfetti();
    render();
    const hideCanvas = () => {
      canvas.style.display = 'none';
    };
    setTimeout(hideCanvas, 2200);
  }
  //---------Confetti Function Execution--------


//////-------IMPORTED CONFETTI EFFECT FUNCTION END--------////

const numbers = [
  21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4,
];
const columnFirst = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const columnSecond = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const columnThird = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
const blackNumbers = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

const isFirstTwelve = (value) => value >= 1 && value <= 12;
const isSecondTwelve = (value) => value >= 13 && value <= 24;
const isThirdTwelve = (value) => value >= 25 && value <= 36;
const isFirstEighteen = (value) => value >= 1 && value <= 18;
const isSecondEighteen = (value) => value >= 19 && value <= 36;

const isRedNumber = (value) => redNumbers.includes(value);
const isBlackNumber = (value) => blackNumbers.includes(value);
const winnerMatch = (value) => bets.some((e) => e.numberValue == value);

let wheel = document.querySelector('.wheel');
let wheelCenter = document.querySelector('.play');
let playSign = document.getElementById('playSign');
let ball = document.querySelector('.ball-wheel');
let spinBtn = document.querySelector('.center');
let showResult = document.querySelector('.show-result');
let bank = document.querySelector('.account');
let reset = document.querySelector('.reset');
let countdown = document.querySelector('.countdown');
//chip counters and event listeners for numbers
let allNumbers = document.querySelectorAll('.table-number');
let allBets = document.querySelectorAll('.bet');
let loserLinkLin = document.getElementById('loser-link-lin');
let loserLinkGh = document.getElementById('loser-link-gh');
let personalLinks = document.querySelector('.personal-links');

let rotation = 0;
let rotationBall = 0;
let result = 0;
let bets = [];
let times = 1;
let count = 14;

const initialBank = () => {
  if (localStorage.getItem('bank') === null) {
    localStorage.setItem('bank', '100');
  }
  console.log('bank local:', localStorage.getItem('bank'));
  bank.innerHTML = parseInt(localStorage.getItem('bank'));
};

document.addEventListener('DOMContentLoaded', initialBank);
//hide all chips
const hideChips = () => {
  allNumbers.forEach((number) => {
    number.childNodes[3].style.display = 'none';
  });
  allNumbers.forEach((number) => {
    number.childNodes[1].innerHTML = '';
  });
};
hideChips();
const loserBonus = () => {
  bank.innerHTML = parseInt(bank.innerHTML) + 100;
  personalLinks.style.display = 'none';
};
loserLinkGh.addEventListener('click', loserBonus);
loserLinkLin.addEventListener('click', loserBonus);

const randomRotate = () => {
  //randomly rotate, round up to one of the results in 37 (360/37 = 9.72972972973)
  let newZero =
    Math.ceil(Math.ceil(Math.random() * 3600) / 9.72972972973) * 9.72972972973;
  rotation += newZero;
  let newZeroBall =
    Math.ceil(Math.ceil(Math.random() * 3600) / 9.72972972973) * 9.72972972973;
  rotationBall += newZeroBall;
  wheel.style.transform = `rotate(${rotation}deg)`;
  ball.style.transform = `rotate(-${rotationBall}deg)`;

  //calculate the position change. "if" statements that are inside "if" statements are for additional spins so we can measure new starting point.
  let resultCalc =
    37 -
    Math.floor((newZeroBall % 360) / 9.72972972973) -
    Math.floor((newZero % 360) / 9.72972972973);

  if (resultCalc >= 0) {
    if (result + resultCalc > 37) {
      result += resultCalc - 37;
    } else {
      result += resultCalc;
    }
  }
  if (resultCalc < 0) {
    if (result + 37 + resultCalc > 37) {
      result += resultCalc;
    } else {
      result += 37 + resultCalc;
    }
  }
  console.log(numbers[result]);
  console.log(bets);
  console.log(bets.some((e) => e.numberValue == numbers[result]));
  //    bets.find((e) => e.numberValue === number.childNodes[5].innerHTML)

  //prevent clicking until animation ends
  wheelCenter.removeEventListener('click', randomRotate);
  //add clicking after animation ends
  const setOnClick = () => {
    wheelCenter.addEventListener('click', randomRotate);
  };
  const setHtml = () => {
    showResult.innerHTML = numbers[result];

    countdown.style.display = 'none';
    playSign.style.display = 'block';
    hideChips();
    count = 14;
    if (bank.innerHTML == 0) {
      personalLinks.style.display = 'flex';
    }
  };

  const calculateWin = () => {
    if (winnerMatch(numbers[result])) {
      bank.innerHTML =
        parseInt(bank.innerHTML) +
        parseInt(bets.find((e) => e.numberValue == numbers[result]).bet * 36);
      //burada kaldık. bunu bankaya ekleyecez. farklı kontroller yazacaz sidebetler için
    } else {
      console.log('you lose');
    }
    switch (true) {
      case isFirstTwelve(numbers[result]):
        if (winnerMatch('1 to 12')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == '1 to 12').bet * 3);
        }

        break;
      case isSecondTwelve(numbers[result]):
        if (winnerMatch('13 to 24')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == '13 to 24').bet * 3);
        }
        break;
      case isThirdTwelve(numbers[result]):
        if (winnerMatch('25 to 36')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == '25 to 36').bet * 3);
        }
        break;

      default:
        if (winnerMatch('0')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(
              bets.find((e) => e.numberValue == numbers[result]).bet * 36
            );
        }
        break;
    }

    switch (true) {
      case isFirstEighteen(numbers[result]):
        if (winnerMatch('1-18')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == '1-18').bet * 2);
        }
        break;
      case isSecondEighteen(numbers[result]):
        if (winnerMatch('19-36')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == '9-36').bet * 2);
        }
        break;

      default:
        break;
    }

    switch (true) {
      case isRedNumber(numbers[result]):
        if (winnerMatch('RED')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == 'RED').bet * 2);
        }
        break;
      case isBlackNumber(numbers[result]):
        if (winnerMatch('BLACK')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == 'BLACK').bet * 2);
        }
        break;
      default:
        break;
    }
    switch (true) {
      case numbers[result] % 2 == 0 && numbers[result] != 0:
        if (winnerMatch('EVEN')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == 'EVEN').bet * 2);
        }
        break;
      case numbers[result] % 2 == 1:
        if (winnerMatch('ODD')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == 'ODD').bet * 2);
        }
        break;
      default:
        break;
    }
    switch (true) {
      case numbers[result] % 3 == 0:
        if (winnerMatch('Col. 3')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == 'Col. 3').bet * 3);
        }
        break;
      case numbers[result] % 3 == 1:
        if (winnerMatch('Col. 1')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == 'Col. 1').bet * 3);
        }
        break;
      case numbers[result] % 3 == 2:
        if (winnerMatch('Col. 2')) {
          confettiExecute();
          bank.innerHTML =
            parseInt(bank.innerHTML) +
            parseInt(bets.find((e) => e.numberValue == 'Col. 2').bet * 3);
        }
        break;
      default:
        break;
    }
  
    bets = [];
    localStorage.setItem('bank', `${bank.innerHTML}`);
    console.log(localStorage.getItem('bank'));
  };

  //countdown from 15 to 0
  const countdownTimer = setInterval(function () {
    playSign.style.display = 'none';
    countdown.style.display = 'block';
    countdown.style.color = '#333';
    if (count < 7 && count > 3) {
      countdown.style.color = 'orange';
    }
    if (count < 4) {
      countdown.style.color = 'red';
    }
    countdown.innerHTML = count;
    count--;
    if (count < 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);
  setTimeout(setOnClick, 15000);
  setTimeout(setHtml, 17000);
  setTimeout(calculateWin, 15000);
  return numbers[result];
};
//add clicking after animation ends
wheelCenter.addEventListener('click', randomRotate);

//add event listener and show chips
allNumbers.forEach((number) => {
  function placeBet() {
    if (bank.innerHTML > 0 && count > 3) {
      //decrease money
      bank.innerHTML -= 1;
      //check all bets
      for (let i = 0; i < bets.length; i++) {
        //if there is a bet already on the number
        if (bets[i].numberValue === number.childNodes[5].innerHTML) {
          number.childNodes[1].innerHTML++;
          bets[i] = {
            numberValue: number.childNodes[5].innerHTML,
            bet: number.childNodes[1].innerHTML,
          };
          break;
        } else if (
          !bets.find((e) => e.numberValue == number.childNodes[5].innerHTML)
        ) {
          //if there is no bet on the number
          number.childNodes[3].style.display = 'block';
          number.childNodes[1].innerHTML++;
          bets.push({
            numberValue: number.childNodes[5].innerHTML,
            bet: number.childNodes[1].innerHTML,
          });
          break;
        }
      }
      //if there are no bets at all
      if (bets.length == 0) {
        number.childNodes[3].style.display = 'block';
        number.childNodes[1].innerHTML++;
        bets.push({
          numberValue: number.childNodes[5].innerHTML,
          bet: number.childNodes[1].innerHTML,
        });
      }
    }
  }

  const placeBetTimes = () => {
    for (let i = 0; i < times; i++) {
      placeBet();
    }
  };

  number.addEventListener('click', placeBetTimes);
});

//reset bets:return bets, hide images, empty spans, clear bets array
const resetBets = () => {
  let totalBet = 0;

  bets.forEach((bet) => {
    totalBet = parseInt(totalBet) + parseInt(bet.bet);
  });
  console.log(totalBet);
  bank.innerHTML = parseInt(bank.innerHTML) + parseInt(totalBet);
  bets = [];
  allNumbers.forEach((number) => {
    number.childNodes[3].style.display = 'none';
  });
  allNumbers.forEach((number) => {
    number.childNodes[1].innerHTML = '';
  });
};
reset.addEventListener('click', resetBets);

let chipTimes = document.querySelector('.chip-times');
let timesSpan = document.querySelector('.times');
//amount of bets placed for one click
const changeTimes = () => {
  if (timesSpan.innerHTML == 'X 1') {
    timesSpan.innerHTML = 'X 2';
    times = 2;
  } else if (timesSpan.innerHTML == 'X 2') {
    timesSpan.innerHTML = 'X 5';
    times = 5;
  } else if (timesSpan.innerHTML == 'X 5') {
    timesSpan.innerHTML = 'X 1';
    times = 1;
  }
};
chipTimes.addEventListener('click', changeTimes);

let hamburger = document.querySelector('.hamburger');
let about = document.querySelector('.about');
let close = document.querySelector('.close');
const displayAbout = () => {
  about.style.transform = 'translateX(0)';
};
const hideAbout = () => {
  about.style.transform = 'translateX(350px)';
};

hamburger.addEventListener('click', displayAbout);
close.addEventListener('click', hideAbout);
