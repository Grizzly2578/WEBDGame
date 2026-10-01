let opt = "<option value=''>select</option>";
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

function openMe(td) {
    let bomb = td.dataset.bomb;
    if (bomb == 1) {
        td.style.backgroundColor = "red";
        alert("Game Over! You clicked on a bomb.");
    }
    else {
        td.style.backgroundColor = "green";
    }   
}

function generateGame() {
    let rows = document.getElementById("selectRows").value;
    let columns = document.getElementById("selectColumns").value;
    let bombs = document.getElementById("selectBombs").value;
    let table = "<table class='table-bordered' id='gameTable'>";
    bombsLocation = [];

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
    console.log("Bombs Location:", bombsLocation);
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