import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./LandingPage.css";

const LandingPage = ({ onStart, onTimeline }) => {
  const observerRef = useRef(null);
  const scrollRef = useRef(null);
  const audioRef = useRef(null);

  // STATE
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // DATA
  const dinoImageLink = "https://i0.wp.com/genemil.com/wp-content/uploads/2020/07/zaman-paleozoikum.jpg?fit=800%2C600&ssl=1";

  const [featuredFossils, setFeaturedFossils] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/encyclopedia')
      .then(res => res.json())
      .then(data => {
        if (!data || Object.keys(data).length === 0 || data.error) {
          setFeaturedFossils([
            { id: 1, title: "DATA KOSONG", desc: "Silakan tambahkan data di phpMyAdmin.", type: "SYSTEM", era: "MUSEUM", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQ53hI5D7wMRZ4jkuZBqC-AXLvzDL39rnNQ&s", accentColor: "#E63946" }
          ]);
          return;
        }
        
        // Ekstrak 5 Item dari Database untuk diletakkan di Carousel Beranda
        let extractedItems = [];
        let itemIndex = 1;

        // Ambil beberapa item acak atau spesifik untuk slider
        Object.values(data).forEach(mainGroup => {
            if (mainGroup.subCategories) {
                mainGroup.subCategories.forEach(sub => {
                    if (sub.items) {
                        sub.items.forEach(item => {
                            if (extractedItems.length < 10) { // Limit ke 10 foto unggulan
                                extractedItems.push({
                                    id: itemIndex++,
                                    title: item.name.toUpperCase(),
                                    desc: item.description?.short || "Tidak ada deskripsi.",
                                    type: mainGroup.title.toUpperCase(),
                                    era: item.period || "KOLEKSI MUSEUM",
                                    image: item.image || "",
                                    accentColor: mainGroup.color || "#FFF",
                                    modelPath: item.modelPath
                                });
                            }
                        });
                    }
                });
            }
        });
        
        setFeaturedFossils(extractedItems);
      })
      .catch(err => {
        console.error("Gagal terhubung ke database:", err);
      });
  }, []);

  // LOGIC PRELOADER
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // LOGIC AUDIO
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch((e) => console.log("Audio play failed", e));
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  // LOGIC MOBILE CHECK
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // LOGIC AUTO SCROLL PERMANEN (JALAN TERUS)
  useEffect(() => {
    if (isMobile || isLoading) return;
    const speed = 1;
    let animationId;
    const runScroll = () => {
      const el = scrollRef.current;
      if (el) {
        const oneSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= oneSetWidth * 2) {
          el.scrollLeft = oneSetWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft = oneSetWidth;
        } else {
          el.scrollLeft += speed;
        }
      }
      animationId = requestAnimationFrame(runScroll);
    };
    animationId = requestAnimationFrame(runScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isMobile, isLoading]);

  // LOGIC ANIMASI ELEMENT MUNCUL
  useEffect(() => {
    if (isLoading) return;
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-active");
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll(".animate-hidden");
    hiddenElements.forEach((el) => observerRef.current.observe(el));
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, [isLoading]);

  // ICONS (SVG replacements for Emojis)
  const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const BoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M17 10c.8 0 1.5-.7 1.5-1.5S17.8 7 17 7c-.6 0-1.2.4-1.4 1-.2-.6-.8-1-1.4-1-.8 0-1.5.7-1.5 1.5 0 .4.2.8.5 1.1L8.1 14.8c-.3-.2-.7-.4-1.1-.4C6.2 14.4 5.5 15 5.5 16S6.2 17.5 7 17.5c.6 0 1.2-.4 1.4-1 .2.6.8 1 1.4 1 .8 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1l5-5c.3.2.7.3 1.1.3z"></path>
    </svg>
  );

  const GlobeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  if (isLoading) {
    return (
      <div className="preloader-container">
        <div className="loader-content">
          <div className="loader-ring"></div>
          <div className="loader-text">Museum Sedang Disiapkan</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <audio ref={audioRef} loop><source src="/ambience.mp3" type="audio/mp3" /></audio>

      {/* FLOAT AUDIO */}
      <div className="audio-control" onClick={toggleAudio}>
        {isMuted ? (
          <span className="sound-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            Suara Mati
          </span>
        ) : (
          <span className="sound-active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            Suara Aktif
          </span>
        )}
      </div>

      <CyberChatbot dataFosil={featuredFossils} />

      {/* NAVBAR */}
      <nav className="navbar animate-fade-down">
        <div className="logo-section">
          <span className="logo-text">Jejak Purba</span>
        </div>
        <div className="nav-links">
          <a href="#home" className="nav-link active">Beranda</a>
          <Link to="/era-geologi" className="nav-link">Pengetahuan Era</Link>
          <Link to="/gallery" className="nav-link">Koleksi Fosil</Link>
          <Link to="/visual-3d" className="nav-link">Pameran 3D</Link>
        </div>
      </nav>

      {/* RADICAL SPLIT HERO SECTION */}
      <main id="home" className="hero-split-section">
        <div className="hero-text-content animate-hidden slide-right">
          <div className="badge-outline">Tur Edukasi Digital</div>
          <h1 className="hero-title">
            Ekskavasi <br /> Ruang dan Waktu
          </h1>
          <p className="hero-desc">
            Melangkah menembus perbatasan ribuan milenium. Temukan sejarah kehidupan pra-manusia melalui kurasi arsip paleontologi yang otentik dan interaktif di museum kami.
          </p>
          <div className="cta-container">
            <button className="primary-btn-solid" onClick={onStart}>
              Mulai Tur Sekarang
            </button>
            <button className="secondary-btn-outline" onClick={onTimeline}>
              <span className="play-icon-svg">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </span>
              Linimasa
            </button>
          </div>

          <div className="stats-integrated">
            <div className="stat"><strong>50+</strong> <span>Spesimen</span></div>
            <div className="stat"><strong>3</strong> <span>Era Geologi</span></div>
            <div className="stat"><strong>3D</strong> <span>Interaktif</span></div>
          </div>
        </div>

        <div className="hero-visual-content animate-hidden slide-left">
          <div className="video-arch-mask">
            <video autoPlay loop muted playsInline className="hero-video">
              <source src="/background-kedua.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="decoration-circle"></div>
        </div>
      </main>

      {/* RADICAL BENTO BOX FEATURES / ABOUT */}
      <section id="about" className="bento-section">
        <div className="bento-container">
          
          <div className="bento-header animate-hidden slide-up">
            <h2 className="section-title">Klasifikasi Koleksi Spesimen</h2>
            <p className="section-desc">Setiap penemuan dikurasi berdasar ilmu paleontologi yang akurat. Jelajahi berdasarkan tiga pilar utama penelusuran sejarah bumi.</p>
          </div>

          <div className="bento-grid">
            
            <div className="bento-card card-large animate-hidden slide-up">
              <div className="bento-content">
                <div className="icon-wrapper"><GlobeIcon /></div>
                <h3>Penelusuran Era Geologi</h3>
                <p>Meski kehidupan modern terasa sangat tua, sejarah bumi telah melalui beberapa eon, mulai dari Paleozoikum (Zaman kehidupan purba) hingga Kenozoikum (Mamalia dan burung modern).</p>
                <Link to="/era-geologi" className="bento-link">Lihat Era Geologi →</Link>
              </div>
              <div className="bento-image" style={{backgroundImage: `url(${dinoImageLink})`}}></div>
            </div>

            <div className="bento-card card-small animate-hidden slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="bento-content">
                <div className="icon-wrapper"><SearchIcon /></div>
                <h3>Kelompok Hewan Utama</h3>
                <p>Vertebrata & Invertebrata.</p>
                <Link to="/gallery" state={{ targetCategory: "BIO" }} className="bento-link">Filter Koleksi →</Link>
              </div>
            </div>

            <div className="bento-card card-small animate-hidden slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="bento-content">
                <div className="icon-wrapper"><BoneIcon /></div>
                <h3>Jenis Peninggalan Fosil</h3>
                <p>Fosil Tubuh, Jejak, atau cetakan.</p>
                <Link to="/gallery" state={{ targetCategory: "FOSSIL" }} className="bento-link">Filter Fosil →</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HORIZONTAL CAROUSEL PREVIEW */}
      <section className="horizontal-gallery-section animate-hidden slide-up">
        <div className="gallery-header">
          <h2>Koleksi Unggulan Pameran</h2>
        </div>
        <div className="gallery-track-wrapper">
          <div className="gallery-track" ref={scrollRef}>
            {[...featuredFossils, ...featuredFossils, ...featuredFossils].map((item, index) => (
              <FossilCard key={index} item={item} onStart={onStart} />
            ))}
          </div>
        </div>
      </section>

      {/* MINIMALIST FOOTER */}
      <footer className="minimal-footer">
        <div className="footer-top">
          <div className="brand-col">
            <h3>Jejak Purba</h3>
            <p>Platform edukasi sejarah peradaban bumi dengan balutan teknologi ruang pameran modern berbasis web.</p>
          </div>
          <div className="links-col">
            <h4>Eksplorasi</h4>
            <a href="#home">Beranda Tur</a>
            <Link to="/era-geologi">Materi Geologi</Link>
            <Link to="/gallery">Arsip Fosil</Link>
          </div>
          <div className="links-col">
            <h4>Kurator Utama</h4>
            <span>Fajrina Nurhaliza</span>
            <span>Arvan Murbiyanto</span>
            <span>Arnanda Setya Nosa</span>
            <span>Ihsan Nafis</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Museum Jejak Purba. Dibangun untuk riset dan publikasi edukasi interaktif.</p>
        </div>
      </footer>
    </div>
  );
};

