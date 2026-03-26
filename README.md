# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

<<<<<<< Updated upstream
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
- 2026.03 ~

## 기술 스택

| 분류       | 기술                       |
| ---------- | -------------------------- |
| 프레임워크 | React 19 + Vite            |
| 라우팅     | React Router DOM v7        |
| 백엔드     | Firebase Realtime Database |
| 스타일     | CSS Modules                |

## 주요 기능

### Word Search Maker (어드민)

- 게임 제목, 설명 입력
- 영어 단어 10개 이상 등록
- 게임 생성 후 참여 링크 발급

### 로비 페이지

- 링크로 접속 후 게임 제목, 설명, 단어 수 확인
- 닉네임 입력 후 게임 시작

### 게임 페이지

- 17x17 랜덤 퍼즐 격자 생성
- 마우스 드래그로 단어 선택
- 정답 단어 찾으면 격자와 단어 목록에 표시
- 잘못된 선택 시 헤더 빨간색 깜빡임
- 상단에 게임 제목, 설명, 타이머 표시

### 현황판

- 참여 유저들의 점수와 소요 시간 실시간 표시
- 1~3위 메달 강조 표시

### 결과 페이지

- 게임 완료 후 자동 이동
- 찾은 단어 수, 소요 시간 표시
- 최종 순위 표시 (1~3위 메달 강조)
- 다시 하기 / 로비로 가기 버튼

## 프로젝트 구조

```
src/
├── pages/
│   ├── MakerPage.jsx      # 게임 제작 어드민
│   ├── LobbyPage.jsx      # 이름 입력 로비
│   ├── GamePage.jsx       # 실제 게임
│   └── ResultPage.jsx     # 게임 결과 페이지
├── components/
│   ├── WordGrid.jsx       # 퍼즐 격자
│   ├── WordList.jsx       # 단어 목록
│   └── Leaderboard.jsx    # 현황판
├── firebase/
│   └── firebase.js        # Firebase 설정
├── utils/
│   └── puzzleGenerator.js # 퍼즐 생성 알고리즘
└── styles/                # CSS Modules
```

## 시작하기

```bash
# 설치
npm install

# 개발 서버 실행
npm run dev
```

## 환경변수 설정

루트에 `.env` 파일 생성 후 Firebase 설정값 입력:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 페이지 흐름

```
/maker → 게임 생성 → 링크 발급
/game/:gameId → 로비 (이름 입력)
/game/:gameId/play → 게임 플레이
/game/:gameId/result → 결과 페이지
```
>>>>>>> Stashed changes
