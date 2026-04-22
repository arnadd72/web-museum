import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
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
/* KOMPONEN TILT CARD (UNTUK SHOWCASE MODEL)                */
/* ======================================================== */
const ModelTiltCard = ({ fossil, variants }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="model-preview-card"
    >
      <div className="card-glitch-overlay"></div>
      <div
        className="model-card-frame"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="card-top-header">
          <span className="spec-id">SPEC_ID: 00{fossil.id}</span>
          <span className="era-tag" style={{ color: fossil.accentColor }}>
            {fossil.era}
          </span>
        </div>

        <div
          className="model-visual-container"
          style={{ transform: "translateZ(30px)" }}
        >
          <div
            className="model-image"
            style={{ backgroundImage: `url(${fossil.image})` }}
          ></div>
          <div className="scanline-effect"></div>
          <div
            className="hologram-glow"
            style={{
              background: `radial-gradient(circle, ${fossil.accentColor}33 0%, transparent 70%)`,
            }}
          ></div>
        </div>

        <div className="card-info" style={{ transform: "translateZ(40px)" }}>
          <h4 className="model-title">{fossil.title}</h4>
          <div className="model-stats">
            <div className="stat-row">
              <span>TYPE</span>
              <span style={{ color: fossil.accentColor }}>{fossil.type}</span>
            </div>
            <div className="stat-row">
              <span>STATUS</span>
              <span className="blink-text">DECODING...</span>
            </div>
          </div>
          <Link
            to="/visual-3d"
            className="render-btn"
            style={{
              borderColor: fossil.accentColor,
              color: fossil.accentColor,
            }}
          >
            <span className="btn-icon">⌬</span> RENDER 3D MODEL
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="card-corner-decor tl"></div>
        <div className="card-corner-decor br"></div>
      </div>
    </motion.div>
  );
};

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

      {/* <CyberChatbot dataFosil={featuredFossils} /> */}

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

      {/* SECTION 2: BENTO GRID DASHBOARD */}
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
            pendekatan ilmiah. Setiap spesimen diklasifikasikan menurut Era
            Geologi, jenis fosil, dan kelompok biologis, sehingga memudahkan
            pemahaman hubungan antara makhluk hidup, lingkungan, dan perubahan
            Bumi.
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
            <div className="system-status-bar">MODUL: 01</div>
            <div
              className="bento-bg"
              style={{
                backgroundImage: `url('/ImageModels/EraGeologi/trex.jpg')`,
              }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <span className="bento-tag">BIOLOGI</span>
              <h3>KELOMPOK HEWAN</h3>
              <p>Vertebrata, Invertebrata, dan Mikrofosil.</p>
              <Link to="/gallery" className="bento-btn-simple">
                LIHAT SELENGKAPNYA →
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bento-item bento-3d"
            whileHover={{ scale: 1.05 }}
          >
            <div className="system-status-bar">MODUL: 02</div>
            <div
              className="bento-bg"
              style={{
                backgroundImage: `url('/ImageModels/EraGeologi/anomalocaris.jpg')`,
              }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <span className="bento-tag">TAKSONOMI</span>
              <h3>JENIS FOSIL</h3>
              <p>Fosil Tubuh, Jejak, dan Terawetkan.</p>
              <Link to="/gallery" className="bento-btn-simple">
                LIHAT SELENGKAPNYA →
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bento-item bento-era">
            <div className="system-status-bar">MODUL: 03</div>
            <div
              className="bento-bg"
              style={{
                backgroundImage: `url('/ImageModels/EraGeologi/foto-paleozoikum.jpg')`,
              }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <span className="bento-tag">TIMELINE</span>
              <h3>ERA GEOLOGI</h3>
              <p>Paleozoikum hingga Kenozoikum.</p>
              <Link to="/era-geologi" className="bento-btn-simple">
                LIHAT SELENGKAPNYA →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 3: QUIZ INTRO (EVALUASI) - REVAMP */}
      <section className="quiz-intro-section">
        <div className="quiz-intro-container">
          <motion.div
            className="quiz-split-layout"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* SISI KIRI: GAMBAR VISUAL */}
            <div className="quiz-visual-side">
              <div className="quiz-visual-frame">
                <img
                  src="/ImageModels/EraGeologi/foto-paleozoikum.jpg"
                  alt="Aptitude Test Visual"
                  className="quiz-image"
                />
                <div className="quiz-image-overlay"></div>
                <div className="quiz-scanline"></div>
                <div className="quiz-visual-badge blink">SYSTEM.READY</div>
              </div>
              {/* Ornamen Cyberpunk */}
              <div className="quiz-decor-box top-left"></div>
              <div className="quiz-decor-box bottom-right"></div>
            </div>

            {/* SISI KANAN: KONTEN KUIS */}
            <div className="quiz-content-side">
              <div
                className="header-tag flicker"
                style={{ color: "var(--neon-green)", marginBottom: "1rem" }}
              >
                ▶ OTENTIKASI PENGETAHUAN
              </div>
              <h2 className="quiz-intro-title">
                APTITUDE <span className="outline-text">TEST</span>
              </h2>
              <p className="quiz-intro-desc">
                Untuk membuka batas keamanan protokol OS.JEJAKPURBA, sistem
                membutuhkan verifikasi kapabilitas Anda. Buktikan pemahaman Anda
                tentang prasejarah dan fungsionalitas sistem ini melalui modul
                evaluasi interaktif.
              </p>

              <div className="quiz-stats-grid">
                <div className="quiz-stat-box">
                  <div className="stat-icon">❓</div>
                  <div className="stat-text">
                    <span className="stat-label">TIPE DATA</span>
                    <span className="stat-value">MULTI-MODUL</span>
                  </div>
                </div>
                <div className="quiz-stat-box">
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-text">
                    <span className="stat-label">DURASI</span>
                    <span className="stat-value">UNLIMITED</span>
                  </div>
                </div>
                <div
                  className="quiz-stat-box"
                  style={{ borderColor: "var(--neon-green)" }}
                >
                  <div className="stat-icon">🔑</div>
                  <div className="stat-text">
                    <span
                      className="stat-label"
                      style={{ color: "var(--neon-green)" }}
                    >
                      REWARD
                    </span>
                    <span className="stat-value" style={{ color: "#fff" }}>
                      ACCESS KEY
                    </span>
                  </div>
                </div>
              </div>

              <div className="quiz-action-wrapper">
                <Link to="/quiz" className="quiz-init-btn">
                  INISIASI EVALUASI SEKARANG ➔
                  <span className="btn-glitch-effect"></span>
                </Link>
                <span className="action-hint">
                  Akses ditolak sebelum evaluasi selesai.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: PEMINDAI GEOLOGIS (MODEL SHOWCASE) */}
      <section className="model-showcase-section">
        <div className="radar-bg-decoration"></div>
        <motion.div
          className="preview-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-tag">NEURAL RECONSTRUCTION ENGINE</div>
          <h2 className="section-title">
            Pemindai <span className="accent">Geologis</span>
          </h2>
          <div className="section-line mx-auto"></div>
          <p className="preview-desc mx-auto">
            Visualisasi rekonstruksi biometrik dari spesimen purba. Pilih subjek
            untuk mengekstrak data struktural dan render visual 3D.
          </p>
        </motion.div>

        <motion.div
          className="model-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredFossils.map((fossil) => (
            <ModelTiltCard
              key={fossil.id}
              fossil={fossil}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </section>

      {/* SECTION 5: TECH STACK SHOWCASE */}

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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
