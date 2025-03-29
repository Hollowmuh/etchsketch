
function createGrid(size) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const squareSize = container.clientWidth / size;
    const totalSquares = size * size;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.interactions = 0; // Initialize interactions counter
        square.addEventListener('mouseover', handleSquareInteraction);
        container.appendChild(square);
    }
}
function handleSquareInteraction(e) {
    const square = e.target;
    const interactions = parseInt(square.dataset.interactions) || 0;
    
    if (interactions === 0) {
        // First interaction - set random RGB color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.dataset.baseColor = `${r},${g},${b}`;
    }
    
    // Get base color and calculate darkness
    const [r, g, b] = square.dataset.baseColor.split(',').map(Number);
    const darkenAmount = (interactions + 1) * 0.1; // 10% darker each time
    
    // Apply darkened color
    const newR = Math.floor(r * (1 - darkenAmount));
    const newG = Math.floor(g * (1 - darkenAmount));
    const newB = Math.floor(b * (1 - darkenAmount));
    
    square.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
    
    // Increment interactions counter (max 10)
    square.dataset.interactions = Math.min(interactions + 1, 10);
}

function promptForGridSize() {
    const size = +prompt('Enter the number of squares per side:', '16');
    if (size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert('Invalid input. Please try again.');
    }
}
function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = '';
        square.dataset.interactions = 0;
    });
}

createGrid(16);
