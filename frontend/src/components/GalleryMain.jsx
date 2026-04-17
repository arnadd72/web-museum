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
          const subData = categoryData.subCategories.find(
            (sub) => sub.title === targetSubCategory,
          );
          if (subData) {
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
  const handleSelect = (key) => setSelectedCategory(encyclopediaData[key]);
  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };
  const handleSubSelect = (sub) => {
    setSelectedSubCategory(sub);
    if (sub.items && sub.items.length > 0) setActiveItem(sub.items[0]);
  };
  const handleBackToSub = () => {
    setSelectedSubCategory(null);
    setActiveItem(null);
  };
  const handleItemClick = (item) => setActiveItem(item);

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
              ? "DATABASE // DOSSIER"
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
              VIEW 1: KATEGORI (ASYMMETRIC GRID)
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
                  Pilih klasifikasi biologis untuk mengakses rekam geologis dan
                  visualisasi.
                </p>
              </div>

              <div className="museum-grid">
                {Object.keys(encyclopediaData).map((key, idx) => {
                  const data = encyclopediaData[key];
                  return (
                    <motion.div
                      variants={cardVariants}
                      key={key}
                      className="exhibit-card"
                      onClick={() => handleSelect(key)}
                      style={{ "--card-color": data.color }}
                    >
                      <div
                        className="card-image-bg"
                        style={{ backgroundImage: `url(${data.image})` }}
                      ></div>
                      <div className="card-gradient-overlay"></div>
                      <div className="card-border-frame"></div>

                      <div className="card-content">
                        <div className="card-top-info">
                          <span className="card-idx">0{idx + 1}</span>
                          <span className="card-tag">KLASIFIKASI UTAMA</span>
                        </div>
                        <div className="card-bottom-info">
                          <h2>{data.title}</h2>
                          <p>{data.desc}</p>
                          <div className="hover-action">BUKA DIREKTORI →</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* =========================================
              VIEW 2: SUB-KATEGORI (ASYMMETRIC GRID)
              ========================================= */}
          {selectedCategory && !selectedSubCategory && (
            <motion.div
              key="view2"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="view-layer"
            >
              <div className="view-header flex-between">
                <div>
                  <button onClick={handleBack} className="btn-text-back">
                    ← KEMBALI KE DIREKTORI UTAMA
                  </button>
                  <h1
                    className="cyber-heading mt-2"
                    style={{ color: selectedCategory.color }}
                  >
                    {selectedCategory.title}
                  </h1>
                </div>
                <div
                  className="sys-status"
                  style={{ color: selectedCategory.color }}
                >
                  {selectedCategory.subCategories.length} SUB-KLASIFIKASI
                  DITEMUKAN
                </div>
              </div>

              <div className="museum-grid sub-museum-grid">
                {selectedCategory.subCategories.map((sub, index) => (
                  <motion.div
                    variants={cardVariants}
                    key={index}
                    className="exhibit-card sub-exhibit-card"
                    onClick={() => handleSubSelect(sub)}
                    style={{ "--card-color": selectedCategory.color }}
                  >
                    <div
                      className="card-image-bg"
                      style={{ backgroundImage: `url(${sub.image})` }}
                    ></div>
                    <div className="card-gradient-overlay"></div>
                    <div className="card-border-frame"></div>

                    <div className="card-content">
                      <div className="card-top-info">
                        <span className="card-tag">SUB-KLASIFIKASI</span>
                      </div>
                      <div className="card-bottom-info">
                        <h3>{sub.title}</h3>
                        <p>{sub.desc}</p>
                        <div className="hover-action">EKSTRAK ENTITAS →</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================
              VIEW 3: DETAIL DOSSIER (SPLIT SCREEN)
              ========================================= */}
          {selectedSubCategory && activeItem && (
            <motion.div
              key="view3"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="view-layer dossier-layout"
            >
              {/* PANEL KIRI: DAFTAR SPESIMEN */}
              <div className="dossier-sidebar">
                <button
                  onClick={handleBackToSub}
                  className="btn-text-back mb-4"
                >
                  ← SUB-KLASIFIKASI
                </button>
                <h3
                  className="sidebar-title"
                  style={{ color: selectedCategory.color }}
                >
                  {selectedSubCategory.title}
                </h3>

                <div className="dossier-list">
                  {selectedSubCategory.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`dossier-list-item ${activeItem.name === item.name ? "active" : ""}`}
                      onClick={() => handleItemClick(item)}
                      style={{ "--node-color": selectedCategory.color }}
                    >
                      <span className="item-num">0{idx + 1}</span>
                      <span className="item-name">{item.name}</span>
                      {activeItem.name === item.name && (
                        <span className="item-status">[ AKTIF ]</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* PANEL KANAN: CINEMATIC DETAIL */}
              <div className="dossier-content">
                <motion.div
                  key={activeItem.name}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="dossier-card"
                >
                  <div
                    className="dossier-hero-img"
                    style={{
                      backgroundImage: `url(${activeItem.image})`,
                      borderColor: selectedCategory.color,
                    }}
                  >
                    <div className="dossier-hero-overlay"></div>
                    <div className="hud-corner top-left"></div>
                    <div className="hud-corner top-right"></div>
                    <div className="hud-corner bottom-left"></div>
                    <div className="hud-corner bottom-right"></div>
                  </div>

                  <div className="dossier-data-panel">
                    <div className="data-header">
                      <h1 style={{ color: selectedCategory.color }}>
                        {activeItem.name}
                      </h1>
                      <div
                        className="status-badge"
                        style={{
                          color:
                            activeItem.status === "MASIH HIDUP"
                              ? "var(--neon-green)"
                              : "var(--neon-red)",
                          borderColor:
                            activeItem.status === "MASIH HIDUP"
                              ? "var(--neon-green)"
                              : "var(--neon-red)",
                        }}
                      >
                        {activeItem.status || "PUNAH"}
                      </div>
                    </div>

                    <p className="dossier-desc">
                      {activeItem.description
                        ? activeItem.description.full
                        : activeItem.desc}
                    </p>

                    <div className="dossier-metrics">
                      <div className="d-metric">
                        <span>FAMILI</span>
                        <strong>{selectedSubCategory.title}</strong>
                      </div>
                      <div className="d-metric">
                        <span>KLASIFIKASI UTAMA</span>
                        <strong>{selectedCategory.title}</strong>
                      </div>
                      <div className="d-metric">
                        <span>DATA VISUAL</span>
                        <strong>TERSEDIA (3D MESH)</strong>
                      </div>
                    </div>

                    <button
                      className="btn-render-3d"
                      onClick={handleGoTo3D}
                      style={{
                        backgroundColor: selectedCategory.color,
                        color: "#000",
                      }}
                    >
                      <span className="icon-cube">⬡</span> INISIASI RENDER 3D
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GalleryMain;