window.onload = function() {
    const canvas = document.getElementById("canvas");

    for (let i = 0; i < 100; i++) {
        const row = canvas.insertRow();

        for (let j = 0; j < 100; j++) {
            const cell = row.insertCell();

            cell.onmousemove = function(event) {
                if (event.ctrlKey) {
                    cell.style.backgroundColor = "red";
                } else if (event.shiftKey) {
                    cell.style.backgroundColor = "blue";
                } else if (event.buttons === 1) { 
                        cell.style.backgroundColor = "white";
                }
            };
        }
    }
    clear.onclick = function() {
        for (let i = 0; i < canvas.rows.length; i++) {
            for (let j = 0; j < canvas.rows[i].cells.length; j++) {
                canvas.rows[i].cells[j].style.backgroundColor = "white";
            }
        }
    };
};