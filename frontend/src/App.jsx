import React, { useState } from "react";
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
  const [userData, setUserData] = useState({
    name: localStorage.getItem("userName") || "",
    rank: localStorage.getItem("userRank") || ""
  });

  const updateUserData = (newData) => {
    setUserData(prev => {
      const updated = { ...prev, ...newData };
      if (newData.name !== undefined) localStorage.setItem("userName", newData.name);
      if (newData.rank !== undefined) localStorage.setItem("userRank", newData.rank);
      return updated;
    });
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Rute 1: Landing Page */}
          <Route path="/" element={<HomeWrapper userData={userData} />} />

          {/* Rute 2: Halaman Intro (Selamat Datang) */}
          <Route path="/intro" element={<IntroPage />} />

          {/* PERBAIKAN DI SINI: Ubah path menjadi "/timeline" */}
          <Route path="/timeline" element={<TimelineVideo />} />

          {/* Rute Kuis */}
          <Route path="/quiz" element={<Quiz userData={userData} onComplete={updateUserData} />} />

          {/* Rute Lainnya... */}
          <Route path="/era-geologi" element={<EraGeologi userData={userData} />} />
          <Route path="/gallery" element={<GalleryMain userData={userData} />} />
          <Route path="/visual-3d" element={<Visual3DHub userData={userData} />} />
          <Route path="/model-viewer" element={<ModelViewer userData={userData} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Update HomeWrapper agar konsisten
const HomeWrapper = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <LandingPage
      userData={userData}
      // Saat klik "Mulai Ekskavasi", arahkan ke /intro
      onStart={() => navigate("/intro")}
      // PERBAIKAN DI SINI JUGA:
      onTimeline={() => navigate("/timeline")}
    />
  );
};

export default App;
