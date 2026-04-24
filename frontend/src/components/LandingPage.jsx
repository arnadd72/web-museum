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
const LandingPage = ({ onStart, onTimeline, userData }) => {
  const audioRef = useRef(null);
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const modelGridRef = useRef(null);

  const scrollToIndex = (index) => {
    if (modelGridRef.current) {
      const card = modelGridRef.current.children[index];
      if (card) {
        const containerWidth = modelGridRef.current.offsetWidth;
        const cardOffset = card.offsetLeft;
        const cardWidth = card.offsetWidth;

        modelGridRef.current.scrollTo({
          left: cardOffset - containerWidth / 2 + cardWidth / 2,
          behavior: "smooth",
        });
        setActiveModelIndex(index);
      }
    }
  };

  const nextModel = () => {
    const nextIdx = (activeModelIndex + 1) % featuredFossils.length;
    scrollToIndex(nextIdx);
  };

  const prevModel = () => {
    const prevIdx =
      (activeModelIndex - 1 + featuredFossils.length) % featuredFossils.length;
    scrollToIndex(prevIdx);
  };

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
    const timer = setTimeout(() => setIsLoading(false), 700);
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
          <div className="logo-main-brand">PURBATECH</div>

          {userData?.rank && (
            <div className="nav-profile-stack">
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
          <a href="#home" className="nav-link active">
            BERANDA
          </a>
          <Link to="/era-geologi" className="nav-link">
            ERA ZAMAN
          </Link>
          <Link to="/gallery" className="nav-link">
            ENSIKLOPEDIA
          </Link>
          <Link to="/visual-3d" className="nav-link">
            VISUAL 3D
          </Link>
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
          className={`hamburger-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {menuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="mobile-nav-menu" onClick={(e) => e.stopPropagation()}>
            <a
              href="#home"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              BERANDA
            </a>
            <Link
              to="/era-geologi"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              ERA ZAMAN
            </Link>
            <Link
              to="/gallery"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              ENSIKLOPEDIA
            </Link>
            <Link
              to="/visual-3d"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              VISUAL 3D
            </Link>
            <Link
              to="/quiz"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              KUIS
            </Link>
          </nav>
        </div>
      )}

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
              <span className="live-dot"></span> PURBATECH WEBSITE
            </div>
            <h1 className="hero-title">
              Evolusi <br />
              <span className="outline-text">Digital</span>
            </h1>
            <p className="hero-desc text-center">
              Platform museum digital yang menggabungkan fosil, ensiklopedia
              makhluk hidup, dan pengalaman interaktif. Temukan dunia purba,
              pelajari evolusi, dan uji pengetahuanmu dalam satu ekosistem
              futuristik.
            </p>
            <div className="cta-container justify-center">
              <button className="explore-btn" onClick={onStart}>
                MULAI JELAJAHI
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
            <span className="telemetry-label">ERA ZAMAN</span>
          </div>
          <div className="telemetry-divider"></div>
          <div className="telemetry-item">
            <span className="telemetry-value">50+</span>
            <span className="telemetry-label">ENTITAS SPESIMEN</span>
          </div>
          <div className="telemetry-divider"></div>
          <div className="telemetry-item">
            <span className="telemetry-value">100%</span>
            <span className="telemetry-label">INTEGRITAS DATA</span>
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
            <div
              className="bento-bg"
              style={{ backgroundImage: `url(${dinoImageLink})` }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
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
            <div
              className="bento-bg"
              style={{
                backgroundImage: `url('/ImageModels/EraGeologi/trex.jpg')`,
              }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
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
            <div
              className="bento-bg"
              style={{
                backgroundImage: `url('/ImageModels/EraGeologi/anomalocaris.jpg')`,
              }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>JENIS FOSIL</h3>
              <p>Fosil Tubuh, Jejak, dan Terawetkan.</p>
              <Link to="/gallery" className="bento-btn-simple">
                LIHAT SELENGKAPNYA →
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bento-item bento-era">
            <div
              className="bento-bg"
              style={{
                backgroundImage: `url('/ImageModels/EraGeologi/foto-paleozoikum.jpg')`,
              }}
            ></div>
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>ERA GEOLOGI</h3>
              <p>Paleozoikum hingga Kenozoikum.</p>
              <Link to="/era-geologi" className="bento-btn-simple">
                LIHAT SELENGKAPNYA →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 4: KUIS PREVIEW (EVALUASI) - REVAMPED */}
      <section className="quiz-section-revamp">
        <div className="quiz-container-revamp">
          <div className="quiz-split-layout">
            {/* Visual Side */}
            <motion.div
              className="quiz-visual-side"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="quiz-image-wrapper">
                <img
                  src="/ImageModels/EraGeologi/1backgroundquiz.jpg"
                  alt="Quiz Preview"
                  className="quiz-main-img"
                />
                <div className="image-scanline"></div>
                <div className="image-overlay-tech"></div>
                <div className="image-badge">LEVEL: EXPERT</div>
              </div>
              <div className="quiz-decoration-elements">
                <div className="decor-circle"></div>
                <div className="decor-dots"></div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              className="quiz-content-side"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="content-header">
                <span className="system-tag">EVALUATION MODULE</span>
                <h2 className="glitch-text" data-text="MODUL EVALUASI">
                  MODUL <span className="accent">EVALUASI</span>
                </h2>
              </div>

              <p className="quiz-description">
                Uji kecerdasan dan pemahaman Anda tentang kronologi sejarah
                bumi. Selesaikan tantangan kognitif ini untuk mendapatkan{" "}
                <span className="highlight">E-CERTIFICATE </span>
                yang dapat diunduh.
              </p>

              <div className="quiz-stats-mini">
                <div className="stat-mini-item">
                  <span className="stat-icon-tech">01</span>
                  <div className="stat-info">
                    <span className="stat-label">Total</span>
                    <span className="stat-value">45 SOAL</span>
                  </div>
                </div>
                <div className="stat-mini-item">
                  <span className="stat-icon-tech">02</span>
                  <div className="stat-info">
                    <span className="stat-label">REWARD</span>
                    <span className="stat-value">E-CERTIFICATE</span>
                  </div>
                </div>
              </div>

              <div className="quiz-action-area">
                <div className="security-check">
                  <div className="check-dot"></div>
                  <span>Daftarkan diri anda</span>
                </div>
                <Link to="/quiz" className="start-quiz-btn-revamp">
                  MULAI OTENTIKASI SEKARANG
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
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

        <div className="mobile-model-nav-wrapper">
          <button className="mobile-model-nav prev" onClick={prevModel}>
            &lt;
          </button>
          <motion.div
            className="model-grid"
            ref={modelGridRef}
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
          <button className="mobile-model-nav next" onClick={nextModel}>
            &gt;
          </button>
        </div>
      </section>

      {/* SECTION 5: TECH STACK SHOWCASE */}

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>PURBATECH</h2>
            <p>Digital Museum Project</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>EKSPLORASI</h4>
              <a href="#home">Beranda</a>
              <Link to="/era-geologi">Era Zaman</Link>
              <Link to="/gallery">Ensiklopedia</Link>
            </div>
            <div className="link-group">
              <h4>TEKNOLOGI</h4>
              <span>React / Framer Motion</span>
              <span>CSS Animation</span>
              <span>Interactive Quiz</span>
            </div>
            <div className="link-group">
              <h4>TIM PENGEMBANG</h4>
              <span>Yesika Widiyani</span>
              <span>Arvan Murbiyanto</span>
              <span>Arnanda Setya Nosa</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2026 PURBATECH. Dirancang khusus untuk Eksibisi Edukasi
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
