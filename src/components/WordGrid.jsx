import { useState } from "react";
import styles from "../styles/WordGrid.module.css";

function WordGrid({ grid, placedWords, foundWords, onWordFound }) {
  const [selecting, setSelecting] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [startCell, setStartCell] = useState(null);

  const getSelectedCells = (start, end) => {
    if (!start || !end) return [];
    const dr = end.row - start.row;
    const dc = end.col - start.col;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    if (steps === 0) return [start];

    // 8방향만 허용
    const validDir = dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
    if (!validDir) return [start];

    const rowStep = dr === 0 ? 0 : dr / Math.abs(dr);
    const colStep = dc === 0 ? 0 : dc / Math.abs(dc);

    const cells = [];
    for (let i = 0; i <= steps; i++) {
      cells.push({
        row: start.row + rowStep * i,
        col: start.col + colStep * i,
      });
    }
    return cells;
  };

  const handleMouseDown = (row, col) => {
    setSelecting(true);
    setStartCell({ row, col });
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row, col) => {
    if (!selecting || !startCell) return;
    const cells = getSelectedCells(startCell, { row, col });
    setSelectedCells(cells);
  };

  const handleMouseUp = () => {
    if (selectedCells.length > 1) {
      const selectedWord = selectedCells
        .map(({ row, col }) => grid[row][col])
        .join("");
      const reversedWord = [...selectedCells]
        .reverse()
        .map(({ row, col }) => grid[row][col])
        .join("");

      const matched = placedWords.find(
        (p) => p.word === selectedWord || p.word === reversedWord,
      );

      if (matched && !foundWords.includes(matched.word)) {
        onWordFound(matched.word);
      } else if (!matched) {
        onWordFound(null); // 틀림
      }
    }
    setSelecting(false);
    setSelectedCells([]);
    setStartCell(null);
  };

  const isSelected = (row, col) =>
    selectedCells.some((c) => c.row === row && c.col === col);

  const isFound = (row, col) => {
    for (const { word, row: wr, col: wc, dir } of placedWords) {
      if (!foundWords.includes(word)) continue;
      for (let i = 0; i < word.length; i++) {
        if (wr + dir[0] * i === row && wc + dir[1] * i === col) return true;
      }
    }
    return false;
  };

  return (
    <div className={styles.grid} onMouseLeave={handleMouseUp}>
      {grid.map((row, rIdx) =>
        row.map((letter, cIdx) => {
          const found = isFound(rIdx, cIdx);
          const selected = isSelected(rIdx, cIdx);
          return (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`${styles.cell} ${found ? styles.found : ""} ${selected ? styles.selected : ""}`}
              onMouseDown={() => handleMouseDown(rIdx, cIdx)}
              onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
              onMouseUp={handleMouseUp}
            >
              {letter}
            </div>
          );
        }),
      )}
    </div>
  );
}

export default WordGrid;
