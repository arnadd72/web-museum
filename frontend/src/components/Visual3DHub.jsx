import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./Visual3DHub.css";

const Visual3DHub = ({ userData }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(
    () => sessionStorage.getItem("visual3d_filter") || "ALL",
  );
  const [searchQuery, setSearchQuery] = useState(
    () => sessionStorage.getItem("visual3d_search") || "",
  );
  const [selectedItem, setSelectedItem] = useState(null);

  const [dbData, setDbData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA DARI DATABASE
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/encyclopedia")
      .then((res) => res.json())
      .then((data) => {
        setDbData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data dari database:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && dbData) {
      const savedScroll = sessionStorage.getItem("visual3d_scroll");
      if (savedScroll) {
        setTimeout(() => {
          const container = document.querySelector(".hub-content");
          if (container) {
            container.scrollTop = parseInt(savedScroll, 10);
          }
        }, 100);
        sessionStorage.removeItem("visual3d_scroll");
        sessionStorage.removeItem("visual3d_filter");
        sessionStorage.removeItem("visual3d_search");
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [isLoading, dbData]);

  const allItems = useMemo(() => {
    let collected = [];
    if (dbData) {
      Object.keys(dbData).forEach((mainKey) => {
        const mainCategory = dbData[mainKey];
        if (mainCategory.subCategories) {
          mainCategory.subCategories.forEach((sub) => {
            if (sub.items) {
              sub.items.forEach((item) => {
                collected.push({
                  ...item,
                  category: mainCategory.title,
                  categoryId: mainKey,
                  subCategory: sub.title,
                  color: mainCategory.color,
                });
              });
            }
          });
        }
      });
    }
    return collected;
  }, [dbData]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory = filter === "ALL" || item.categoryId === filter;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.subCategory.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery, allItems]);

  const handleProceed = () => {
    if (selectedItem) {
      sessionStorage.setItem("visual3d_filter", filter);
      sessionStorage.setItem("visual3d_search", searchQuery);
      const container = document.querySelector(".hub-content");
      if (container) {
        sessionStorage.setItem(
          "visual3d_scroll",
          container.scrollTop.toString(),
        );
      }

      navigate("/model-viewer", {
        state: {
          itemData: selectedItem,
          returnPath: "/visual-3d",
        },
      });
    }
  };

  return (
    <div className="hub-container">
      {/* Background Ornaments */}
      <div className="hub-grid-bg"></div>
      <div className="radial-glow-center"></div>

      <nav className="hub-nav">
        <div className="nav-left-group">
          <Link to="/" className="hub-back-btn">
            <span className="back-arrow">←</span> KEMBALI KE BERANDA
          </Link>
          <div className="hub-status">
            <div className="status-dot"></div>
            <span>GALERI VISUAL 3D</span>
          </div>
        </div>

        {userData?.rank && (
          <div className="nav-profile-stack gallery-profile">
            <div className="nav-rank-badge-modern">{userData.rank}</div>
            {userData?.name && (
              <div className="nav-user-id-modern">
                <span className="status-dot-blink"></span>
                {userData.name.toUpperCase()}
              </div>
            )}
          </div>
        )}
      </nav>

      <main className="hub-content">
        {/* HEADER & CONTROL PANEL */}
        <div className="hub-header-container">
          <div className="header-title-box">
            <h1 className="glitch-title" data-text="ARSIP SPESIMEN">
              ARSIP SPESIMEN
            </h1>
            <p className="header-subtitle">
              Pilih entitas biologis untuk mengekstrak model 3D dan simulasi
              struktural.
            </p>
          </div>

          <div className="hud-control-panel">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>

            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="[ KETIK NAMA SPESIES ]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="search-icon">⌕</div>
            </div>

            <div className="filter-bar">
              {["ALL", "BIO", "FOSSIL", "ERA"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  <span className="btn-decor-left"></span>
                  {f === "BIO"
                    ? "MAKHLUK HIDUP"
                    : f === "ERA"
                      ? "ERA ZAMAN"
                      : f === "FOSSIL"
                        ? "JENIS FOSIL"
                        : "SEMUA DATA"}
                  <span className="btn-decor-right"></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HOLOGRAPHIC GRID & CARDS */}
        {filteredItems.length > 0 ? (
          <div className="hub-grid">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="holo-card fade-in-up"
                onClick={() => setSelectedItem(item)}
                style={{
                  "--accent": item.color,
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <div className="holo-card-inner">
                  <div className="holo-img-box">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <div className="holo-overlay"></div>
                    <div className="card-scanline"></div>
                  </div>

                  <div className="holo-info">
                    <div className="holo-cat" style={{ color: item.color }}>
                      {item.subCategory}
                    </div>
                    <h3 className="holo-title">{item.name}</h3>
                    <div className="holo-meta">
                      <span>SYS_ID: 0{idx + 1}</span>
                      <span className="blink-text">READY</span>
                    </div>
                  </div>

                  <div className="holo-border-top"></div>
                  <div className="holo-border-bottom"></div>
                  <div className="holo-action-hint">RENDER 3D ➔</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results fade-in-up">
            <div className="error-icon blink-text">⚠</div>
            <h2>DATA TIDAK DITEMUKAN</h2>
            <p>Anomali pencarian. Spesimen tidak terdaftar di database.</p>
            <button
              className="reset-search-btn"
              onClick={() => {
                setSearchQuery("");
                setFilter("ALL");
              }}
            >
              [ RESET PARAMETER ]
            </button>
          </div>
        )}
      </main>

      {/* CYBER-MODAL POPUP */}
      {selectedItem && (
        <div className="cyber-modal-overlay">
          <div className="cyber-modal slide-up">
            <div className="cyber-modal-corner-tl"></div>
            <div className="cyber-modal-corner-br"></div>

            <div
              className="cyber-modal-header"
              style={{ borderBottomColor: selectedItem.color }}
            >
              <span
                className="header-text"
                style={{ color: selectedItem.color }}
              >
                // KONFIRMASI EKSTRAKSI 3D
              </span>
              <button
                className="close-modal-btn"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
            </div>

            <div className="cyber-modal-body">
              <div
                className="cyber-modal-visual"
                style={{ borderColor: selectedItem.color }}
              >
                <img src={selectedItem.image} alt={selectedItem.name} />
                <div
                  className="visual-scan-laser"
                  style={{
                    background: selectedItem.color,
                    boxShadow: `0 0 15px ${selectedItem.color}`,
                  }}
                ></div>
                <div className="visual-hud-overlay"></div>
              </div>

              <div className="cyber-modal-data">
                <div
                  className="data-tag"
                  style={{
                    background: `${selectedItem.color}22`,
                    color: selectedItem.color,
                  }}
                >
                  {selectedItem.category} // {selectedItem.subCategory}
                </div>
                <h2 className="data-title">{selectedItem.name}</h2>
                <div className="data-desc-box">
                  <p>
                    {selectedItem.description
                      ? selectedItem.description.key
                      : selectedItem.desc}
                  </p>
                </div>

                <div className="data-metrics">
                  <div className="metric-item">
                    <span className="metric-label">INTEGRITAS</span>
                    <span
                      className="metric-value"
                      style={{ color: selectedItem.color }}
                    >
                      100%
                    </span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">STATUS</span>
                    <span className="metric-value blink-text">STANDBY</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-modal-footer">
              <button
                className="cyber-btn cancel"
                onClick={() => setSelectedItem(null)}
              >
                BATALKAN
              </button>
              <button
                className="cyber-btn launch"
                style={{ "--btn-color": selectedItem.color }}
                onClick={handleProceed}
              >
                INISIASI RENDER 3D ⌬
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visual3DHub;
