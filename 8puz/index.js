var count;
const puzzleBoard = document.getElementById('puzzle-board');
        const message = document.getElementById('message');
        const messageText = document.getElementById('message-text');
        const scrambleButton = document.getElementById('scramble-button');
        const solveButton = document.getElementById('solve-button');
        const initialState = [1, 2, 3, 4, 5, 6, 7, 8, 0]; 
        function createPuzzleBoard(state) {
            puzzleBoard.innerHTML = '';
            state.forEach(tileValue => {
                const tile = document.createElement('div');
                tile.className = 'puzzle-tile';
                tile.textContent = tileValue === 0 ? '' : tileValue;
                tile.addEventListener('click', () => moveTile(tileValue));
                puzzleBoard.appendChild(tile);
            });
        }
        function shufflePuzzle() {
            count=0;
            let currentIndex = initialState.length, randomIndex, temporaryValue;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                temporaryValue = initialState[currentIndex];
                initialState[currentIndex] = initialState[randomIndex];
                initialState[randomIndex] = temporaryValue;
            }
            createPuzzleBoard(initialState);
            message.style.display = 'none';
            document.getElementById("moves").innerHTML=count;
        }
        function moveTile(tileValue) {
            const emptyTileIndex = initialState.indexOf(0);
            const tileIndex = initialState.indexOf(tileValue);
            const adjacentIndices = getAdjacentIndices(emptyTileIndex);
            if (adjacentIndices.includes(tileIndex)) {
                initialState[emptyTileIndex] = tileValue;
                initialState[tileIndex] = 0;
                createPuzzleBoard(initialState);
                count++

                if (isSolved(initialState)) {
                    messageText.textContent = 'Successfully Solved!';
                    message.style.display = 'block';
                    alert("Completed in "+count+"moves" );
                }
            }
            document.getElementById("moves").innerHTML=count;
        }
        function getAdjacentIndices(index) {
            const adjacentIndices = [];
            if (index % 3 !== 0) adjacentIndices.push(index - 1); 
            if (index % 3 !== 2) adjacentIndices.push(index + 1); 
            if (index >= 3) adjacentIndices.push(index - 3);             if (index < 6) adjacentIndices.push(index + 3); 
            return adjacentIndices;
        }
        function isSolved(state) {
            for (let i = 0; i < state.length - 1; i++) {
                if (state[i] !== i + 1) {
                    return false;
                }
            }
            return true;
        }
        window.addEventListener('load', shufflePuzzle);
        scrambleButton.addEventListener('click', shufflePuzzle);
        solveButton.addEventListener('click', shufflePuzzle);

