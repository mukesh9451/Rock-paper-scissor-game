const element = document.querySelector(".btn1")
element.addEventListener("click", () => playgames("rock"))


const element1 = document.querySelector(".btn2")
element1.addEventListener("click", () => playgames("paper"))

let element2 = document.querySelector(".btn3")
element2.addEventListener("click", () => playgames("scissor"))

document.querySelector(".btn5").addEventListener("click",()=>autoplay())

let element3 = document.querySelector(".btn4")
element3.addEventListener("click", function () {
    score.wins = 0
    score.losses = 0
    score.ties = 0
    localStorage.removeItem('score');
    updatescore();
})





let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updatescore();
/*if(!score){
    score={
        win:0,
        losses:0,
        ties:0
    };
}*/
let isAutoplaying=false;
let intervalId;
function autoplay(){
    if(!isAutoplaying){
 intervalId=setInterval(function(){
    const playermoves=pickcomputermove();
    playgames(playermoves);
},1000);
isAutoplaying=true;

}
else {
    clearInterval(intervalId);
    isAutoplaying=false;
}
}

function pickcomputermove() {
    let num = Math.random()
    let result = '';

    if (num > 0 && num < 1 / 3) {
        result = 'rock'
    }
    else if (num > 1 / 3 && num < 2 / 3) {
        result = 'paper'
    }
    else if (num > 2 / 3 && num < 1) {
        result = 'scissor'
    }
    return result;
}



function playgames(playermoves) {
    const computermoves = pickcomputermove()
    let result = '';
    if (playermoves === 'rock') {
        if (computermoves === 'rock') {
            result = 'tie'
        }
        else if (computermoves === 'paper') {
            result = 'you lose'
        }
        else if (computermoves === 'scissor') {
            result = 'you win'
        }
    }
    else if (playermoves === 'paper') {
        if (computermoves === 'rock') {
            result = 'you win'
        }
        else if (computermoves === 'paper') {
            result = 'tie'
        }
        else if (computermoves === 'scissor') {
            result = 'you lose'
        }
    }
    else if (playermoves === 'scissor') {
        if (computermoves === 'rock') {
            result = 'you lose'
        }
        else if (computermoves === 'paper') {
            result = 'you win'
        }
        else if (computermoves === 'scissor') {
            result = 'tie'
        }
    }
    if (result === 'you win') {
        score.wins += 1
    }
    else if (result === 'you lose') {
        score.losses += 1
    }
    else if (result === 'tie') {
        score.ties += 1
    }

    localStorage.setItem('score', JSON.stringify(score));

    updatescore();

    document.querySelector(".result1").innerHTML = result;
    document.querySelector(".moves1").innerHTML = `You
                <img class="image" src="image/${playermoves}.png" >
                <img class="image" src="image/${computermoves}.png" >
                Computer`;
    
}
function updatescore() {
    document.querySelector(".score1").innerHTML = `wins:${score.wins}, losses:${score.losses}, ties:${score.ties}`;
}