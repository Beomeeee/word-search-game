const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

export function generatePuzzle(words, size = 15) {
  const grid = Array.from({ length: size }, () => Array(size).fill(""));
  const placedWords = [];

  for (const word of words) {
    const placed = placeWord(grid, word, size);
    if (placed) placedWords.push({ word, ...placed });
  }

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placedWords };
}

function placeWord(grid, word, size) {
  const shuffledDirs = [...DIRECTIONS].sort(() => Math.random() - 0.5);

  for (let attempt = 0; attempt < 100; attempt++) {
    const dir = shuffledDirs[attempt % shuffledDirs.length];
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (canPlace(grid, word, row, col, dir, size)) {
      for (let i = 0; i < word.length; i++) {
        grid[row + dir[0] * i][col + dir[1] * i] = word[i];
      }
      return { row, col, dir };
    }
  }
  return null;
}

function canPlace(grid, word, row, col, dir, size) {
  for (let i = 0; i < word.length; i++) {
    const r = row + dir[0] * i;
    const c = col + dir[1] * i;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] !== "" && grid[r][c] !== word[i]) return false;
  }
  return true;
}
