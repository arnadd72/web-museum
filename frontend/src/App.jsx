import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// IMPORT KOMPONEN
import LandingPage from "./components/LandingPage";
import EraGeologi from "./components/EraGeologi";
import GalleryMain from "./components/GalleryMain";
import Visual3DHub from "./components/Visual3DHub";
import ModelViewer from "./components/ModelViewer";
// IMPORT HALAMAN BARU
import IntroPage from "./components/IntroPage";
import TimelineVideo from "./components/TimelineVideo";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Rute 1: Landing Page */}
          <Route path="/" element={<HomeWrapper />} />

          {/* Rute 2: Halaman Intro (Selamat Datang) */}
          <Route path="/intro" element={<IntroPage />} />

          {/* PERBAIKAN DI SINI: Ubah path menjadi "/timeline" */}
          <Route path="/timeline" element={<TimelineVideo />} />

          {/* Rute Kuis */}
          <Route path="/quiz" element={<Quiz />} />

          {/* Rute Lainnya... */}
          <Route path="/era-geologi" element={<EraGeologi />} />
          <Route path="/gallery" element={<GalleryMain />} />
          <Route path="/visual-3d" element={<Visual3DHub />} />
          <Route path="/model-viewer" element={<ModelViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

// Update HomeWrapper agar konsisten
const HomeWrapper = () => {
  const navigate = useNavigate();

  return (
    <LandingPage
      // Saat klik "Mulai Ekskavasi", arahkan ke /intro
      onStart={() => navigate("/intro")}
      // PERBAIKAN DI SINI JUGA:
      onTimeline={() => navigate("/timeline")}
    />
  );
};

export default App;
