import styles from "../styles/Leaderboard.module.css";

function Leaderboard({ players }) {
  const sorted = [...players].sort((a, b) => {
    if (b.foundCount !== a.foundCount) return b.foundCount - a.foundCount;
    return a.elapsed - b.elapsed;
  });

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>현황판</h3>
      <ul className={styles.list}>
        {sorted.map((player, idx) => (
          <li
            key={player.name}
            className={`${styles.item} ${idx < 3 ? styles[`rank${idx + 1}`] : ""}`}
          >
            <span className={styles.rank}>
              {idx < 3 ? medals[idx] : idx + 1}
            </span>
            <span className={styles.name}>{player.name}</span>
            <span className={styles.score}>{player.foundCount}개</span>
            <span className={styles.time}>{formatTime(player.elapsed)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default Leaderboard;
