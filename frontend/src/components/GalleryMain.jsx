import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import "./GalleryMain.css";

const GalleryMain = () => {
  const [encyclopediaData, setEncyclopediaData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/encyclopedia')
      .then(res => res.json())
      .then(data => setEncyclopediaData(data))
      .catch(console.error);
  }, []);

  // === PERBAIKAN 1: LOGIC PEMULIHAN STATUS ===
  useEffect(() => {
    if (!encyclopediaData) return;
    if (location.state) {
      const { targetCategory, targetSubCategory, targetItem } = location.state;

      // 1. Pulihkan Kategori Utama
      if (targetCategory && encyclopediaData[targetCategory]) {
        const categoryData = encyclopediaData[targetCategory];
        setSelectedCategory(categoryData);

        // 2. Pulihkan Sub-Kategori (Jika ada)
        if (targetSubCategory) {
          const subData = categoryData.subCategories.find(
            (sub) => sub.title === targetSubCategory,
          );
          if (subData) {
            setSelectedSubCategory(subData);

            // 3. Pulihkan Item Aktif (Jika ada)
            if (targetItem) {
              const itemData = subData.items.find(
                (item) => item.name === targetItem,
              );
              if (itemData) {
                setActiveItem(itemData);
              }
            } else if (subData.items && subData.items.length > 0) {
              // Fallback ke item pertama jika targetItem tidak spesifik
              setActiveItem(subData.items[0]);
            }
          }
        }
      }
      // Opsional: Bersihkan state agar tidak stuck saat refresh (hapus jika ingin persistent)
      // window.history.replaceState({}, document.title);
    }
  }, [location, encyclopediaData]);

  const handleSelect = (key) => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedCategory(encyclopediaData[key]);
      setIsExiting(false);
    }, 500);
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setIsExiting(false);
    }, 500);
  };

  const handleSubSelect = (sub) => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedSubCategory(sub);
      if (sub.items && sub.items.length > 0) {
        setActiveItem(sub.items[0]);
      }
      setIsExiting(false);
    }, 500);
  };

  const handleBackToSub = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedSubCategory(null);
      setActiveItem(null);
      setIsExiting(false);
    }, 500);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // === PERBAIKAN 2: FUNGSI NAVIGASI KE 3D ===
  const handleGoTo3D = () => {
    // Cari Key Kategori (misal: 'invertebrata') berdasarkan object selectedCategory
    const categoryKey = Object.keys(encyclopediaData).find(
      (key) => encyclopediaData[key] === selectedCategory,
    );

    navigate("/model-viewer", {
      state: {
        itemData: activeItem,
        // Kirim "Jejak" agar bisa kembali ke titik ini
        returnContext: {
          targetCategory: categoryKey,
          targetSubCategory: selectedSubCategory.title,
          targetItem: activeItem.name,
        },
      },
    });
  };

  return (
    <div className="gallery-container">
      <div className="grid-bg"></div>
      <div className="vignette"></div>
      
      {!encyclopediaData && (
        <div style={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'absolute', width: '100%', zIndex: 999}}>
           <h2>SINKRONISASI DATABASE...</h2>
        </div>
      )}

      <nav className="gallery-nav">
        <Link to="/" className="nav-back">
          /// KELUAR SISTEM
        </Link>
        <div className="nav-title">
          {selectedSubCategory ? "DETAIL DATABASE" : "ARSIP GALERI"}
        </div>
      </nav>

      <main className="gallery-content">
        {/* VIEW 1: KATEGORI */}
        {encyclopediaData && !selectedCategory && (
          <div
            className={`selection-grid ${isExiting ? "fade-out-down" : "fade-in-up"}`}
          >
            <h1 className="main-heading">
              KATEGORI <span className="blink"></span>
            </h1>
            <div className="cards-wrapper">
              {Object.keys(encyclopediaData).map((key) => {
                const data = encyclopediaData[key];
                return (
                  <div
                    key={key}
                    className="compact-card"
                    onClick={() => handleSelect(key)}
                    style={{ "--card-color": data.color }}
                  >
                    <div className="card-image-box">
                      <img src={data.image} alt={data.title} />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="card-text">
                      <h2>{data.title}</h2>
                      <p>{data.desc}</p>
                    </div>
                    <div className="hover-border"></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: SUB-KATEGORI */}
        {selectedCategory && !selectedSubCategory && (
          <div
            className={`sub-selection-view ${isExiting ? "fade-out-down" : "fade-in-up"}`}
          >
            <div className="sub-header">
              <button onClick={handleBack} className="back-arrow-btn">
                ← KEMBALI KE KATEGORI
              </button>
              <h2 style={{ color: selectedCategory.color }}>
                {selectedCategory.title}{" "}
                <span style={{ opacity: 0.5, fontSize: "0.6em" }}>
                  /// ARSIP
                </span>
              </h2>
            </div>
            <div className="sub-cards-wrapper">
              {selectedCategory.subCategories.map((sub, index) => (
                <div
                  key={index}
                  className="sub-card-visual"
                  style={{
                    "--item-color": selectedCategory.color,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="sub-visual-box">
                    <img src={sub.image} alt={sub.title} />
                    <div className="index-badge">0{index + 1}</div>
                  </div>
                  <div className="sub-content-box">
                    <h3>{sub.title}</h3>
                    <p>{sub.desc}</p>
                    <button
                      className="mini-inspect-btn"
                      onClick={() => handleSubSelect(sub)}
                    >
                      LIHAT DATA
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: DETAIL SPLIT SCREEN */}
        {selectedSubCategory && activeItem && (
          <div
            className={`split-view-container ${isExiting ? "fade-out-down" : "fade-in-up"}`}
          >
            <div className="left-panel-list">
              <button
                onClick={handleBackToSub}
                className="back-arrow-btn"
                style={{ marginBottom: "2rem" }}
              >
                ← KEMBALI KE {selectedCategory.title}
              </button>

              <h3
                className="list-heading"
                style={{ color: selectedCategory.color }}
              >
                {selectedSubCategory.title}
              </h3>
              <div className="list-scroll-area">
                {selectedSubCategory.items.map((item, idx) => (
                  <button
                    key={idx}
                    className={`list-item-btn ${activeItem.name === item.name ? "active" : ""}`}
                    onClick={() => handleItemClick(item)}
                    style={{ "--accent": selectedCategory.color }}
                  >
                    <span className="item-idx">0{idx + 1}</span>
                    <span className="item-name">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="right-panel-detail">
              <div className="detail-image-wrapper">
                <img
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="detail-img"
                  style={{ objectFit: "contain", backgroundColor: "#000" }}
                />
                <div className="scan-overlay"></div>
                <div className="img-caption">
                  {activeItem.name} /// DATA VISUAL
                </div>
              </div>

              <div className="detail-info-box">
                <h1 style={{ color: selectedCategory.color }}>
                  {activeItem.name}
                </h1>
                <p>
                  {activeItem.description
                    ? activeItem.description.full
                    : activeItem.desc}
                </p>

                <div className="data-metrics">
                  <div className="metric">
                    <span>TIPE:</span> {selectedSubCategory.title}
                  </div>

                  {/* PERBAIKAN DI SINI: STATUS DINAMIS & BERWARNA */}
                  <div className="metric">
                    <span>STATUS:</span>
                    <strong
                      style={{
                        color:
                          activeItem.status === "MASIH HIDUP"
                            ? "#00ff88"
                            : "#ff3333",
                        marginLeft: "8px",
                        textShadow:
                          activeItem.status === "MASIH HIDUP"
                            ? "0 0 10px rgba(0,255,136,0.3)"
                            : "none",
                      }}
                    >
                      {activeItem.status || "PUNAH"}
                    </strong>
                  </div>
                </div>

                <div className="action-row">
                  {/* Gunakan fungsi handleGoTo3D yang baru */}
                  <button
                    className="view-3d-btn"
                    style={{ "--btn-color": selectedCategory.color }}
                    onClick={handleGoTo3D}
                  >
                    <span className="icon-3d">❒</span> LIHAT MODEL 3D
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryMain;
