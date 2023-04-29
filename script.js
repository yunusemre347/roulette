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

const isFirstTwelve = (value) => {
  if (value >= 1 && value <= 12) {
    return true;
  }
  return false;
};
const isSecondTwelve = (value) => {
  if (value >= 13 && value <= 24) {
    return true;
  }
  return false;
};
const isThirdTwelve = (value) => {
  if (value >= 25 && value <= 36) {
    return true;
  }
  return false;
};
const isFirstEighteen = (value) => {
  if (value >= 1 && value <= 18) {
    return true;
  }
  return false;
};
const isSecondEighteen = (value) => {
  if (value >= 19 && value <= 36) {
    return true;
  }
  return false;
};

let wheel = document.querySelector('.wheel');
let wheelCenter = document.querySelector('.play');
let ball = document.querySelector('.ball-wheel');
let spinBtn = document.querySelector('.center');
let showResult = document.querySelector('.show-result');
let bank = document.querySelector('.account');
let reset = document.querySelector('.reset');
let rotation = 0;
let rotationBall = 0;
let result = 0;
let bets = [];
let times = 1;



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
  const setOnClick = () => {
    wheelCenter.addEventListener('click', randomRotate);
  };
  const setHtml = () => {
    showResult.innerHTML = numbers[result];
  };
  const winnerMatch = () => {
    if (bets.some((e) => e.numberValue == numbers[result])) {
      console.log('winner');
    } else {
      console.log('no');
    }
  };
  const calculateWin = ()=>{
    console.log("calculate")
    if(bets.some((e) => e.numberValue == numbers[result])){
  console.log("you win")
    console.log(bets.find((e)=>e.numberValue==numbers[result]).bet*36)
    //burada kaldık. bunu bankaya ekleyecez. farklı kontroller yazacaz sidebetler için
    }
  }
  setTimeout(setOnClick, 15000);
  setTimeout(setHtml, 15000);
  setTimeout(calculateWin,1000);

  return numbers[result];
};
//add clicking after animation ends
wheelCenter.addEventListener('click', randomRotate);

//chip counters and event listeners for numbers
let allNumbers = document.querySelectorAll('.table-number');
let allBets = document.querySelectorAll('.bet');

//hide all chips
allNumbers.forEach((number) => {
  number.childNodes[3].style.display = 'none';
});

//add event listener and show chips
allNumbers.forEach((number) => {
  function placeBet() {
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

  const placeBetTimes = () => {
    for (let i = 0; i < times; i++) {
      console.log(times);
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

let hamburger = document.querySelector(".hamburger")
let about = document.querySelector(".about")
let close = document.querySelector(".close")
const displayAbout = ()=>{
  about.style.transform="translateX(0)"
}
const hideAbout = ()=>{
  about.style.transform="translateX(350px)"
}

hamburger.addEventListener("click",displayAbout)
close.addEventListener("click",hideAbout)

//todos
//pay for wins, 1 to 36, and side bets
//prevent bank from dropping below zero, prevent more bets after that
//prevent betting for last 3 seconds, make a timer from 15 to 0
//if money drops to 0 show my personal links
//bank local storage: take the value of bank from local