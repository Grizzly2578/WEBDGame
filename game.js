let opt = "<option value=''>select</option>";
let finalMultiplier = 1;
let survivalProbability = 1;
let fairMultiplier = 1;

isGameOver = false;
let bombsLocation = [];
for (let i = 1; i <= 30; i++) {
    opt += `<option value="${i}">${i}</option>`;
}

document.getElementById("selectRows").innerHTML = opt;
document.getElementById("selectColumns").innerHTML = opt;
document.getElementById("selectBombs").innerHTML = opt;


function checkBox(r,c) {
    let result = 0;
    for (let i = 0; i < bombsLocation.length; i++) {
        let bomb = bombsLocation[i];
        if (bomb.row === r && bomb.col === c) {
            result = 1;
            break;
        }
    }
    return result;
}

function revealAllUnexplodedBombs(clickedTd) {
    let table = document.getElementById("gameTable");
    let unexplodedBombImage = document.createElement("img");
    unexplodedBombImage.src = "assets/images/bomb.png";
    unexplodedBombImage.style.width = "100%";
    unexplodedBombImage.style.height = "100%";
    for (let r = 0; r < table.rows.length; r++) {
        for (let c = 0; c < table.rows[r].cells.length; c++) {
            let td = table.rows[r].cells[c];
            if (clickedTd !== td && td.dataset.bomb === "1" && td.dataset.status === "0") {
                let bombImg = document.createElement("img");
                bombImg.src = "assets/images/bomb.png";
                bombImg.style.width = "100%";
                bombImg.style.height = "100%";
                td.innerHTML = "";
                td.appendChild(bombImg);
                td.dataset.status = "1"; // Mark the cell as opened
            }
        }
    }
}

function openMe(td) {
    if (isGameOver) return;

    let bomb = td.dataset.bomb;


    if (bomb == 1) {
        isGameOver = true;
        let explosionImg = document.createElement("img");
        explosionImg.src = "assets/images/explosion.png";
        explosionImg.style.width = "100%";
        explosionImg.style.height = "100%";
        td.innerHTML = "";
        td.appendChild(explosionImg);
        td.dataset.status = "1"; // Mark the cell as opened
        revealAllUnexplodedBombs(td);
        alert("Game Over! You hit a bomb.");
    }
    else {
        let safeImg = document.createElement("img");
        safeImg.src = "assets/images/safe.png";
        safeImg.style.width = "100%";
        safeImg.style.height = "100%";
        td.innerHTML = "";
        td.appendChild(safeImg);
        td.dataset.status = "1"; // Mark the cell as opened
    }
}

function factorialRecursive(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1; // Base case
  
  return n * factorialRecursive(n - 1);
}

function binomialCoefficient(n, k) {
    if (k < 0 || k > n) return 0;
    return factorialRecursive(n) / (factorialRecursive(k) * factorialRecursive(n - k));
}



function generateGame() {
    isGameOver = false;
    let rows = document.getElementById("selectRows").value;
    let columns = document.getElementById("selectColumns").value;
    let bombs = document.getElementById("selectBombs").value;
    let betAmount = document.getElementById("inputBetAmount").value;

    if (!rows || !columns || !bombs || !betAmount) {
        alert("Please select the number of rows, columns, bombs, and enter a bet amount.");
        return;
    }

    let table = "<table class='table-bordered' id='gameTable'>";
    bombsLocation = [];

    if ((rows * columns) < bombs) {
            alert("Number of bombs cannot be greater than the total number of cells.");
            return;
        }

    let x = 0;

    while (x < bombs) {
        let i = Math.floor(Math.random() * rows);
        let j = Math.floor(Math.random() * columns);
        

        if(bombsLocation.length ==0){
            bombsLocation.push({
                row:i,
                col:j
            });
            x++;
        }else{
            if(checkBox(i,j) == 0){
                bombsLocation.push({
                    row:i,
                    col:j
                });
                x++;
            }
        }
    }
    // console.log("Bombs Location:", bombsLocation);
    if (rows && columns && bombs) {
        
        for (let r = 0; r < rows; r++) {
            table += "<tr>";
            for (let c = 0; c < columns; c++) {
                let bomb=0;
                if(checkBox(r,c) == 1)
                    bomb = 1;

                table += "<td style='width: 100px; height: 100px;' data-status='0' onclick='openMe(this)' data-bomb='"+bomb+"'>"+"</td>";
            }
            table += "</tr>";
        }
        table += "</tbody>";
    } else {
        alert("Please select the number of rows, columns, and bombs.");
    }
    document.getElementById("gameDisplay").innerHTML = table;
}

function claim() {
    if (isGameOver) {
        alert("Game is over. You cannot claim.");
        return;
    }

    let betAmount = document.getElementById("inputBetAmount").value;

    if (!betAmount) {
        alert("Please enter a bet amount.");
        return;
    }

    // Calculate the potential winnings based on the final multiplier
    let potentialWinnings = betAmount * finalMultiplier;

    alert("You have claimed your winnings: " + potentialWinnings);
}
