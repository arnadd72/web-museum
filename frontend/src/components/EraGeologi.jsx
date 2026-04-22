import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./EraGeologi.css";

const EraGeologi = ({ userData }) => {
  const [activeEra, setActiveEra] = useState(0);
  const navigate = useNavigate();

  const eras = [
    {
      id: 0,
      name: "PALEOZOIKUM",
      subtitle: "541 - 252 JUTA TAHUN LALU",
      location: "AWAL KEHIDUPAN KOMPLEKS",
      desc: "Zaman Paleozoikum dikenal sebagai era kehidupan purba (Ancient Life). Bumi didominasi oleh invertebrata laut bercangkang keras, predator laut purba seperti Anomalocaris, kemunculan ikan bertulang pertama, serta amfibi awal yang mulai naik ke daratan.",
      image: "/ImageModels/EraGeologi/foto-paleozoikum.jpg",
      color: "#00d2ff",
      video: "/paleozoikum.mp4",
      cardImg: "/ImageModels/EraGeologi/anomalocaris.jpg", // Gambar untuk thumbnail kartu
    },
    {
      id: 1,
      name: "MESOZOIKUM",
      subtitle: "252 - 66 JUTA TAHUN LALU",
      location: "ZAMAN KEEMASAN REPTIL",
      desc: "Sering disebut sebagai Zaman Dinosaurus. Pada masa ini, dinosaurus menjadi penguasa daratan, sementara reptil laut raksasa mengisi samudra dan pterosaurus menguasai langit. Tumbuhan berbunga pertama juga mulai bermunculan di era ini.",
      image: "/ImageModels/EraGeologi/foto-mesozoikum.jpg",
      color: "#ff4d4d",
      video: "/mesozoikum.mp4",
      cardImg: "/ImageModels/EraGeologi/trex.jpg",
    },
    {
      id: 2,
      name: "KENOZOIKUM",
      subtitle: "66 JUTA TAHUN LALU - SEKARANG",
      location: "KEBANGKITAN MAMALIA",
      desc: "Era kehidupan baru setelah kepunahan massal dinosaurus. Mamalia berkembang pesat dan menjadi kelompok dominan. Megafauna seperti Mammoth dan Smilodon menguasai ekosistem es, memicu awal mula evolusi menuju peradaban.",
      image: "/ImageModels/EraGeologi/foto-kenozoikum.jpg",
      color: "#00ff88",
      video: "/neozoikum.mp4",
      cardImg: "/ImageModels/EraGeologi/mammoth.jpg",
    },
  ];

  const currentData = eras[activeEra];

  const handleNext = () => {
    setActiveEra((prev) => (prev === eras.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveEra((prev) => (prev === 0 ? eras.length - 1 : prev - 1));
  };

  const handleWatchVideo = () => {
    navigate("/timeline", { state: { videoSrc: currentData.video } });
  };

  // Variasi animasi untuk teks saat berganti era
  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <div className="showcase-container">
      {/* 1. BACKGROUND CROSSFADE */}
      <div className="showcase-bg-wrapper">
        {eras.map((era, index) => (
          <div
            key={era.id}
            className={`showcase-bg ${activeEra === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${era.image})` }}
          />
        ))}
        <div className="showcase-overlay"></div>
        <div className="showcase-vignette"></div>
      </div>

      <nav className="showcase-nav">
        <div className="nav-brand-group">
          <div className="nav-brand">
            <div className="logo-icon">JP</div>
            <span>JEJAK PURBA</span>
          </div>

          {userData?.rank && (
            <div className="nav-profile-stack gallery-profile">
              <div className="nav-rank-badge-modern">{userData.rank}</div>
              {userData?.name && (
                <div className="nav-user-id-modern">
                  <span className="status-dot-blink"></span>
                  {userData.name.toUpperCase()}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="nav-links">
          <Link to="/">BERANDA</Link>
          <Link to="/gallery">ENSIKLOPEDIA</Link>
          <Link to="/visual-3d">VISUAL 3D</Link>
        </div>
      </nav>

      {/* 3. MAIN CONTENT SPLIT */}
      <main className="showcase-main">
        {/* KIRI: INFORMASI ERA */}
        <div className="showcase-info">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEra}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="info-content"
            >
              <h4
                className="info-subtitle"
                style={{ color: currentData.color }}
              >
                {currentData.subtitle} - {currentData.location}
              </h4>
              <h1 className="info-title">{currentData.name}</h1>
              <p className="info-desc">{currentData.desc}</p>

              <div className="info-actions">
                <button
                  className="btn-play-icon"
                  style={{ backgroundColor: currentData.color }}
                  onClick={handleWatchVideo}
                >
                  ▶
                </button>
                <button className="btn-outline" onClick={handleWatchVideo}>
                  JELAJAHI ERA INI
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* KANAN: KARTU PILIHAN ERA */}
        <div className="showcase-cards">
          {eras.map((era, index) => (
            <div
              key={era.id}
              className={`era-card ${activeEra === index ? "active" : ""}`}
              onClick={() => setActiveEra(index)}
            >
              <div
                className="card-bg"
                style={{ backgroundImage: `url(${era.cardImg || era.image})` }}
              ></div>
              <div className="card-overlay"></div>
              <div className="card-content">
                <span className="card-subtitle">{era.location}</span>
                <h3 className="card-title">{era.name}</h3>
              </div>
              {/* Garis aksen neon di atas kartu aktif */}
              {activeEra === index && (
                <motion.div
                  layoutId="activeCardAccent"
                  className="card-active-accent"
                  style={{
                    backgroundColor: era.color,
                    boxShadow: `0 0 15px ${era.color}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* 4. BOTTOM CONTROLS */}
      <footer className="showcase-bottom">
        <div className="controls-left">
          <button className="control-arrow" onClick={handlePrev}>
            &lt;
          </button>
          <button className="control-arrow" onClick={handleNext}>
            &gt;
          </button>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${((activeEra + 1) / eras.length) * 100}%`,
                backgroundColor: currentData.color,
              }}
            ></div>
          </div>
        </div>

        <div className="controls-right">
          <span className="large-number" style={{ color: currentData.color }}>
            0{activeEra + 1}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default EraGeologi;
