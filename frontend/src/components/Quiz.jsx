import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { quizData } from "../data/quizData";
import "./Quiz.css";

const Quiz = () => {
  const [step, setStep] = useState("selection"); // selection, playing, result
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
      image: "/ImageModels/EraGeologi/velociraptor.webp"
    },
    { 
      id: "Jenis Fosil", 
      label: "JENIS FOSIL", 
      icon: "🦴", 
      desc: "Taksonomi spesimen",
      image: "/ImageModels/EraGeologi/anomalocaris.jpg"
    },
    { 
      id: "Era Zaman", 
      label: "ERA GEOLOGI", 
      icon: "⏳", 
      desc: "Kronologi prasejarah",
      image: "/ImageModels/EraGeologi/foto-paleozoikum.jpg"
    },
    { 
      id: "Gabungan Keseluruhan", 
      label: "GABUNGAN", 
      icon: "🌀", 
      desc: "Evaluasi total sistem",
      image: "/ImageModels/EraGeologi/foto-kenozoikum.jpg"
    },
  ];

  const startQuiz = (catId) => {
    let filtered = [];
    if (catId === "Gabungan Keseluruhan") {
      filtered = [...quizData].sort(() => 0.5 - Math.random()).slice(0, 15);
    } else {
      filtered = quizData.filter((q) => q.kategori === catId);
    }
    
    if (filtered.length === 0) {
      alert("Database untuk kategori ini sedang dalam pemeliharaan. Coba kategori lain.");
      return;
    }

    setQuestions(filtered);
    setCategory(catId);
    setStep("playing");
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswer = (key) => {
    if (isAnswered) return;
    setSelectedOpt(key);
    setIsAnswered(true);

    if (key === questions[currentIndex].jawaban_benar) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOpt(null);
        setIsAnswered(false);
      } else {
        setStep("result");
      }
    }, 1200);
  };

  return (
    <div className="quiz-page-container">
      {/* GLOBAL BACKGROUND PHOTO */}
      <div className="quiz-global-bg" style={{ backgroundImage: `url('/ImageModels/EraGeologi/foto-mesozoikum.jpg')` }}></div>
      <div className="quiz-bg-overlay"></div>
      
      <div className="quiz-bg-grid"></div>
      <div className="quiz-scanner-line"></div>

      <nav className="quiz-nav">
        <Link to="/" className="back-link">
          <span>⟵</span> TERMINAL UTAMA
        </Link>
        <div className="quiz-logo">OS.EVALUASI_PROSES</div>
        <div className="sys-time">{new Date().toLocaleTimeString()} // SYS_ACTIVE</div>
      </nav>

      <main className="quiz-main-content">
        <AnimatePresence mode="wait">
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
                <h1>PILIH <span className="accent">MODUL EVALUASI</span></h1>
                <p>Otentikasi pengetahuan Anda untuk membuka akses database level tinggi.</p>
              </div>

              <div className="category-grid-revamp">
                {categories.map((cat) => (
                  <motion.div 
                    key={cat.id}
                    whileHover={{ y: -10, borderColor: "var(--neon-blue)" }}
                    className="category-card-revamp"
                    onClick={() => startQuiz(cat.id)}
                  >
                    <div className="cat-card-img" style={{ backgroundImage: `url(${cat.image})` }}></div>
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

          {step === "playing" && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="playing-screen-revamp"
            >
              {/* HUD TOP */}
              <div className="quiz-hud-modern">
                <div className="hud-cell">
                  <span className="cell-label">KATEGORI</span>
                  <span className="cell-value">{category.toUpperCase()}</span>
                </div>
                <div className="hud-cell center">
                  <div className="progress-minimal">
                    <div className="progress-text">DATA_RECONSTRUCTION: {Math.round(((currentIndex + 1) / questions.length) * 100)}%</div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="hud-cell right">
                  <span className="cell-label">SCORE_SYNC</span>
                  <span className="cell-value accent">{score * 10} pts</span>
                </div>
              </div>

              {/* SPLIT LAYOUT: QUESTION & VISUAL */}
              <div className="quiz-split-box">
                {/* Sisi Kiri: Soal */}
                <div className="quiz-question-side">
                  <div className="terminal-header-small">
                    <span className="header-id">QUERY_ID: 0x{questions[currentIndex].id}</span>
                    <span className="header-status">DECODING...</span>
                  </div>
                  <div className="question-content">
                    <h2>{questions[currentIndex].pertanyaan}</h2>
                  </div>
                  <div className="options-list">
                    {Object.entries(questions[currentIndex].pilihan).map(([key, val]) => {
                      let status = "";
                      if (isAnswered) {
                        if (key === questions[currentIndex].jawaban_benar) status = "correct";
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
                          {status === "correct" && <span className="opt-status-icon">✔</span>}
                          {status === "wrong" && <span className="opt-status-icon">✘</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sisi Kanan: Visual */}
                <div className="quiz-visual-side-playing">
                  <div className="visual-frame">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="visual-img"
                        style={{ backgroundImage: `url(${questions[currentIndex].visual || "/ImageModels/EraGeologi/foto-paleozoikum.jpg"})` }}
                      >
                        <div className="visual-scanline"></div>
                        <div className="visual-vignette"></div>
                      </motion.div>
                    </AnimatePresence>
                    <div className="visual-data-label">CONTEXTUAL_RECONSTRUCTION_V1.0</div>
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
              className="result-screen"
            >
              <div className="result-card-revamp">
                <div className="result-header-text">EVALUASI_SELESAI</div>
                <div className="final-stats">
                  <div className="stat-circle">
                    <div className="circle-inner">
                      <span className="big-number">{Math.round((score / questions.length) * 100)}</span>
                      <span className="unit">%</span>
                    </div>
                  </div>
                  <div className="stat-details">
                    <div className="detail-row">
                      <span>DATABASE MATCH:</span>
                      <span className="accent">{score} / {questions.length}</span>
                    </div>
                    <div className="detail-row">
                      <span>RANK:</span>
                      <span className="accent">
                        {score === questions.length ? "MASTER_PALEONTOLOGIST" : "DATA_EXCAVATOR"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="result-actions">
                  <button className="retry-btn-modern" onClick={() => setStep("selection")}>
                    RESTART PROTOCOL
                  </button>
                  <Link to="/" className="home-btn-modern">
                    RETURN TO MAIN TERMINAL
                  </Link>
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
