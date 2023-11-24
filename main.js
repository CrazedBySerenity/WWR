const blocks = [];
const wordArea = document.getElementById("word__area");

const timerMax = 2000;
const timerMin = 500;


function SpawnBlock() {
    console.log("Spawned element")
    const newBlock = document.createElement("div");
    wordArea.append(newBlock);
    newBlock.classList.add("word__block");
    blocks.push(newBlock);

    const newTimer = Math.random() * (timerMax - timerMin + 1) + timerMin;
    setTimeout(SpawnBlock, newTimer);
}

function Click() {
    if(blocks.length <= 0) return;
}

function RemoveBlocks() {
    blocks.forEach((block) => {
        if(block.style.left >= window.innerWidth + block.offsetWidth){
            block.remove();
            blocks = blocks.filter((item) => {item != block});
        }
    });
}

SpawnBlock();
setInterval(RemoveBlocks, 100)