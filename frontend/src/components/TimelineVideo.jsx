import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./TimelineVideo.css";

const TimelineVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const [isDecrypting, setIsDecrypting] = useState(true);

  // Menerima data video yang dikirim dari EraGeologi
  const videoSource = location.state?.videoSrc || "/timeline-dinasaurus.mp4";
  const fileName = videoSource.split("/").pop().toUpperCase();

  // Logika untuk mendeteksi Era Geologi dari nama file video
  let detectedEra = "EVOLUSI BUMI"; // Default

  if (fileName.includes("TIMELINE-DINASAURUS.MP4")) {
    detectedEra = "EVOLUSI BUMI";
  } else if (fileName.includes("MESO")) {
    detectedEra = "MESOZOIKUM";
  } else if (fileName.includes("PALEO")) {
    detectedEra = "PALEOZOIKUM";
  } else if (fileName.includes("KENO") || fileName.includes("MAMALIA")) {
    detectedEra = "KENOZOIKUM (ZAMAN MAMALIA)";
  }

  // Efek Dekripsi Buatan (Loading Screen)
  useEffect(() => {
    const timer = setTimeout(() => setIsDecrypting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Efek khusus untuk memastikan video mencoba memutar dengan suara
  useEffect(() => {
    if (!isDecrypting && videoRef.current) {
      videoRef.current.volume = 1.0;
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay dengan suara diblokir browser:", error);
        });
      }
    }
  }, [videoSource, isDecrypting]);

  if (isDecrypting) {
    return (
      <div className="video-page-container flex-center">
        <div className="decryption-loader">
          <div className="cyber-spinner"></div>
          <h2 className="blink-text">TUNGGU SEBENTAR...</h2>
          <p className="cyber-code">MENGAKSES VIDEO: {fileName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-page-container">
      {/* BACKGROUND ELEMENTS */}
      <div className="video-grid-bg"></div>
      <div className="video-radial-glow"></div>

      {/* TOP NAVIGATION */}
      <nav className="video-nav">
        <button className="video-back-btn" onClick={() => navigate(-1)}>
          <span className="back-arrow">←</span> KEMBALI KE BERANDA
        </button>
        <div className="video-status-badge blink-text">
          <span className="status-dot"></span> ARSIP VIDEO
        </div>
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <div className="timeline-layout-wrapper">
        {/* KIRI: VIDEO FRAME */}
        <motion.div
          className="video-main-section"
          initial={{ opacity: 0, scale: 0.95, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="video-header">
            <h1 className="glitch-title">ARSIP EVOLUSI BUMI</h1>
            <p className="subtitle-tech">PALEONTOLOGY VISUAL RECONSTRUCTION</p>
          </div>

          <div className="cyber-video-frame">
            <video
              ref={videoRef}
              key={videoSource}
              className="main-video"
              controls
              autoPlay
              loop
            >
              <source src={videoSource} type="video/mp4" />
              Browser Anda tidak mendukung video.
            </video>

            {/* Efek visual tambahan di atas video */}
            <div className="scan-line"></div>
            <div className="video-vignette"></div>

            {/* Corner Decors */}
            <svg className="frame-corner tl" viewBox="0 0 30 30">
              <path
                d="M0,30 L0,0 L30,0"
                fill="none"
                stroke="#00d2ff"
                strokeWidth="4"
              />
            </svg>
            <svg className="frame-corner tr" viewBox="0 0 30 30">
              <path
                d="M0,0 L30,0 L30,30"
                fill="none"
                stroke="#00d2ff"
                strokeWidth="4"
              />
            </svg>
            <svg className="frame-corner bl" viewBox="0 0 30 30">
              <path
                d="M0,0 L0,30 L30,30"
                fill="none"
                stroke="#00d2ff"
                strokeWidth="4"
              />
            </svg>
            <svg className="frame-corner br" viewBox="0 0 30 30">
              <path
                d="M30,0 L30,30 L0,30"
                fill="none"
                stroke="#00d2ff"
                strokeWidth="4"
              />
            </svg>
          </div>
        </motion.div>

        {/* KANAN: TELEMETRY PANEL DENGAN INFO GEOLOGI */}
        <motion.div
          className="video-telemetry-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="telemetry-panel">
            <div className="panel-header">
              <h3>SPATIAL_DATA</h3>
              <span className="file-id">{fileName}</span>
            </div>

            <div className="telemetry-data-grid">
              <div className="telemetry-item">
                <span className="t-label">TEMPORAL SYNC</span>
                <span className="t-value" style={{ color: "#00ff88" }}>
                  100% STABLE
                </span>
              </div>
              <div className="telemetry-item">
                <span className="t-label">ERA TARGET</span>
                <span
                  className="t-value"
                  style={{ fontSize: "0.95rem", color: "#00d2ff" }}
                >
                  {detectedEra}
                </span>
              </div>
              <div className="telemetry-item">
                <span className="t-label">ENVIRONMENT</span>
                <span className="t-value">SIMULATION ON</span>
              </div>
              <div className="telemetry-item">
                <span className="t-label">DATA SOURCE</span>
                <span className="t-value">YOUTUBE</span>
              </div>
            </div>

            <div className="audio-visualizer-box">
              <span className="t-label">BIO-ACOUSTIC RADAR</span>
              <div className="cyber-equalizer">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className="system-warning">
              <span className="warn-icon">⚠</span>
              <p>
                INFO SISTEM: Arsip visual ini telah dikalibrasi untuk kenyamanan
                observasi Anda. Beberapa detail lingkungan purba disesuaikan
                agar optimal untuk keperluan edukasi dan penelitian.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineVideo;
