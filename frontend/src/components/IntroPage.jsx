import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./IntroPage.css"; // Kita buat CSS-nya di langkah 2

const IntroPage = () => {
  const navigate = useNavigate();
  const [textVisible, setTextVisible] = useState(false);

  // Efek animasi teks muncul perlahan
  useEffect(() => {
    setTimeout(() => setTextVisible(true), 300);
  }, []);

  return (
    <div className="intro-container">
      <div className="intro-bg"></div>

      <div className={`intro-content ${textVisible ? "fade-in" : ""}`}>
        <div className="intro-logo">PURBATECH</div>

        <h1 className="intro-title">
          SELAMAT DATANG DI
          <br />
          ARSIP PRASEJARAH
        </h1>

        <div className="intro-text-box">
          <p>
            Anda akan memasuki gerbang waktu yang menyimpan rekaman kehidupan
            bumi jutaan tahun lalu. Jelajahi makhluk prasejarah, fosil langka,
            dan evolusi planet melalui <strong>teknologi 3D interaktif</strong>{" "}
            dan <strong>visualisasi canggih</strong> sebagai edukasi menarik.
          </p>
          <p>Bersiaplah untuk menghidupkan kembali masa lalu.</p>
        </div>

        <button
          className="explore-btn"
          onClick={() => navigate("/gallery")} // Masuk ke GalleryMain sesuai permintaan
        >
          MENUJU GALERI SPESIMEN ➔
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
