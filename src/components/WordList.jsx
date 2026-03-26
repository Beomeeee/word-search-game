import styles from "../styles/WordList.module.css";

function WordList({ words, foundWords }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>단어 목록</h3>
      <ul className={styles.list}>
        {words.map((word) => (
          <li
            key={word}
            className={`${styles.item} ${
              foundWords.includes(word) ? styles.found : ""
            }`}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordList;
