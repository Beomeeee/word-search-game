import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { ref, get, set, onValue } from "firebase/database";
import { generatePuzzle } from "../utils/puzzleGenerator";
import WordGrid from "../components/WordGrid";
import WordList from "../components/WordList";
import Leaderboard from "../components/Leaderboard";
import styles from "../styles/GamePage.module.css";

function GamePage() {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = location.state?.playerName || "Guest";

  const [game, setGame] = useState(null);
  const [grid, setGrid] = useState([]);
  const [placedWords, setPlacedWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [players, setPlayers] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [wrongFlash, setWrongFlash] = useState(false);
  const timerRef = useRef(null);

  // 게임 데이터 불러오기
  useEffect(() => {
    const fetchGame = async () => {
      const gameRef = ref(db, `games/${gameId}`);
      const snapshot = await get(gameRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setGame(data);
        const { grid, placedWords } = generatePuzzle(data.words);
        setGrid(grid);
        setPlacedWords(placedWords);
      }
    };
    fetchGame();
  }, [gameId]);

  // 타이머
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // 현황판 실시간 구독
  useEffect(() => {
    const playersRef = ref(db, `games/${gameId}/players`);
    const unsubscribe = onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.values(data);
        setPlayers(list);
      }
    });
    return () => unsubscribe();
  }, [gameId]);

  // 내 플레이어 데이터 Firebase에 저장
  useEffect(() => {
    if (!game) return;
    const playerRef = ref(db, `games/${gameId}/players/${playerName}`);
    set(playerRef, {
      name: playerName,
      foundCount: foundWords.length,
      elapsed,
    });
  }, [foundWords, elapsed, game]);
  // 게임 완료 감지
  useEffect(() => {
    if (!game) return;
    if (foundWords.length === game.words.length) {
      clearInterval(timerRef.current);
      setTimeout(() => {
        const result = window.confirm(
          `🎉 축하해요! 모든 단어를 찾았어요!\n소요 시간: ${formatTime(elapsed)}\n\n새 게임을 만들러 갈까요?`,
        );
        if (result) navigate("/maker");
      }, 300);
    }
  }, [foundWords, game]);

  const handleWordFound = (word) => {
    if (word && !foundWords.includes(word)) {
      setFoundWords((prev) => [...prev, word]);
    } else if (!word) {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 600);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!game || grid.length === 0) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.page}>
      {/* 상단 헤더 */}
      <div className={`${styles.header} ${wrongFlash ? styles.wrong : ""}`}>
        <div>
          <h1 className={styles.gameTitle}>{game.title}</h1>
          <p className={styles.gameDesc}>{game.description}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className={styles.timer}>{formatTime(elapsed)}</div>
          {foundWords.length === game.words.length && (
            <p style={{ color: "#4f46e5", fontWeight: 700, margin: 0 }}>
              🎉 완료!
            </p>
          )}
        </div>
      </div>

      {/* 메인 게임 영역 */}
      <div className={styles.main}>
        {/* 좌측 단어 목록 */}
        <WordList words={game.words} foundWords={foundWords} />

        {/* 중앙 퍼즐 격자 */}
        <WordGrid
          grid={grid}
          placedWords={placedWords}
          foundWords={foundWords}
          onWordFound={handleWordFound}
        />

        {/* 우측 현황판 */}
        <Leaderboard players={players} />
      </div>
    </div>
  );
}

export default GamePage;
