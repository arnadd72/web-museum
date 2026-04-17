import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./LandingPage.css";

/* ======================================================== */
/* KOMPONEN JAM KRONOLOGIS                                  */
/* ======================================================== */
const ChronologicalClock = () => {
  const [years, setYears] = useState(4500000000);
  useEffect(() => {
    const interval = setInterval(() => {
      setYears((prev) => (prev > 0 ? prev - 1234567 : 0));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chrono-clock">
      <div className="chrono-label">TIMELINE MUNDUR (TAHUN)</div>
      <div className="chrono-value">{years.toLocaleString("id-ID")}</div>
      <div className="chrono-bar">
        <div className="chrono-progress"></div>
      </div>
    </div>
  );
};

/* ======================================================== */
/* DATA KUIS INTERAKTIF                                     */
/* ======================================================== */
const quizQuestions = [
  {
    question: "Era geologi manakah yang dikenal sebagai 'Zaman Dinosaurus'?",
    options: ["Paleozoikum", "Mesozoikum", "Kenozoikum", "Arkeozoikum"],
    answer: 1,
  },
  {
    question:
      "Fosil apakah yang menjadi indeks penting untuk kehidupan laut di Era Paleozoikum?",
    options: ["Ammonite", "Megalodon", "Trilobite", "Velociraptor"],
    answer: 2,
  },
  {
    question:
      "Apa singkatan dari AI Asisten (ARCA) pada sistem Jejak Purba ini?",
    options: [
      "Artificial Reconnaissance & Communication Assistant",
      "Advanced Robotic Cybernetic Android",
      "Automated Research & Calculation AI",
      "Artificial Reality Control Access",
    ],
    answer: 0,
  },
];

/* ======================================================== */
/* MAIN COMPONENT: LANDING PAGE                             */
/* ======================================================== */
const LandingPage = ({ onStart, onTimeline }) => {
  const audioRef = useRef(null);
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // DATA FOSIL
  const dinoImageLink =
    "https://i0.wp.com/genemil.com/wp-content/uploads/2020/07/zaman-paleozoikum.jpg?fit=800%2C600&ssl=1";
  const featuredFossils = [
    {
      id: 1,
      title: "TYRANNOSAURUS REX",
      desc: "Predator puncak era Mesozoikum.",
      type: "VERTEBRATA",
      era: "MESOZOIKUM",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQ53hI5D7wMRZ4jkuZBqC-AXLvzDL39rnNQ&s",
      accentColor: "#ff4d4d",
      radarPos: { top: "30%", left: "60%" },
    },
    {
      id: 2,
      title: "TRILOBITE",
      desc: "Kehidupan kompleks paling awal.",
      type: "INVERTEBRATA",
      era: "PALEOZOIKUM",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQljOpkz5Or31nutRIesJGJQ2ZB2uTjIOogDg&s",
      accentColor: "#00d2ff",
      radarPos: { top: "70%", left: "30%" },
    },
    {
      id: 3,
      title: "WOOLLY MAMMOTH",
      desc: "Mamalia raksasa era Kenozoikum.",
      type: "MAMALIA",
      era: "KENOZOIKUM",
      image:
        "https://media.sketchfab.com/models/58376e170c8b4507a636b5e45bcce999/thumbnails/ce3b02fdd7194d55b7afb8908312ad98/92491c00087e4d21aa7fb453582a759f.jpeg",
      accentColor: "#ffffff",
      radarPos: { top: "20%", left: "40%" },
    },
    {
      id: 4,
      title: "AMMONITE",
      desc: "Fosil indeks penting laut purba.",
      type: "INVERTEBRATA",
      era: "MESOZOIKUM",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpdaTwKETvJtqM8A-jfuCswx-cs-Z4QXx84w&s",
      accentColor: "#FF8C00",
      radarPos: { top: "60%", left: "80%" },
    },
  ];

  // RADAR & BIOMETRIK STATE
  const [activeFossil, setActiveFossil] = useState(featuredFossils[0]);

  // KUIS STATE
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const handleAnswer = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setTimeout(() => {
      if (idx === quizQuestions[currentQ].answer) setScore(score + 1);
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOpt(null);
  };

  // ANIMASI SCROLL
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(() => console.log("Audio play failed"));
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="preloader-container">
        <div className="loader-content">
          <div className="loader-circle"></div>
          <div className="loader-text">MEMUAT SISTEM EKSKAVASI...</div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page-wrapper">
      <audio ref={audioRef} loop>
        <source src="/ambience.mp3" type="audio/mp3" />
      </audio>
      <div className="audio-control" onClick={toggleAudio}>
        {isMuted ? (
          <span className="blink-text">🔇 AUDIO OFF</span>
        ) : (
          <span className="sound-active">
            🔊 SYS AUDIO ON
            <div className="equalizer">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </span>
        )}
      </div>

      <CyberChatbot dataFosil={featuredFossils} />

      {/* NAVBAR */}
      <nav className="navbar hud-nav animate-fade-down">
        <div className="logo-section">
          <div className="logo-symbol">JP</div>
          <span className="logo-text">OS.JEJAKPURBA</span>
        </div>
        <div className="nav-links">
          <a href="#home" className="nav-link active">
            DASHBOARD
          </a>
          <Link to="/era-geologi" className="nav-link">
            TIMELINE
          </Link>
          <Link to="/gallery" className="nav-link">
            DATABASE
          </Link>
          <Link to="/visual-3d" className="nav-link">
            RENDER 3D
          </Link>
        </div>
      </nav>

      {/* SECTION 1: HERO CENTERED */}
      <main id="home" className="hero-section">
        <div className="video-wrapper">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="/background-kedua.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          <div className="scan-line-overlay"></div>
        </div>

        <motion.div
          className="hero-grid centered-hero"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            className="hero-content-main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="floating-tag flicker justify-center">
              <span className="live-dot"></span> CONNECTION ESTABLISHED
            </div>
            <h1 className="hero-title">
              DATA <br />
              <span className="outline-text">EKSKAVASI</span>
            </h1>
            <p className="hero-desc text-center">
              Sistem operasi museum digital. Akses eksklusif ke arsip evolusi
              bumi. Memproses rekonstruksi makhluk purba dari Era Paleozoikum
              hingga Kenozoikum melalui analisis Neural Network.
            </p>
            <div className="cta-container justify-center">
              <button className="explore-btn" onClick={onStart}>
                AKSES DATABASE
              </button>
              <div className="play-btn-wrapper" onClick={onTimeline}>
                <div className="play-icon">▶</div>
                <span>TIMELINE BUMI</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div className="decorative-line"></div>
      </main>

      {/* TELEMETRY BANNER */}
      <section className="telemetry-banner">
        <div className="telemetry-inner">
          <div className="telemetry-item">
            <span className="telemetry-value">3</span>
            <span className="telemetry-label">ERA AKTIF</span>
          </div>
          <div className="telemetry-divider"></div>
          <div className="telemetry-item">
            <span className="telemetry-value">50+</span>
            <span className="telemetry-label">ENTITAS FOSIL</span>
          </div>
          <div className="telemetry-divider"></div>
          <div className="telemetry-item">
            <span className="telemetry-value">100%</span>
            <span className="telemetry-label">INTEGRITAS DATA</span>
          </div>
          <div className="telemetry-divider"></div>
          <div className="telemetry-item">
            <span className="telemetry-value text-glow">ON</span>
            <span className="telemetry-label">ARCA AI</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: BENTO GRID */}
      <section id="features" className="bento-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Modul <span className="accent">Sistem</span>
          </h2>
          <div className="section-line"></div>
          <p className="section-desc">
            Platform ini menyajikan pemetaan kehidupan purba berdasarkan
            taksonomi ilmiah multi-dimensi.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={itemVariants}
            className="bento-item bento-large"
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="system-status-bar">STATUS: OPTIMAL</div>
            <div
              className="bento-bg"
              style={{ backgroundImage: `url(${dinoImageLink})` }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <span className="bento-tag">DATA BIOLOGIS</span>
              <h3>Klasifikasi Makhluk Purba</h3>
              <p>
                Pelajari ekosistem yang hilang. Platform ini membagi fosil
                berdasarkan kelompok biologis dan jejak terawetkan.
              </p>
              <Link to="/gallery" className="bento-btn">
                BUKA MODUL
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bento-item bento-ai"
            whileHover={{ scale: 1.05 }}
          >
            <div className="system-status-bar blink">AI: LISTENING</div>
            <div className="bento-content">
              <div className="ai-icon">🤖</div>
              <h3>ARCA Neural Net</h3>
              <p>Asisten AI aktif. Analisis data fosil real-time.</p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bento-item bento-3d"
            whileHover={{ scale: 1.05 }}
          >
            <div className="system-status-bar">CHRONOS: ACTIVE</div>
            <div className="bento-content">
              <ChronologicalClock />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bento-item bento-era">
            <div className="system-status-bar">TIMELINE: SYNCED</div>
            <div className="bento-content era-flex">
              <div className="era-list">
                <span>PALEOZOIKUM</span>
                <div className="era-line"></div>
                <span>MESOZOIKUM</span>
                <div className="era-line"></div>
                <span>KENOZOIKUM</span>
              </div>
              <Link
                to="/era-geologi"
                className="bento-btn mt-auto"
                style={{
                  background: "transparent",
                  border: "1px solid #00d2ff",
                  color: "#00d2ff",
                }}
              >
                RENDER PETA WAKTU
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 3: RADAR & 3D FLIP CARD (ULTIMATE FEATURE) */}
      <section className="radar-section">
        <motion.div
          className="preview-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Pemindai <span className="accent">Geologis</span>
          </h2>
          <div className="section-line mx-auto"></div>
          <p className="preview-desc mx-auto">
            Sistem Sonar aktif mendeteksi anomali fosil. Klik titik pada radar
            untuk memuat kartu biometrik, arahkan kursor ke kartu untuk
            mengekstrak visual X-Ray 3D.
          </p>
        </motion.div>

        <div className="radar-layout">
          {/* RADAR KIRI */}
          <motion.div
            className="radar-container-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="radar-screen">
              <div className="radar-sweep"></div>
              <div className="radar-grid-lines"></div>
              <div className="radar-crosshair"></div>

              {/* Radar Blips (Titik Fosil) */}
              {featuredFossils.map((fossil) => (
                <div
                  key={fossil.id}
                  className={`radar-blip ${activeFossil.id === fossil.id ? "blip-active" : ""}`}
                  style={{
                    top: fossil.radarPos.top,
                    left: fossil.radarPos.left,
                  }}
                  onClick={() => setActiveFossil(fossil)}
                >
                  <span className="blip-ping"></span>
                  <div className="blip-tooltip">{fossil.title}</div>
                </div>
              ))}
            </div>
            <div className="radar-status blink">
              SONAR: SCANNING SECTOR 7...
            </div>
          </motion.div>

          {/* KARTU 3D KANAN */}
          <motion.div
            className="flip-card-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Wrapper luar mengatur prespektif 3D */}
            <div className="fossil-flip-container" key={activeFossil.id}>
              <div className="fossil-flip-inner">
                {/* Sisi Depan Kartu (Visual Normal) */}
                <div className="flip-card-front elegant-card">
                  <div
                    className="system-status-bar"
                    style={{
                      color: activeFossil.accentColor,
                      borderColor: activeFossil.accentColor,
                    }}
                  >
                    ID: 00{activeFossil.id} // {activeFossil.era}
                  </div>
                  <div
                    className="visual-bg"
                    style={{ backgroundImage: `url(${activeFossil.image})` }}
                  ></div>
                  <div className="flip-overlay"></div>
                  <div className="preview-info">
                    <h4>{activeFossil.title}</h4>
                    <small
                      style={{
                        color: activeFossil.accentColor,
                        letterSpacing: "1px",
                      }}
                    >
                      {activeFossil.type}
                    </small>
                    <p className="mt-auto flip-instruction blink">
                      HOVER UNTUK X-RAY MESH ⟳
                    </p>
                  </div>
                </div>

                {/* Sisi Belakang Kartu (X-Ray & Ekstrak Data) */}
                <div
                  className="flip-card-back elegant-card"
                  style={{ borderColor: activeFossil.accentColor }}
                >
                  <div
                    className="xray-bg"
                    style={{ backgroundImage: `url(${activeFossil.image})` }}
                  ></div>
                  <div className="scanner-line"></div>
                  <div className="xray-data-panel">
                    <h4 style={{ color: activeFossil.accentColor }}>
                      ANALISIS STRUKTURAL
                    </h4>
                    <div className="xray-data-list">
                      <p>
                        <strong>SPESIES:</strong> {activeFossil.title}
                      </p>
                      <p>
                        <strong>ERA:</strong> {activeFossil.era}
                      </p>
                      <p>
                        <strong>KLASIFIKASI:</strong> {activeFossil.type}
                      </p>
                      <p>
                        <strong>KETERANGAN:</strong> {activeFossil.desc}
                      </p>
                    </div>
                    <button
                      className="view-detail-btn elegant-btn"
                      onClick={onStart}
                      style={{
                        borderColor: activeFossil.accentColor,
                        color: activeFossil.accentColor,
                      }}
                    >
                      AKSES DATABASE LENGKAP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: KUIS INTERAKTIF */}
      <section className="quiz-section">
        <div className="quiz-container">
          <motion.div
            className="quiz-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3>
              MODUL <span className="accent">EVALUASI PENGETAHUAN</span>
            </h3>
            <p>
              Uji pemahaman Anda mengenai sejarah prasejarah dan fungsionalitas
              sistem museum digital ini.
            </p>
          </motion.div>

          <motion.div
            className="quiz-terminal"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="quiz-top-bar">
              <span>TERMINAL: UJIAN_01</span>
              <span className="quiz-status">
                {quizFinished
                  ? "SELESAI"
                  : `SOAL ${currentQ + 1}/${quizQuestions.length}`}
              </span>
            </div>

            <div className="quiz-body">
              {!quizFinished ? (
                <>
                  <h4 className="quiz-question">
                    {quizQuestions[currentQ].question}
                  </h4>
                  <div className="quiz-options">
                    {quizQuestions[currentQ].options.map((opt, idx) => {
                      let btnClass = "quiz-btn";
                      if (selectedOpt !== null) {
                        if (idx === quizQuestions[currentQ].answer)
                          btnClass += " correct";
                        else if (idx === selectedOpt) btnClass += " wrong";
                      }
                      return (
                        <button
                          key={idx}
                          className={btnClass}
                          onClick={() => handleAnswer(idx)}
                          disabled={selectedOpt !== null}
                        >
                          <span className="opt-letter">
                            [{String.fromCharCode(65 + idx)}]
                          </span>{" "}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="quiz-result">
                  <div className="score-circle">
                    <span className="score-number">
                      {score}/{quizQuestions.length}
                    </span>
                  </div>
                  <h4>EVALUASI SELESAI</h4>
                  <p>
                    {score === quizQuestions.length
                      ? "Sempurna! Anda memiliki pengetahuan level Paleontolog."
                      : "Bagus! Terus jelajahi database untuk meningkatkan pengetahuan Anda."}
                  </p>
                  <button className="quiz-retry-btn" onClick={resetQuiz}>
                    RESTART EVALUASI
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: TECH STACK SHOWCASE */}
      <section className="tech-spec-section">
        <div className="tech-container">
          <div className="tech-text">
            <h3>
              SPESIFIKASI <span className="accent">TEKNIS</span>
            </h3>
            <p>
              Dibangun menggunakan tumpukan teknologi modern untuk menghasilkan
              performa tinggi dan user interface futuristik.
            </p>
          </div>
          <div className="tech-badges">
            <div className="tech-badge">
              <span>⚛️</span> React.js
            </div>
            <div className="tech-badge">
              <span>🧠</span> Google Gemini AI
            </div>
            <div className="tech-badge">
              <span>🎭</span> Framer Motion
            </div>
            <div className="tech-badge">
              <span>🎨</span> CSS 3D Transforms
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>JP</h2>
            <p>Digital Museum Project</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>EKSPLORASI</h4>
              <a href="#home">Beranda</a>
              <Link to="/era-geologi">Era Geologi</Link>
              <Link to="/gallery">Galeri Fosil</Link>
            </div>
            <div className="link-group">
              <h4>TEKNOLOGI</h4>
              <span>React / Framer Motion</span>
              <span>AI Integration</span>
              <span>Interactive Quiz</span>
            </div>
            <div className="link-group">
              <h4>TIM PENGEMBANG</h4>
              <span>Fajrina Nurhaliza</span>
              <span>Arvan Murbiyanto</span>
              <span>Arnanda Setya Nosa</span>
              <span>Ihsan Nafis Hidayat</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2026 Jejak Purba. Dirancang khusus untuk Eksibisi Edukasi
            Digital.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* ======================================================== */
/* KOMPONEN CHATBOT ARCA                                    */
/* ======================================================== */
const CyberChatbot = ({ dataFosil }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Sistem ARCA aktif. Silakan ajukan pertanyaan database.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  useEffect(
    () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, isTyping],
  );

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    try {
      const prompt = `Kamu ARCA, AI museum digital Cyberpunk. Jawab dari DATA FOSIL berikut: ${JSON.stringify(dataFosil)}. Gaya bicara futuristik. Pertanyaan: "${userMsg}"`;
      const result = await model.generateContent(prompt);
      const botReplyText = (await result.response).text();
      setMessages((prev) => [...prev, { text: botReplyText, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "ERR: Neural link terputus.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕ TERMINATE ARCA" : "⚡ OVERRIDE ARCA"}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>
              <span className="status-dot"></span>ARCA TERMINAL
            </span>
            <span className="header-code">SYS.ON</span>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot flicker">Processing Data...</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSend} className="chatbot-input-area">
            <input
              type="text"
              placeholder="Akses terminal..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping}>
              &gt;
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LandingPage;