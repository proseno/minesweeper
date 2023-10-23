const map = [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1]
];

const openMap = identifyMapping(map);

init();

function init() {
    let table = document.createElement('table');
    table.classList.add("game-table");
    table.setAttribute("id", "game-table");

    let tbody = document.createElement('tbody');
    
    map.forEach((row, rowInd) => {
        let trow = document.createElement('tr');
        trow.classList.add("game-row");
        row.forEach((def, row) => {
            let buttonId = genereateId(rowInd, row);
            let button = generateButton(buttonId);
            trow.appendChild(generateDefinition(button));
        });
        tbody.appendChild(trow);

    });

    table.appendChild(tbody);
    
    document.getElementById('body').appendChild(table);
}

function generateDefinition(button) {
    let tdef = document.createElement('td');
    tdef.classList.add("game-definition");
    tdef.appendChild(button);
    return tdef;
}

function generateButton(id) {
    let button = document.createElement('button');
    button.classList.add("field-button");
    button.setAttribute("id", id);
    button.onclick = function() {
        let endGame = isBomb(this.id);
        console.log(endGame ? "Is bomb": "Empty");

        if (endGame) {
            // this.style.display = "none";
            this.textContent = "Bomb";
            this.disabled = true;
            failedGame();
        } else {
            // this.style.display = "none";
            let [row, def] = this.id.split(";");
            this.textContent = openMap[row][def];
            this.disabled = true;
        }

    }
    return button;
}

function failedGame() {
    let table = document.getElementById("game-table");
    table.disabled = true;
    alert("You loosse");
}

function isBomb(id) {
    let [row, def] = id.split(";");
    return checkBomb(row, def);
}

function checkBomb(row, def) {
    return !!map[row][def];
}

function genereateId(row, def) {
    return "" + row + ";" + def;
}

function identifyMapping(map) {
    const cases = [
        // x and y change
        [-1, 0],// case1 = x-1, y
        [-1, 1],// case2 = x-1, y+1
        [0, 1],// case3 = x, y+1
        [1, 1],// case4 = x+1, y+1
        [1, 0],// case5 = x+1, y
        [1, -1],// case6 = x+1, y-1
        [0, -1],// case7 = x, y-1
        [-1, -1]// case8 = x-1, y-1
    ]
    let openMap = [[],[],[],[]];
    map.forEach((row, rowIndex) => {
        row.forEach((def, defIndex) => {
            let count = 0;

            if (checkBomb(rowIndex, defIndex)) {
                openMap[rowIndex][defIndex] = count;
                return;
            }
            cases.forEach((value) => {;
                let x = rowIndex + value[0];
                let y = defIndex + value[1];
                if (x < 0 || x >= row.length || y < 0 || y >= row.length) {
                    return;
                }
                count += +map[x][y];
            })

            openMap[rowIndex][defIndex] = count;
        });
    });
    return openMap;
}