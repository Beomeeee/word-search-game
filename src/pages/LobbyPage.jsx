import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import styles from "../styles/LobbyPage.module.css";

function LobbyPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      const gameRef = ref(db, `games/${gameId}`);
      const snapshot = await get(gameRef);
      if (snapshot.exists()) {
        setGame(snapshot.val());
      } else {
        alert("게임을 찾을 수 없어요!");
      }
    };
    fetchGame();
  }, [gameId]);

  const handleStart = () => {
    if (!playerName.trim()) return alert("이름을 입력해주세요!");
    navigate(`/game/${gameId}/play`, { state: { playerName } });
  };

  if (!game) return <div className={styles.loading}>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{game.title}</h1>
        <p className={styles.description}>{game.description}</p>
        <p className={styles.wordCount}>단어 {game.words.length}개</p>

        <div className={styles.formGroup}>
          <label>이름을 입력하세요</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder="닉네임 입력"
          />
        </div>

        <button className={styles.startBtn} onClick={handleStart}>
          Start!
        </button>
      </div>
    </div>
  );
}

export default LobbyPage;
