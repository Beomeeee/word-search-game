import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";
import styles from "../styles/ResultPage.module.css";

function ResultPage() {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { playerName, elapsed, foundCount, totalCount } = location.state || {};
  const [players, setPlayers] = useState([]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const playersRef = ref(db, `games/${gameId}/players`);
    const unsubscribe = onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.values(data).sort((a, b) => {
          if (b.foundCount !== a.foundCount) return b.foundCount - a.foundCount;
          return a.elapsed - b.elapsed;
        });
        setPlayers(list);
      }
    });
    return () => unsubscribe();
  }, [gameId]);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.emoji}>🎉</div>
        <h1 className={styles.title}>게임 완료!</h1>
        <p className={styles.playerName}>{playerName}</p>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>찾은 단어</span>
            <span className={styles.statValue}>
              {foundCount} / {totalCount}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>소요 시간</span>
            <span className={styles.statValue}>{formatTime(elapsed)}</span>
          </div>
        </div>

        {/* 순위 */}
        <div className={styles.leaderboard}>
          <h3 className={styles.leaderboardTitle}>최종 순위</h3>
          <ul className={styles.list}>
            {players.map((player, idx) => (
              <li
                key={player.name}
                className={`${styles.item} ${player.name === playerName ? styles.me : ""} ${idx < 3 ? styles[`rank${idx + 1}`] : ""}`}
              >
                <span className={styles.rank}>
                  {idx < 3 ? medals[idx] : idx + 1}
                </span>
                <span className={styles.name}>
                  {player.name}
                  {player.name === playerName && (
                    <span className={styles.meTag}>나</span>
                  )}
                </span>
                <span className={styles.score}>{player.foundCount}개</span>
                <span className={styles.time}>
                  {formatTime(player.elapsed)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.replayBtn}
            onClick={() => navigate(`/game/${gameId}`)}
          >
            다시 하기
          </button>
          <button
            className={styles.homeBtn}
            onClick={() => navigate(`/game/${gameId}`)}
          >
            로비로 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
