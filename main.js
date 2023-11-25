let blocks = [];
const wordArea = document.getElementById("word__area");
const scoreText = document.getElementById("score-text");
const root = document.querySelector(":root");

let timerMax = 2000;
let timerMin = 500;

const availableQuestions = [];
const availableAnswers = [];

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

let curID = 0;


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
    setTimeout(SpawnBlock, newTimer);
}

function Click(inputID) {
    let answer = keyMapping[inputID];
    blocks = wordArea.childNodes;
    console.log(blocks);
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

    if(score > 20){
        timerMax = 1500;

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
        if(block.getBoundingClientRect().left >= window.innerWidth){
            block.remove();
            console.log("Removed out of bounds block")
        }
    }
}

function UpdateScore() {
    scoreText.textContent = "Score: " + score;
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

function Start(startButton) {
    if(startButton){
        startButton.remove();
    }
    SpawnBlock();
    setInterval(RemoveBlocks, 100)
}

//Start();