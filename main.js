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

const answerDict = {
    "förtrollad": "enchanted",
    // "rymma":"accommodate",
    "förutse": "anticipate",
    // "slag": "blow",
    "erkänna": "confess",
    "lura": "fool",
    "egenskap": "trait",
    "skona": "spare",
    "invecklad": "convoluted",
    "beständig": "persistent",
    "djup": "profound",
    // "trampa ner": "trample",
};

const keyMapping = {
    1: "förtrollad",
    2: "förutse",
    3: "erkänna",
    4: "lura",
    5: "egenskap",
    6: "skona",
    7: "invecklad",
    8: "beständig",
    9: "djup",
}

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
    newBlock.textContent = Object.entries(answerDict)[Math.floor(Math.random() * Object.keys(answerDict).length)][1];
    // newBlock.id = curID;
    // curID += 1;
    //blocks.push(newBlock);
    const newTimer = Math.random() * (timerMax - timerMin + 1) + timerMin;
    spawnTimeout = setTimeout(SpawnBlock, newTimer);
}

function Click(inputID) {
    let answer = keyMapping[inputID];
    blocks = wordArea.childNodes;
    if(blocks.length <= 0) return;
    const answerText = answer.trim();
    if(!answerDict[answerText]){
        console.log("Input answer has no corresponding question");
    }
    else{
        const questionText = answerDict[answerText];
        for(let i = 1; i < blocks.length; i++)
        {
            let block = blocks[i];
            if(block.textContent == questionText.trim()){
                block.remove();
                score += 1;
                console.log(score);
                UpdateScore();
            }
        }
    }
    if(score > 10){
        document.documentElement.style.setProperty("--word-block-speed", "6s");
        timerMax = 3000;
        timerMin = 1200;
    }

    if(score > 20){
        timerMax = 1500;
        timerMin = 500;

        document.documentElement.style.setProperty("--word-block-speed", "3s");
    }

    if(score > 50){
        console.log("test")
        timerMax = 1200;
        timerMin = 200;

        document.documentElement.style.setProperty("--word-block-speed", "2s");
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
    else if(event.key == "q") {
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