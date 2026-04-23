import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { quizData } from "../data/quizData";
import html2canvas from "html2canvas";
import "./Quiz.css";

const Quiz = ({ userData, onComplete }) => {
  const [step, setStep] = useState("registration");
  const [userName, setUserName] = useState(userData?.name || "");
  const [userRank, setUserRank] = useState(userData?.rank || "");
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const categories = [
    {
      id: "Makhluk Hidup",
      label: "MAKHLUK HIDUP",
      icon: "🦖",
      desc: "Evolusi fauna purba",
      image: "/ImageModels/EraGeologi/velociraptor.webp",
    },
    {
      id: "Jenis Fosil",
      label: "JENIS FOSIL",
      icon: "🦴",
      desc: "Taksonomi spesimen",
      image: "/ImageModels/EraGeologi/anomalocaris.jpg",
    },
    {
      id: "Era Zaman",
      label: "ERA GEOLOGI",
      icon: "⏳",
      desc: "Kronologi prasejarah",
      image: "/ImageModels/EraGeologi/foto-paleozoikum.jpg",
    },
    {
      id: "Gabungan Keseluruhan",
      label: "GABUNGAN",
      icon: "🌀",
      desc: "Evaluasi total sistem",
      image: "/ImageModels/EraGeologi/foto-kenozoikum.jpg",
    },
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      onComplete({ name: userName });
      setStep("selection");
    }
  };

  const startQuiz = (catId) => {
    let filtered = [];
    if (catId === "Gabungan Keseluruhan") {
      filtered = [...quizData].sort(() => 0.5 - Math.random()).slice(0, 15);
    } else {
      filtered = quizData.filter((q) => q.kategori === catId).sort(() => 0.5 - Math.random());
    }

    if (filtered.length === 0) {
      alert("Database soal belum tersedia untuk kategori ini.");
      return;
    }

    setQuestions(filtered);
    setCategory(catId);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setStep("playing");
  };

  const getRank = (scorePct) => {
    if (scorePct <= 30) return "JUNIOR EXCAVATOR";
    if (scorePct <= 70) return "PALEONTOLOGY RESEARCHER";
    return "SENIOR ARCHAEOLOGIST";
  };

  const handleAnswer = (key) => {
    if (isAnswered || !questions[currentIndex]) return;
    setSelectedOpt(key);
    setIsAnswered(true);

    const isCorrect = key === questions[currentIndex].jawaban_benar;
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setSelectedOpt(null);
        setIsAnswered(false);
        setCurrentIndex((prev) => prev + 1);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        const finalScorePct = Math.round((finalScore / questions.length) * 100);
        const finalRank = getRank(finalScorePct);
        setUserRank(finalRank);
        onComplete({ rank: finalRank });
        setStep("result");
      }
    }, 1200);
  };

  const downloadImage = () => {
    const element = document.getElementById("certificate-print");
    html2canvas(element, {
      backgroundColor: "#05080f",
      scale: 2,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `Sertifikat_${userName}_JejakPurba.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  // Guard for current question
  const currentQData = questions[currentIndex];

  return (
    <div className="quiz-page-container">
      <div
        className="quiz-global-bg"
        style={{
          backgroundImage: `url('/ImageModels/EraGeologi/backgroundquiz.jpg')`,
        }}
      ></div>
      <div className="quiz-bg-overlay"></div>
      <div className="quiz-bg-grid"></div>
      <div className="quiz-scanner-line"></div>

      <nav className="quiz-nav">
        <Link
          to="/"
          className="back-link"
          style={{
            padding: "8px 16px",
            border: "1px solid rgba(0, 210, 255, 0.3)",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 210, 255, 0.05)",
          }}
        >
          <span>⟵</span> KEMBALI
        </Link>
        <div className="logo-section">
          <div className="logo-main-brand">PURBATECH</div>

          {userRank && (
            <div className="nav-profile-stack">
              <div className="nav-rank-badge-modern">
                <span className="rank-prefix"></span> {userRank}
              </div>
              {userName && (
                <div className="nav-user-id-modern">
                  <span className="status-dot-blink"></span>
                  {userName.toUpperCase()}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="sys-time">
          {userName || "GUEST"} // {new Date().toLocaleTimeString()}
        </div>
      </nav>

      <main className="quiz-main-content">
        <AnimatePresence mode="wait">
          {step === "registration" && (
            <motion.div
              key="reg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="registration-screen"
            >
              <div className="registration-card">
                <div className="card-header">
                  <span className="status-tag">SECURITY CHECK</span>
                  <h1>
                    IDENTITAS <span className="accent">PENGGUNA</span>
                  </h1>
                  <p>
                    Masukkan nama lengkap Anda untuk otentikasi sertifikat
                    sistem.
                  </p>
                </div>

                <div className="rank-info-preview">
                  <div className="rank-info-title">
                    TINGKATAN OTORITAS SISTEM:
                  </div>
                  <div className="rank-steps">
                    <div className="rank-step-item">
                      <span className="step-range">0-30 Score</span>
                      <span className="step-label">JUNIOR EXCAVATOR</span>
                    </div>
                    <div className="rank-step-item">
                      <span className="step-range">31-70 Score</span>
                      <span className="step-label">
                        PALEONTOLOGY RESEARCHER
                      </span>
                    </div>
                    <div className="rank-step-item expert">
                      <span className="step-range">71-100 Score</span>
                      <span className="step-label">SENIOR ARCHAEOLOGIST</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleRegister} className="reg-form">
                  <div className="input-group-tech">
                    <label>NAMA LENGKAP</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Masukkan nama..."
                      required
                      spellCheck="false"
                      autoComplete="off"
                    />
                    <div className="input-line"></div>
                  </div>
                  <button type="submit" className="start-btn-tech">
                    MULAI SESI EVALUASI
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {step === "selection" && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="selection-screen"
            >
              <div className="selection-header">
                <span className="status-tag">ACCESS PROTOCOL: REQUIRED</span>
                <h1>
                  HALO, <span className="accent">{userName.toUpperCase()}</span>
                </h1>
                <p>
                  Pilih modul evaluasi untuk menguji pengetahuan prasejarah
                  Anda.
                </p>
              </div>
              <div className="category-grid-revamp">
                {categories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    whileHover={{ y: -10, borderColor: "var(--neon-blue)" }}
                    className="category-card-revamp"
                    onClick={() => startQuiz(cat.id)}
                  >
                    <div
                      className="cat-card-img"
                      style={{ backgroundImage: `url(${cat.image})` }}
                    ></div>
                    <div className="cat-card-overlay"></div>
                    <div className="cat-card-content">
                      <div className="cat-icon-box">{cat.icon}</div>
                      <h3>{cat.label}</h3>
                      <p>{cat.desc}</p>
                      <button className="select-btn">INISIASI MODUL</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "playing" && currentQData && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="playing-screen-revamp"
            >
              <div className="quiz-hud-modern">
                <div className="hud-cell">
                  <span className="cell-label">PENGGUNA</span>
                  <span className="cell-value">{userName.toUpperCase()}</span>
                </div>
                <div className="hud-cell center">
                  <div className="progress-minimal">
                    <div className="progress-text">
                      DATA_SYNC:{" "}
                      {Math.round(
                        ((currentIndex + 1) / questions.length) * 100,
                      )}
                      %
                    </div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${((currentIndex + 1) / questions.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="hud-cell right">
                  <span className="cell-label">SCORE</span>
                  <span className="cell-value accent">{score * 10}</span>
                </div>
              </div>

              <div className="quiz-split-box">
                <div className="quiz-question-side">
                  <div className="terminal-header-small">
                    <span>QUERY_ID: 0x{currentQData.id}</span>
                    <span className="blink-text">DECODING_DATA...</span>
                  </div>
                  <div className="question-content">
                    <h2>{currentQData.pertanyaan}</h2>
                  </div>
                  <div className="options-list">
                    {Object.entries(currentQData.pilihan).map(([key, val]) => {
                      let status = "";
                      if (isAnswered) {
                        if (key === currentQData.jawaban_benar)
                          status = "correct";
                        else if (key === selectedAnswer) status = "wrong";
                      }
                      return (
                        <button
                          key={key}
                          className={`modern-opt-btn ${status} ${selectedAnswer === key ? "selected" : ""}`}
                          onClick={() => handleAnswer(key)}
                          disabled={isAnswered}
                        >
                          <span className="opt-key">{key.toUpperCase()}</span>
                          <span className="opt-val">{val}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="quiz-visual-side-playing">
                  <div className="visual-frame">
                    <div
                      className="visual-img"
                      style={{
                        backgroundImage: `url(${currentQData.visual || "/ImageModels/EraGeologi/foto-paleozoikum.jpg"})`,
                      }}
                    >
                      <div className="visual-scanline"></div>
                      <div className="visual-vignette"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="result-screen-revamp"
            >
              <div className="result-container-modern">
                <div className="result-card-main">
                  <div className="result-header-text">EVALUASI_SELESAI</div>
                  <div className="success-announcement">
                    <div className="status-blink-green">
                      OTENTIKASI BERHASIL
                    </div>
                    <h2>
                      Selamat, <span className="accent">{userName}</span>!
                    </h2>
                    <p>
                      Level Otoritas Anda:{" "}
                      <span className="rank-highlight">[{userRank}]</span>
                    </p>
                  </div>

                  <div id="certificate-print" className="digital-access-card">
                    <div className="card-top">
                      <div className="card-logo">JEJAK PURBA</div>
                      <div className="card-id">
                        ID: #{Math.floor(Math.random() * 90000) + 10000}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="cert-user-info">
                        <span className="cert-label">NAMA PEMEGANG</span>
                        <span className="cert-name">
                          {userName.toUpperCase()}
                        </span>
                      </div>
                      <div className="user-authority">
                        <span className="title">LEVEL OTORITAS</span>
                        <span className="value">{userRank}</span>
                      </div>
                      <div className="card-signature">
                        <div className="barcode"></div>
                        <div className="sig-text">SECURE RECOGNITION KEY</div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <span>TANGGAL: {new Date().toLocaleDateString()}</span>
                      <span className="valid">VALID ACCESSS</span>
                    </div>
                    <div className="card-glitch-layer"></div>
                  </div>

                  <div className="result-actions-revamp">
                    <button className="retry-btn-tech" onClick={downloadImage}>
                      SIMPAN GAMBAR (PNG)
                    </button>
                    <button
                      className="retry-btn-tech"
                      style={{
                        background: "transparent",
                        border: "1px solid var(--neon-blue)",
                        color: "var(--neon-blue)",
                      }}
                      onClick={() => setStep("registration")}
                    >
                      GANTI IDENTITAS / ULANGI
                    </button>
                    <Link to="/" className="home-btn-tech">
                      KEMBALI
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Quiz;