/* ======================================================== */
/* 2. CHATBOT COMPONENT (NATURAL, NO AI LABELS)             */
/* ======================================================== */

const CyberChatbot = ({ dataFosil }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Selamat datang di pameran. Ada spesimen khusus yang sedang Anda teliti hari ini?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const generateGeminiResponse = async (userQuery) => {
    try {
      const contextData = JSON.stringify(dataFosil);
      // Removed AI and robotic language, made instructions focus on being a human-like guide
      const prompt = `
        Peranmu: Pemandu Museum bernama Pandu. 
        Tugas: Berikan jawaban santai, natural, manusiawi dan sopan berdasarkan data fosil ini.
        Data: ${contextData}
        Pantangan: JANGAN SEBUT KAMU ADALAH AI. Jangan gunakan format poin yang kaku. Bicara seperti ahli paleontologi yang sabar mengobrol.
        Tamu bertanya: "${userQuery}"
      `;
      const result = await model.generateContent(prompt);
      return (await result.response).text();
    } catch (error) {
      return "Sepertinya saya perlu mengecek literatur tentang itu, ada pertanyaan lain?";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const botReplyText = await generateGeminiResponse(userMsg.text);
    setMessages((prev) => [...prev, { text: botReplyText, sender: "bot" }]);
    setIsTyping(false);
  };

  const GuideIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <div className={`natural-chat-container ${isOpen ? "open" : ""}`}>
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Tutup Panduan" : <span style={{display: 'flex', gap: '8px', alignItems: 'center'}}><GuideIcon /> Tanya Pemandu</span>}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="guide-avatar">
              <GuideIcon />
            </div>
            <div className="guide-info">
              <h4>Pandu</h4>
              <p>Pemandu Kurasi Museum</p>
            </div>
          </div>

          <div className="chat-messages-area">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-row ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble-row bot">
                <div className="chat-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              placeholder="Tuliskan pertanyaan Anda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

/* ======================================================== */
/* 3. FOSSIL CARD COMPONENT                                 */
/* ======================================================== */

const FossilCard = ({ item, onStart }) => (
  <div className="elegant-card">
    <div className="card-media">
      <img src={item.image} alt={item.title} />
      <div className="era-badge">{item.era}</div>
    </div>
    <div className="card-info">
      <span className="card-type" style={{ color: item.accentColor }}>{item.type}</span>
      <h4>{item.title}</h4>
      <p>{item.desc}</p>
      <button className="text-btn" onClick={onStart}>Baca Literatur →</button>
    </div>
  </div>
);

export default LandingPage;
