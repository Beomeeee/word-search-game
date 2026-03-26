import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakerPage from "./pages/MakerPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/maker" element={<MakerPage />} />
        <Route path="/game/:gameId" element={<LobbyPage />} />
        <Route path="/game/:gameId/play" element={<GamePage />} />
        <Route path="/game/:gameId/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
