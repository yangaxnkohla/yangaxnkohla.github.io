function generateLotto() {
    let winning_numbers = getRandom(51);
    for (let i = 0; i < winning_numbers.length; i++) {
        setTimeout(function () {
            let ball = document.getElementById("lotto_ball" + (i + 1));
            ball.innerHTML = winning_numbers[i];
            setBallColor(ball, winning_numbers[i]);
        }, 3000 * i);
    }
    setInputColor();
}

function generatePowerBall() {
    let winning_numbers = getRandom(49);
    for (let i = 0; i < winning_numbers.length; i++) {
        setTimeout(function () {
            let ball = document.getElementById("power_ball" + (i + 1));
            if (i != winning_numbers.length - 1) {
                ball.innerHTML = winning_numbers[i];
                setBallColor(ball, winning_numbers[i]);
            } else {
                let rand = Math.round(1 + Math.random() * 19);
                while (winning_numbers.includes(rand)) {
                    rand = Math.round(1 + Math.random() * 19);
                }
                ball.innerHTML = rand;
                setBallColor(ball, rand);
            }
        }, 3000 * i);
    }
    setInputColor();
}

const sleep = async (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay));
};

const generateAll = async () => {
    sleep(1000).then(() => {
        generateLotto();
    });
    sleep(2000).then(() => {
        generatePowerBall();
    });
    setInputColor();
}

function getRandom(max) {
    let random_arr = [];
    for (let i = 0; i < 6; i++) {
        let rand = Math.round(1 + Math.random() * max);
        while (random_arr.includes(rand)) {
            rand = Math.round(1 + Math.random() * max);
        }
        random_arr.push(rand);
    }
    return random_arr;
}

function reset() {
    for (let i = 0; i <= 6; i++) {
        let ball = document.getElementById("lotto_ball" + i);
        ball.innerHTML = "0";
        ball.style.backgroundColor = "rgb(255, 187, 0);";
    }
}

function setBallColor(ball, value) {
    // ball.style.transition = "opacity .5s ease-in-out";
    if (value >= 1 && value <= 13) {//red
        ball.style.backgroundColor = "#ff674c";
    }
    if (value >= 14 && value <= 25) {//orange
        ball.style.backgroundColor = "#ffc04c";
    }
    if (value >= 26 && value <= 37) {//green
        ball.style.backgroundColor = "lightgreen";
    }
    if (value >= 38 && value <= 52) {//blue
        ball.style.backgroundColor = "#4ce4ff";
    }
}

function setInputColor(){
    for(let i = 0; i < 6; i++){
        let input = document.getElementById("guess"+(i+1));
        let value = input.innerHTML;
        if (value >= 1 && value <= 13) {//red
            input.style.backgroundColor = "#ff674c";
        }
        if (value >= 14 && value <= 25) {//orange
            input.style.backgroundColor = "#ffc04c";
        }
        if (value >= 26 && value <= 37) {//green
            input.style.backgroundColor = "lightgreen";
        }
        if (value >= 38 && value <= 52) {//blue
            input.style.backgroundColor = "#4ce4ff";
        }
    }
}