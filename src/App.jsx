import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakerPage from "./pages/MakerPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/maker" element={<MakerPage />} />
        <Route path="/game/:gameId" element={<LobbyPage />} />
        <Route path="/game/:gameId/play" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
