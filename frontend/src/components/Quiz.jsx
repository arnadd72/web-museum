import React, { useState, useEffect, useRef } from "react";
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
    { id: "Makhluk Hidup", label: "MAKHLUK HIDUP", icon: "🦖", desc: "Evolusi fauna purba" },
    { id: "Jenis Fosil", label: "JENIS FOSIL", icon: "🦴", desc: "Taksonomi spesimen" },
    { id: "Era Zaman", label: "ERA GEOLOGI", icon: "⏳", desc: "Kronologi prasejarah" },
    { id: "Gabungan Keseluruhan", label: "GABUNGAN", icon: "🌀", desc: "Evaluasi total" },
  ];

  const startQuiz = (catId) => {
    let filtered = [];
    if (catId === "Gabungan Keseluruhan") {
      filtered = [...quizData].sort(() => 0.5 - Math.random()).slice(0, 15);
    } else {
      filtered = quizData.filter((q) => q.kategori === catId);
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
    }, 1500);
  };

  return (
    <div className="quiz-page-container">
      {/* Background Decor */}
      <div className="quiz-bg-grid"></div>
      <div className="quiz-scanner-line"></div>

      <nav className="quiz-nav">
        <Link to="/" className="back-link">
          <span>⟵</span> TERMINAL UTAMA
        </Link>
        <div className="quiz-logo">OS.EVALUASI_PROSES</div>
      </nav>

      <main className="quiz-main-content">
        <AnimatePresence mode="wait">
          {step === "selection" && (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="selection-screen"
            >
              <div className="selection-header">
                <span className="status-tag">SYSTEM: READY</span>
                <h1>PILIH <span className="accent">MODUL EVALUASI</span></h1>
                <p>Otentikasi pengetahuan Anda untuk mengakses level database yang lebih tinggi.</p>
              </div>

              <div className="category-grid">
                {categories.map((cat) => (
                  <motion.div 
                    key={cat.id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="category-card"
                    onClick={() => startQuiz(cat.id)}
                  >
                    <div className="cat-icon">{cat.icon}</div>
                    <h3>{cat.label}</h3>
                    <p>{cat.desc}</p>
                    <div className="cat-hover-effect"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "playing" && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="playing-screen"
            >
              <div className="quiz-hud">
                <div className="hud-item">
                  <span className="label">KATEGORI</span>
                  <span className="value">{category.toUpperCase()}</span>
                </div>
                <div className="hud-item progress-container">
                  <span className="label">PROGRESS</span>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="value">{currentIndex + 1} / {questions.length}</span>
                </div>
                <div className="hud-item">
                  <span className="label">SKOR</span>
                  <span className="value accent">{score}</span>
                </div>
              </div>

              <div className="question-box">
                <div className="terminal-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="title">QUERY_ID: {questions[currentIndex].id}</span>
                </div>
                <div className="question-text">
                  <h2>{questions[currentIndex].pertanyaan}</h2>
                </div>
                <div className="options-grid">
                  {Object.entries(questions[currentIndex].pilihan).map(([key, val]) => {
                    let status = "";
                    if (isAnswered) {
                      if (key === questions[currentIndex].jawaban_benar) status = "correct";
                      else if (key === selectedAnswer) status = "wrong";
                    }
                    return (
                      <button
                        key={key}
                        className={`opt-btn ${status} ${selectedAnswer === key ? "selected" : ""}`}
                        onClick={() => handleAnswer(key)}
                        disabled={isAnswered}
                      >
                        <span className="key-box">[{key.toUpperCase()}]</span>
                        <span className="val-text">{val}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="result-screen"
            >
              <div className="result-card">
                <div className="result-header">EVALUASI SELESAI</div>
                <div className="score-display">
                  <div className="circular-progress" style={{ 
                    background: `conic-gradient(var(--neon-blue) ${(score / questions.length) * 360}deg, rgba(255,255,255,0.05) 0deg)` 
                  }}>
                    <div className="inner-circle">
                      <span className="final-score">{Math.round((score / questions.length) * 100)}</span>
                      <span className="percent">%</span>
                    </div>
                  </div>
                </div>
                <h3>{score === questions.length ? "LEVEL: PALEONTOLOG AGUNG" : "DATA TERSIMPAN"}</h3>
                <p>Anda menjawab benar {score} dari {questions.length} pertanyaan.</p>
                
                <div className="result-actions">
                  <button className="retry-btn" onClick={() => setStep("selection")}>
                    RESTART TERMINAL
                  </button>
                  <Link to="/" className="home-btn">
                    BACK TO HOME
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
