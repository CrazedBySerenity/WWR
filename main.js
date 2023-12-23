let blocks = [];
const wordArea = document.getElementById("word__area");
const scoreText = document.getElementById("score-text");
const livesText = document.getElementById("lives-text");
const restartButton = document.getElementById("restart-button");
const root = document.querySelector(":root");

let timerMax = 5000;
let timerMin = 3000;

const availableQuestions = [];
const availableAnswers = [];

let spawnTimeout = undefined;
let removeBlocksInterval = undefined;

// Make answerDict an object, add text and color
// Make the key map directly to the answerdict

const answerDict = {
    1: {name: "Viktor", color: "rgb(186, 255, 201)"},
    2: {name: "Agnes", color: "rgb(186, 225, 255)"},
    3: {name: "Alice", color: "rgb(255, 255, 186)"},
    4: {name: "Hampus", color: "rgb(255, 223, 186)"},
    5: {name: "Anders", color: "rgb(255, 179, 186)"},
    6: {name: "Stina", color: "rgb(220, 194, 224)"},
    // "förtrollad": "enchanted",
    // "rymma":"accommodate",
    // "förutse": "anticipate",
    // "slag": "blow",
    // "erkänna": "confess",
    // "lura": "fool",
    // "egenskap": "trait",
    // "skona": "spare",
    // "invecklad": "convoluted",
    // "beständig": "persistent",
    // "djup": "profound",
    // "trampa ner": "trample",
};

let score = 0;
let lives = 3;

function Start(startButton) {
    if(startButton){
        startButton.style.display = "none";
    }
    SpawnBlock();
    removeBlocksInterval = setInterval(RemoveBlocks, 100);
}

function Restart(){
    window.location.reload();
}

function SpawnBlock() {
    console.log("Spawned element")
    const newBlock = document.createElement("div");
    wordArea.append(newBlock);
    newBlock.classList.add("word__block");
    newBlock.classList.add("word__block--move");
    let newBlockID = Math.floor(Math.random() * 6) + 1;
    console.log(newBlockID);
    //newBlock.style.backgroundColor = Object.entries(answerDict)[newBlockID][1].color;
    newBlock.style.backgroundColor = answerDict[newBlockID].color;
    newBlock.textContent = "";

    let newBlockRect = newBlock.getBoundingClientRect();
    let baseTop = newBlockRect.top;
    let gameAreaHeight =  wordArea.getBoundingClientRect().height;
    let topModifier = Math.random() * (gameAreaHeight / 2 - newBlockRect.height / 2 - gameAreaHeight / 2 * -1 - newBlockRect.height) + gameAreaHeight / 2 * -1;
    newBlock.style.top = baseTop + topModifier + "px";
    console.log(topModifier);
    // newBlock.id = curID;
    // curID += 1;
    //blocks.push(newBlock);
    const newTimer = Math.random() * (timerMax - timerMin + 1) + timerMin;
    spawnTimeout = setTimeout(SpawnBlock, newTimer);
}

function Click(inputID) {
    let answer = inputID;
    blocks = wordArea.children;
    if(blocks.length <= 0) return;
    const answerText = answer;
    if(!answerDict[answerText]){
        console.log("Input answer has no corresponding question");
    }
    else{
        const questionText = answerDict[answerText].color;
        for(let i = 1; i < blocks.length; i++)
        {
            let block = blocks[i];
            console.log(block.style.backgroundColor)
            if(block.style.backgroundColor == questionText.trim()){
                // Remove after a timeout, add animation inbetween
                let position = block.getBoundingClientRect().left;
                let anim = Math.floor(Math.random() * 2);
                let animName = "word__block--destroy" + parseInt(anim);
                console.log(typeof animName);
                console.log(animName)
                block.classList.replace("word__block--move", animName);
                block.style.left = position + "px";
                console.log("destroyed block");
                setTimeout(() => {
                    block.remove();
                }, 290)
                score += 1;
                console.log(score);
                UpdateScore();
            }
        }
    }

    // Adjust difficulty and add scaling
    if(score >= 3){
        document.documentElement.style.setProperty("--word-block-speed", "6s");
        timerMax = 3000;
        timerMin = 1200;
    }

    if(score >= 15){
        timerMax = 1500;
        timerMin = 500;

        document.documentElement.style.setProperty("--word-block-speed", "3s");
    }

    if(score >= 20){
        timerMax = 1000;
        timerMin = 100;
    }

    if(score >= 50){
        timerMax = 800;
        timerMin = 50;

        document.documentElement.style.setProperty("--word-block-speed", "2s");
    }

    if(score >= 150){
        timerMax = 300;
    }
}

function RemoveBlocks() {
    blocks = wordArea.childNodes;
    for(let i = 1; i < blocks.length; i++){
        let block = blocks[i];
        //console.log(blocks);
        //console.log(block.getBoundingClientRect().left + " : " + window.innerWidth + " + " + block.offsetWidth)
        try{
            if(block.getBoundingClientRect().left >= window.innerWidth){
            block.remove();
            console.log("Removed out of bounds block")
            lives -= 1;
            console.log(lives);
            UpdateLives();
        }
        }
        catch {
            console.log("error when removing block");
        }
    }
}

function UpdateScore() {
    scoreText.textContent = "Score: " + score;
}

function UpdateLives() {
    livesText.textContent = "Lives: " + lives;
    if(lives == 1){
        livesText.style.color = "red";
    }
    else if(lives <= 0){
        console.log("game over");
        clearTimeout(spawnTimeout);
        clearInterval(removeBlocksInterval);
        restartButton.style.display = "block";

        let wordBlocks = document.getElementsByClassName("word__block");
        wordBlocks = Array.from(wordBlocks);
        wordBlocks.forEach((block) => {
            block.remove();
        });
    }
}

document.addEventListener('keydown', function(event) {
    if(event.key == 1) {
        Click(1);
    }
    else if(event.key == 2) {
        Click(2);
    }
    else if(event.key == 3) {
        Click(3);
    }
    else if(event.key == 4) {
        Click(4);
    }
    else if(event.key == 5) {
        Click(5);
    }
    else if(event.key == 6) {
        Click(6);
    }
    else if(event.key == "w") {
        Click(7);
    }
    else if(event.key == "e") {
        Click(8);
    }
    else if(event.key == "r") {
        Click(9);
    }
});

//Start();