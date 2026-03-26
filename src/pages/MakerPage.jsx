import { useState } from "react";
import { db } from "../firebase/firebase";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MakerPage.module.css";

function MakerPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [words, setWords] = useState([]);

  const addWord = () => {
    const trimmed = wordInput.trim().toUpperCase();
    if (!trimmed) return;
    if (words.includes(trimmed)) return;
    setWords([...words, trimmed]);
    setWordInput("");
  };

  const removeWord = (word) => {
    setWords(words.filter((w) => w !== word));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요!");
    if (words.length < 10) return alert("단어를 10개 이상 입력해주세요!");

    const gameData = {
      title,
      description,
      words,
      createdAt: Date.now(),
    };

    const gamesRef = ref(db, "games");
    const newGame = await push(gamesRef, gameData);
    const gameId = newGame.key;

    alert(`게임이 생성됐어요!\n링크: /game/${gameId}`);
    navigate(`/game/${gameId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Word Search Maker</h1>

      <div className={styles.formGroup}>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게임 제목을 입력하세요"
        />
      </div>

      <div className={styles.formGroup}>
        <label>설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="게임 설명을 입력하세요"
        />
      </div>

      <div className={styles.formGroup}>
        <label>단어 추가 (영어, 최소 10개)</label>
        <div className={styles.wordInputRow}>
          <input
            type="text"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addWord()}
            placeholder="영어 단어 입력 후 Enter"
          />
          <button onClick={addWord}>추가</button>
        </div>
      </div>

      <div className={styles.wordList}>
        {words.map((word) => (
          <span key={word} className={styles.wordTag}>
            {word}
            <button onClick={() => removeWord(word)}>×</button>
          </span>
        ))}
      </div>
      <p className={styles.wordCount}>{words.length} / 최소 10개</p>

      <button className={styles.submitBtn} onClick={handleSubmit}>
        게임 생성하기
      </button>
    </div>
  );
}

export default MakerPage;
