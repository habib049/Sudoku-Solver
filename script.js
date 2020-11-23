window.addEventListener('load', (event) => {
    let table = document.getElementById('sudoku-grill');
    let temp_board = [[], [], [], [], [], [], [], [], []]
    let board = [[], [], [], [], [], [], [], [], []]

    let data_object = []

    function getCellValues() {

        for (let r = 0; r < table.rows.length; r++) {
            for (let c = 0; c < table.rows[r].cells.length; c++) {
                if (table.rows[r].cells[c].innerHTML === "") {
                    board[r][c] = 0
                    temp_board[r][c] = 0
                } else {
                    board[r][c] = parseInt(table.rows[r].cells[c].innerHTML);
                    temp_board[r][c] = parseInt(table.rows[r].cells[c].innerHTML);
                }

            }
        }
    }


    function solve() {
        let empty = get_next_empty();
        if (empty === 0) {
            return true
        }
        for (let i = 0; i < 10; i++) {
            if (check_validity(i, empty)) {
                board[empty[0]][empty[1]] = i;
                data_object.push({'x': empty[0], 'y': empty[1], 'exact_number': i})
                if (solve()) {
                    return true
                }
                board[empty[0]][empty[1]] = 0;
            }
        }
    }

    function get_next_empty() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return 0;
    }


    function check_validity(number, position) {
        // row comparison
        for (let i = 0; i < board[0].length; i++) {
            if (board[position[0]][i] === number && position[1] !== i)
                return false
        }

        for (let i = 0; i < board.length; i++) {
            if (board[i][position[1]] === number && position[0] !== i)
                return false
        }

        // checking in box
        let box_x_position = Math.floor(position[1] / 3);
        let box_y_position = Math.floor(position[0] / 3);
        for (let i = box_y_position * 3; i < box_y_position * 3 + 3; i++) {
            for (let j = box_x_position * 3; j < box_x_position * 3 + 3; j++) {
                if (board[i][j] === number && [i, j] !== position) {
                    return false
                }
            }
        }
        return true;
    }

    function reset() {
        let table = document.getElementById('sudoku-grill');
        for (let r = 0; r < temp_board.length; r++) {
            for (let c = 0; c < temp_board[0].length; c++) {
                if (temp_board[r][c] === 0) {
                    table.rows[r].cells[c].innerHTML = "";
                    table.rows[r].cells[c].style.backgroundColor = "#ffffff";
                    table.rows[r].cells[c].style.border = "1px solid black";
                    table.rows[r].cells[c].style.color = "black";
                } else {
                    table.rows[r].cells[c].innerHTML = temp_board[r][c];

                }
            }
        }
    }

    function disable_buttons() {
        document.getElementById("solve").disabled = true;
        document.getElementById("reset").disabled = true;
    }

    function enable_buttons() {
        document.getElementById("solve").disabled = false;
        document.getElementById("reset").disabled = false;
    }

    let i = 0;
    let interval;

    function solution() {
        getCellValues();

        solve();
        interval = setInterval(function () {

            table.rows[data_object[i].x].cells[data_object[i].y].style.border = "none";
            table.rows[data_object[i].x].cells[data_object[i].y].style.backgroundColor = "#478a6a";
            i++;
            show_results(i)

        }, 100);


    }

    let new_interval;
    let array_size = 0;
    let array_count = 0;

    function show_results(i) {
        if (i === data_object.length) {
            clearInterval(interval);
        } else {
            table.rows[data_object[i].x].cells[data_object[i].y].innerHTML = data_object[i].exact_number.toString();
            table.rows[data_object[i].x].cells[data_object[i].y].style.backgroundColor = "red";
            table.rows[data_object[i].x].cells[data_object[i].y].style.color = "#ffffff";
        }
    }

    document.getElementById('solve').addEventListener('click', solution);
    document.getElementById('reset').addEventListener('click', reset);


});
