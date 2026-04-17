import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { encyclopediaData } from "../data/encyclopediaData";
import "./GalleryMain.css";

const GalleryMain = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // State untuk navigasi antar sub-kategori (Sekarang untuk Cover Flow)
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // === LOGIC PEMULIHAN STATUS ===
  useEffect(() => {
    if (location.state) {
      const { targetCategory, targetSubCategory, targetItem } = location.state;

      if (targetCategory && encyclopediaData[targetCategory]) {
        const categoryData = encyclopediaData[targetCategory];
        setSelectedCategory(categoryData);

        if (targetSubCategory) {
          const subIndex = categoryData.subCategories.findIndex(
            (sub) => sub.title === targetSubCategory,
          );
          if (subIndex !== -1) {
            setActiveSubIndex(subIndex);
            const subData = categoryData.subCategories[subIndex];
            setSelectedSubCategory(subData);

            if (targetItem) {
              const itemData = subData.items.find(
                (item) => item.name === targetItem,
              );
              if (itemData) setActiveItem(itemData);
            } else if (subData.items && subData.items.length > 0) {
              setActiveItem(subData.items[0]);
            }
          }
        }
      }
    }
  }, [location]);

  // === HANDLERS ===
  const handleSelect = (key) => {
    setSelectedCategory(encyclopediaData[key]);
    setActiveSubIndex(0);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setActiveSubIndex(0);
  };

  const handleSubSelect = (sub) => {
    setSelectedSubCategory(sub);
    if (sub.items && sub.items.length > 0) setActiveItem(sub.items[0]);
  };

  const handleBackToSub = () => {
    setSelectedSubCategory(null);
    setActiveItem(null);
  };

  const handleGoTo3D = () => {
    const categoryKey = Object.keys(encyclopediaData).find(
      (key) => encyclopediaData[key] === selectedCategory,
    );
    navigate("/model-viewer", {
      state: {
        itemData: activeItem,
        returnContext: {
          targetCategory: categoryKey,
          targetSubCategory: selectedSubCategory.title,
          targetItem: activeItem.name,
        },
      },
    });
  };

  // === NAVIGASI VIEW 2 (COVER FLOW) ===
  const handleNextSub = () => {
    if (!selectedCategory) return;
    setActiveSubIndex((prev) =>
      prev === selectedCategory.subCategories.length - 1 ? 0 : prev + 1,
    );
  };
  const handlePrevSub = () => {
    if (!selectedCategory) return;
    setActiveSubIndex((prev) =>
      prev === 0 ? selectedCategory.subCategories.length - 1 : prev - 1,
    );
  };

  // === NAVIGASI VIEW 3 (MAGIC SLIDER) ===
  const activeItemIdx =
    selectedSubCategory && activeItem
      ? selectedSubCategory.items.findIndex((i) => i.name === activeItem.name)
      : 0;

  const handleNextItem = () => {
    if (!selectedSubCategory) return;
    const nextIdx = (activeItemIdx + 1) % selectedSubCategory.items.length;
    setActiveItem(selectedSubCategory.items[nextIdx]);
  };
  const handlePrevItem = () => {
    if (!selectedSubCategory) return;
    const prevIdx =
      activeItemIdx === 0
        ? selectedSubCategory.items.length - 1
        : activeItemIdx - 1;
    setActiveItem(selectedSubCategory.items[prevIdx]);
  };

  // === FRAMER MOTION VARIANTS ===
  const pageVariants = {
    initial: { opacity: 0, y: 40 },
    in: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
    out: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const activeSubData = selectedCategory
    ? selectedCategory.subCategories[activeSubIndex]
    : null;

  return (
    <div className="gallery-container">
      <div className="gallery-bg-glow"></div>
      <div className="gallery-grid-pattern"></div>

      {/* TOP NAVIGATION */}
      <nav className="gallery-top-nav">
        <Link to="/" className="btn-sys-back">
          <span className="arr">←</span> KELUAR ARSIP
        </Link>
        <div className="nav-sys-title">
          <span>
            {selectedSubCategory
              ? "DATABASE // SPESIMEN"
              : selectedCategory
                ? "DATABASE // SUB-KLASIFIKASI"
                : "DATABASE // DIREKTORI UTAMA"}
          </span>
          <div className="sys-blink"></div>
        </div>
      </nav>

      <main className="gallery-main-area">
        <AnimatePresence mode="wait">
          {/* =========================================
              VIEW 1: KATEGORI (CINEMATIC MOVIE PICKER)
              ========================================= */}
          {!selectedCategory && (
            <motion.div
              key="view1"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="view-layer"
            >
              <div className="view-header text-center">
                <h1 className="cyber-heading">
                  DIREKTORI <span className="accent">SPESIMEN</span>
                </h1>
                <p className="cyber-subheading">
                  Pilih klasifikasi biologis untuk memuat rekaman visual dan
                  geologis.
                </p>
              </div>

              <div className="cinematic-roster">
                {Object.keys(encyclopediaData).map((key, idx) => {
                  const data = encyclopediaData[key];
                  return (
                    <motion.div
                      variants={cardVariants}
                      key={key}
                      className="movie-card"
                      onClick={() => handleSelect(key)}
                      style={{ "--card-color": data.color }}
                    >
                      <div
                        className="movie-bg"
                        style={{ backgroundImage: `url(${data.image})` }}
                      ></div>
                      <div className="movie-overlay"></div>

                      <div className="hud-corner top-left"></div>
                      <div className="hud-corner top-right"></div>
                      <div className="hud-corner bottom-left"></div>
                      <div className="hud-corner bottom-right"></div>

                      <div className="movie-title-vertical">{data.title}</div>

                      <div className="movie-content">
                        <div className="movie-info">
                          <span className="movie-idx">
                            0{idx + 1} // KLASIFIKASI UTAMA
                          </span>
                          <h2>{data.title}</h2>
                          <p className="movie-desc">{data.desc}</p>
                        </div>
                        <div className="movie-action">
                          <button className="btn-movie-play">
                            <span className="play-icon">▶</span> AKSES DIREKTORI
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* =========================================
              VIEW 2: SUB-KATEGORI (3D COVER FLOW)
              ========================================= */}
          {selectedCategory && !selectedSubCategory && activeSubData && (
            <motion.div
              key="view2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="coverflow-view"
            >
              {/* Blurred Dynamic Background */}
              <div className="coverflow-bg-wrapper">
                <motion.img
                  key={`bg-${activeSubData.title}`}
                  src={activeSubData.image}
                  className="coverflow-bg-img"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="coverflow-bg-overlay"></div>
              </div>

              {/* Header / Back Button */}
              <div className="coverflow-header">
                <button onClick={handleBack} className="btn-text-back">
                  ← KEMBALI KE DIREKTORI UTAMA
                </button>
                <div
                  className="coverflow-counter"
                  style={{ color: selectedCategory.color }}
                >
                  KLASIFIKASI {activeSubIndex + 1} /{" "}
                  {selectedCategory.subCategories.length}
                </div>
              </div>

              {/* Carousel Center Area */}
              <div className="coverflow-slider-container">
                <button className="cf-nav-btn left" onClick={handlePrevSub}>
                  &lt;
                </button>

                <div className="coverflow-track">
                  {selectedCategory.subCategories.map((sub, idx) => {
                    let positionClass = "cf-inactive";
                    if (idx === activeSubIndex) positionClass = "cf-active";
                    else if (
                      idx === activeSubIndex - 1 ||
                      (activeSubIndex === 0 &&
                        idx === selectedCategory.subCategories.length - 1)
                    )
                      positionClass = "cf-prev";
                    else if (
                      idx === activeSubIndex + 1 ||
                      (activeSubIndex ===
                        selectedCategory.subCategories.length - 1 &&
                        idx === 0)
                    )
                      positionClass = "cf-next";

                    return (
                      <div
                        key={idx}
                        className={`cf-card ${positionClass}`}
                        onClick={() => setActiveSubIndex(idx)}
                        style={{
                          borderColor:
                            positionClass === "cf-active"
                              ? selectedCategory.color
                              : "transparent",
                        }}
                      >
                        <img src={sub.image} alt={sub.title} />
                        <div className="cf-overlay"></div>
                        {positionClass === "cf-active" && (
                          <>
                            <div
                              className="cf-scanline"
                              style={{
                                background: selectedCategory.color,
                                boxShadow: `0 0 15px ${selectedCategory.color}`,
                              }}
                            ></div>
                            <div className="cf-focus-corners">
                              <div className="hud-corner top-left"></div>
                              <div className="hud-corner top-right"></div>
                              <div className="hud-corner bottom-left"></div>
                              <div className="hud-corner bottom-right"></div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button className="cf-nav-btn right" onClick={handleNextSub}>
                  &gt;
                </button>
              </div>

              {/* Bottom Info Panel */}
              <motion.div
                key={`info-${activeSubData.title}`}
                className="coverflow-info-panel"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="cf-info-left">
                  <div
                    className="status-badge"
                    style={{
                      color: selectedCategory.color,
                      borderColor: selectedCategory.color,
                    }}
                  >
                    SUB-KLASIFIKASI: {activeSubData.items.length} SPESIMEN
                  </div>
                  <h1
                    className="cf-title"
                    style={{ color: selectedCategory.color }}
                  >
                    {activeSubData.title}
                  </h1>
                  <p className="cf-desc">{activeSubData.desc}</p>
                </div>

                <div className="cf-info-right">
                  <button
                    className="btn-render-3d"
                    onClick={() => handleSubSelect(activeSubData)}
                    style={{
                      backgroundColor: selectedCategory.color,
                      color: "#000",
                    }}
                  >
                    <span className="icon-cube">≡</span> AKSES DATA SPESIMEN
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* =========================================
              VIEW 3: SPESIMEN DETAIL (MAGIC SLIDER LUNDEV)
              ========================================= */}
          {selectedSubCategory && activeItem && (
            <motion.div
              key="view3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="magic-slider-view"
            >
              {/* Gambar Background Slider */}
              <div className="slider-bg-container">
                <motion.img
                  key={activeItemIdx}
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="slider-main-img"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="slider-overlay"></div>
              </div>

              {/* Konten Slider (Teks Kiri) */}
              <div className="slider-content">
                <motion.div
                  key={`text-${activeItemIdx}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="slider-text-wrapper"
                >
                  <h4
                    className="slider-tag"
                    style={{ color: selectedCategory.color }}
                  >
                    {selectedSubCategory.title} // {selectedCategory.title}
                  </h4>
                  <h1 className="slider-title-main">SPESIMEN</h1>
                  <h1
                    className="slider-title-accent"
                    style={{ color: selectedCategory.color }}
                  >
                    {activeItem.name}
                  </h1>

                  {/* Status Eksistensi Spesimen */}
                  <div
                    className="item-status-glow"
                    style={{
                      color:
                        activeItem.status === "MASIH HIDUP"
                          ? "var(--neon-green)"
                          : "var(--neon-red)",
                      textShadow:
                        activeItem.status === "MASIH HIDUP"
                          ? "0 0 10px var(--neon-green)"
                          : "none",
                    }}
                  >
                    STATUS: {activeItem.status || "PUNAH"}
                  </div>

                  <p className="slider-desc">
                    {activeItem.description
                      ? activeItem.description.full
                      : activeItem.desc}
                  </p>

                  <div className="slider-buttons">
                    <button
                      className="btn-slider-primary"
                      onClick={handleGoTo3D}
                      style={{
                        backgroundColor: selectedCategory.color,
                        color: "#000",
                      }}
                    >
                      RENDER MODEL 3D
                    </button>
                    <button
                      className="btn-slider-secondary"
                      onClick={handleBackToSub}
                    >
                      KEMBALI KE LIST
                    </button>
                  </div>

                  <div className="slider-arrows">
                    <button onClick={handlePrevItem}>&lt;</button>
                    <button onClick={handleNextItem}>&gt;</button>
                  </div>
                </motion.div>
              </div>

              {/* Thumbnails Kanan Bawah */}
              <div className="slider-thumbnails">
                {selectedSubCategory.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`thumb-card ${
                      idx === activeItemIdx ? "active" : ""
                    }`}
                    onClick={() => setActiveItem(item)}
                    style={{ "--accent": selectedCategory.color }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="thumb-img"
                    />
                    <div className="thumb-content">
                      <div className="thumb-title">{item.name}</div>
                      <div className="thumb-desc">{item.status || "Punah"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GalleryMain;
