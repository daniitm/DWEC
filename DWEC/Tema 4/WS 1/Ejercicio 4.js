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
                }
            };

        }
    }
};