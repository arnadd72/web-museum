import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./Visual3DHub.css";
import { encyclopediaData } from "../data/encyclopediaData";

const Visual3DHub = ({ userData }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(() => sessionStorage.getItem("visual3d_filter") || "ALL");
  const [searchQuery, setSearchQuery] = useState(() => sessionStorage.getItem("visual3d_search") || "");
  const [selectedItem, setSelectedItem] = useState(null);

  const [dbData, setDbData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA DARI DATABASE
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/encyclopedia")
      .then(res => res.json())
      .then(data => {
        setDbData(data);
        setIsLoading(false);
      })
      .catch(err => {
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
        sessionStorage.setItem("visual3d_scroll", container.scrollTop.toString());
      }
      
      navigate("/model-viewer", { 
        state: { 
          itemData: selectedItem,
          returnPath: "/visual-3d" 
        } 
      });
    }
  };

  return (
    <div className="hub-container">
      <div className="hub-grid-bg"></div>
      
      <nav className="hub-nav">
        <div className="nav-left-group">
          <Link to="/" className="hub-back-btn">
            ← KEMBALI KE BERANDA
          </Link>
          <div className="hub-status">
            <div className="status-dot"></div>
            SYSTEM ONLINE // VISUAL_DATABASE
          </div>
        </div>

        {userData?.rank && (
          <div className="nav-profile-stack gallery-profile">
            <div className="nav-rank-badge-modern">
              {userData.rank}
            </div>
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
        <div className="hub-header">
          <h1>PILIH SPESIMEN</h1>
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="KETIK NAMA SPESIES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>
          <div className="filter-bar">
            {["ALL", "BIO", "FOSSIL", "ERA"].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "BIO"
                  ? "MAKHLUK HIDUP"
                  : f === "ERA"
                  ? "ERA ZAMAN"
                  : f === "FOSSIL"
                  ? "JENIS FOSIL"
                  : "SEMUA DATA"}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="hub-grid">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="data-chip fade-in-up"
                onClick={() => setSelectedItem(item)}
                style={{
                  "--accent": item.color,
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <div className="chip-img-box">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="chip-overlay"></div>
                </div>
                <div className="chip-info">
                  <div className="chip-cat">{item.subCategory}</div>
                  <h3>{item.name}</h3>
                  <div className="chip-decor-line"></div>
                </div>
                <div className="corner-decor"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results fade-in-up">
            <h2>DATA TIDAK DITEMUKAN</h2>
            <button
              className="reset-search-btn"
              onClick={() => {
                setSearchQuery("");
                setFilter("ALL");
              }}
            >
              RESET PENCARIAN
            </button>
          </div>
        )}
      </main>

      {/* MODAL */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-box slide-up">
            <div
              className="modal-header"
              style={{ background: selectedItem.color }}
            >
              KONFIRMASI VISUALISASI 3D
            </div>
            <div className="modal-body">
              <div className="modal-img">
                <img src={selectedItem.image} alt={selectedItem.name} />
                <div
                  className="scan-anim"
                  style={{
                    boxShadow: `0 0 10px ${selectedItem.color}`,
                    background: selectedItem.color,
                  }}
                ></div>
              </div>
              <div className="modal-text">
                <h2>BUKA SIMULASI?</h2>
                <h4 style={{ color: selectedItem.color }}>
                  OBJEK: {selectedItem.name}
                </h4>
                <p>
                  {selectedItem.description
                    ? selectedItem.description.key
                    : selectedItem.desc}
                </p>
                <div className="modal-stats">
                  <span>Status: Siap</span>
                  <span>Tipe: Model Digital</span>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedItem(null)}
              >
                BATAL
              </button>
              <button
                className="launch-btn"
                style={{
                  border: `1px solid ${selectedItem.color}`,
                  color: selectedItem.color,
                }}
                onClick={handleProceed}
              >
                MULAI SIMULASI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visual3DHub;
