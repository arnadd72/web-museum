import {
  Center,
  Float,
  Html,
  OrbitControls,
  Resize,
  Sparkles,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { encyclopediaData } from "../data/encyclopediaData";
import "./ModelViewer.css";

// --- ERROR BOUNDARY ---
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Gagal memuat model:", error);
  }
  render() {
    if (this.state.hasError) {
      return <PlaceholderModel color={this.props.color} />;
    }
    return this.props.children;
  }
}

// --- PLACEHOLDER ---
const PlaceholderModel = ({ color }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.5;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color || "#00ff88"}
          wireframe={true}
          transparent
          opacity={0.8}
          emissive={color || "#00ff88"}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

// --- MODEL LOADER ---
const Model3D = ({ path }) => {
  const { scene } = useGLTF(path);
  const clonedScene = useMemo(() => scene.clone(), [scene, path]);
  return <primitive object={clonedScene} />;
};

const Loader = () => (
  <Html center>
    <div className="loader-text-hud">
      <div className="spinner"></div>
      <span>MEMUAT 3D MESH...</span>
    </div>
  </Html>
);

// --- MAIN COMPONENT ---
const ModelViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // === 1. AMBIL DATA ===
  const { itemData, returnContext, returnPath } = location.state || {};

  const [activeItem, setActiveItem] = useState(itemData);
  const [siblingItems, setSiblingItems] = useState([]);
  const [activeTab, setActiveTab] = useState("ANATOMY");

  // === 2. SIBLING ITEMS UNTUK CAROUSEL BAWAH ===
  useEffect(() => {
    if (
      returnContext &&
      returnContext.targetCategory &&
      returnContext.targetSubCategory
    ) {
      const cat = encyclopediaData[returnContext.targetCategory];
      if (cat) {
        const sub = cat.subCategories.find(
          (s) => s.title === returnContext.targetSubCategory,
        );
        if (sub && sub.items) {
          setSiblingItems(sub.items);
        }
      }
    } else if (itemData) {
      setSiblingItems([itemData]);
    }
  }, [returnContext, itemData]);

  // === 3. LOGIC NAVIGASI ===
  const handleBack = () => {
    if (returnPath) {
      navigate(returnPath);
      return;
    }
    if (returnContext) {
      navigate("/gallery", { state: { ...returnContext } });
      return;
    }
    navigate("/gallery");
  };

  // === 4. EXTENDED DATA LOGIC ===
  const extendedData = useMemo(() => {
    if (!activeItem) return null;
    const dbDesc = activeItem.description || {};
    const customInfo = activeItem.details || {};

    return {
      scientificName:
        customInfo.scientificName ||
        activeItem.name.charAt(0) +
          activeItem.name.slice(1).toLowerCase() +
          " sp.",
      category: activeItem.category || "Unknown Class",
      taxonomy: customInfo.taxonomy || "Kingdom Animalia",
      location: customInfo.location || "Global",
      status: activeItem.status || "PUNAH",
      diet: customInfo.diet || "Tidak Diketahui",
      size: customInfo.size || "Bervariasi",
      weight: customInfo.weight || "Tidak Diketahui",
      lifespan: customInfo.lifespan || "Tidak Diketahui",
      period:
        activeItem.period ||
        customInfo.period ||
        activeItem.era ||
        "Prasejarah",
      funFact:
        dbDesc.key ||
        "Spesies ini memiliki peran penting dalam rantai makanan purba.",
      discoveryYear: customInfo.discoveryYear || "Abad ke-19",
      stats: customInfo.stats || { completeness: 85, rarity: 70, value: 90 },
      desc: activeItem.description
        ? activeItem.description.full || activeItem.description.short
        : activeItem.desc,
    };
  }, [activeItem]);

  const { cameraPosition, maxZoomDistance, modelScale } = useMemo(() => {
    if (!activeItem)
      return { cameraPosition: [0, 2, 8], maxZoomDistance: 15, modelScale: 3 };
    const name = activeItem.name.toUpperCase();
    if (name.includes("BRACHIOSAURUS") || name.includes("SAUROPOD"))
      return {
        cameraPosition: [0, 4, 18],
        maxZoomDistance: 40,
        modelScale: 1.5,
      };
    if (name.includes("REX") || name.includes("SPINOSAURUS"))
      return {
        cameraPosition: [0, 2, 12],
        maxZoomDistance: 25,
        modelScale: 2.2,
      };
    return { cameraPosition: [0, 1, 8], maxZoomDistance: 15, modelScale: 3 };
  }, [activeItem]);

  if (!activeItem) {
    return (
      <div className="viewer-error">
        <h1>AKSES DITOLAK</h1>
        <button onClick={() => navigate("/gallery")}>KEMBALI KE GALERI</button>
      </div>
    );
  }

  const themeColor = activeItem.accentColor || activeItem.color || "#00d2ff";

  return (
    <div className="hud-viewer-container">
      {/* === 1. 3D CANVAS FULLSCREEN === */}
      <div className="hud-canvas-wrapper">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: cameraPosition, fov: 45 }}
        >
          <fog attach="fog" args={["#030508", 5, 45]} />
          <Sparkles
            count={100}
            scale={15}
            size={2}
            speed={0.2}
            color={themeColor}
            opacity={0.3}
          />
          <ambientLight intensity={1.2} color="#ffffff" />
          <directionalLight
            position={[10, 10, 5]}
            intensity={2.5}
            color="#ffffff"
            castShadow
          />
          <directionalLight
            position={[-10, -5, -10]}
            intensity={1}
            color={themeColor}
          />

          <Suspense fallback={<Loader />}>
            <Float
              speed={1.5}
              rotationIntensity={0.1}
              floatIntensity={0.2}
              position={[0, -0.5, 0]}
            >
              <group scale={1.2}>
                <ModelErrorBoundary color={themeColor}>
                  <Center top>
                    <Resize scale={modelScale}>
                      <Model3D
                        key={activeItem.modelPath}
                        path={activeItem.modelPath}
                      />
                    </Resize>
                  </Center>
                </ModelErrorBoundary>
              </group>
            </Float>
          </Suspense>
          <OrbitControls
            autoRotate
            autoRotateSpeed={1}
            makeDefault
            minDistance={2}
            maxDistance={maxZoomDistance}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      {/* === 2. TOP NAVBAR === */}
      <header className="hud-top-nav">
        <button onClick={handleBack} className="btn-hud-back">
          <span className="arr">←</span> TERMINATE LINK
        </button>
        <div className="hud-nav-status">
          <div className="blink-dot"></div>
          <span>LIVE TELEMETRY // 3D RENDER</span>
        </div>
      </header>

      {/* === 3. LEFT PANEL (IDENTITAS & TAKSONOMI) === */}
      <motion.aside
        key={`left-${activeItem.name}`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hud-panel left-panel"
      >
        <div className="panel-corner tl"></div>
        <div className="panel-corner tr"></div>
        <div className="panel-corner bl"></div>
        <div className="panel-corner br"></div>

        <div className="hud-tag">
          ID SPESIMEN: 00{activeItem.id || Math.floor(Math.random() * 99)}
        </div>
        <h1 className="hud-main-title" style={{ color: themeColor }}>
          {activeItem.name}
        </h1>
        <h3 className="hud-sub-title">{extendedData.scientificName}</h3>

        <div className="hud-divider"></div>

        <div className="hud-data-list">
          <div className="hud-data-row">
            <span className="lbl">KLASIFIKASI</span>
            <span className="val">{extendedData.category}</span>
          </div>
          <div className="hud-data-row">
            <span className="lbl">TAKSONOMI</span>
            <span className="val">{extendedData.taxonomy}</span>
          </div>
          <div className="hud-data-row">
            <span className="lbl">LOKASI DATA</span>
            <span className="val">{extendedData.location}</span>
          </div>
          <div className="hud-data-row">
            <span className="lbl">ERA GEOLOGI</span>
            <span className="val">{extendedData.period}</span>
          </div>
          <div className="hud-data-row mt-3">
            <span className="lbl">STATUS</span>
            <span
              className="val status-glow"
              style={{
                color:
                  extendedData.status === "MASIH HIDUP" ? "#00ff88" : "#ff4d4d",
                textShadow:
                  extendedData.status === "MASIH HIDUP"
                    ? "0 0 10px #00ff88"
                    : "0 0 10px #ff4d4d",
              }}
            >
              [{extendedData.status}]
            </span>
          </div>
        </div>

        <div className="hud-desc-box">
          <p>{extendedData.desc}</p>
        </div>
      </motion.aside>

      {/* === 4. RIGHT PANEL (ANATOMI, METRIK, WAWASAN) === */}
      <motion.aside
        key={`right-${activeItem.name}`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hud-panel right-panel"
      >
        <div className="panel-corner tl"></div>
        <div className="panel-corner tr"></div>
        <div className="panel-corner bl"></div>
        <div className="panel-corner br"></div>

        <div className="hud-tabs">
          <button
            className={activeTab === "ANATOMY" ? "active" : ""}
            onClick={() => setActiveTab("ANATOMY")}
            style={{
              color: activeTab === "ANATOMY" ? themeColor : "#888",
              borderBottomColor:
                activeTab === "ANATOMY" ? themeColor : "transparent",
            }}
          >
            ANATOMI
          </button>
          <button
            className={activeTab === "METRICS" ? "active" : ""}
            onClick={() => setActiveTab("METRICS")}
            style={{
              color: activeTab === "METRICS" ? themeColor : "#888",
              borderBottomColor:
                activeTab === "METRICS" ? themeColor : "transparent",
            }}
          >
            METRIK
          </button>
          <button
            className={activeTab === "LORE" ? "active" : ""}
            onClick={() => setActiveTab("LORE")}
            style={{
              color: activeTab === "LORE" ? themeColor : "#888",
              borderBottomColor:
                activeTab === "LORE" ? themeColor : "transparent",
            }}
          >
            WAWASAN
          </button>
        </div>

        <div className="hud-tab-content">
          <AnimatePresence mode="wait">
            {activeTab === "ANATOMY" && (
              <motion.div
                key="t1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hud-data-list"
              >
                <div className="hud-data-row">
                  <span className="lbl">DIET</span>
                  <span className="val">{extendedData.diet}</span>
                </div>
                <div className="hud-data-row">
                  <span className="lbl">ESTIMASI UMUR</span>
                  <span className="val">{extendedData.lifespan}</span>
                </div>
                <div className="hud-data-row">
                  <span className="lbl">UKURAN</span>
                  <span className="val">{extendedData.size}</span>
                </div>
                <div className="hud-data-row">
                  <span className="lbl">BERAT</span>
                  <span className="val">{extendedData.weight}</span>
                </div>
                <div
                  className="hud-wireframe-decor"
                  style={{ borderColor: themeColor }}
                >
                  <div className="wf-line"></div>
                  <div className="wf-line"></div>
                  <div className="wf-line"></div>
                </div>
              </motion.div>
            )}

            {activeTab === "METRICS" && (
              <motion.div
                key="t2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hud-metrics-container"
              >
                <div className="hud-tag mb-2" style={{ color: themeColor }}>
                  KUALITAS SPESIMEN 3D
                </div>
                {[
                  {
                    label: "KEUTUHAN FOSIL",
                    val: extendedData.stats.completeness,
                  },
                  {
                    label: "TINGKAT KELANGKAAN",
                    val: extendedData.stats.rarity,
                  },
                  { label: "NILAI EDUKASI", val: extendedData.stats.value },
                ].map((stat, i) => (
                  <div className="metric-bar-group" key={i}>
                    <div className="metric-info">
                      <span>{stat.label}</span>
                      <span>{stat.val}%</span>
                    </div>
                    <div className="metric-track">
                      <div
                        className="metric-fill"
                        style={{
                          width: `${stat.val}%`,
                          backgroundColor: themeColor,
                          boxShadow: `0 0 10px ${themeColor}`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "LORE" && (
              <motion.div
                key="t3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="hud-data-row mb-3">
                  <span className="lbl">TAHUN PENEMUAN</span>
                  <span className="val">{extendedData.discoveryYear}</span>
                </div>
                <div
                  className="hud-lore-box"
                  style={{ borderLeftColor: themeColor }}
                >
                  <div className="lore-title">CATATAN PALEONTOLOGI</div>
                  <p>"{extendedData.funFact}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* === 5. BOTTOM CAROUSEL (SIBLING THUMBNAILS) === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hud-bottom-carousel"
      >
        <div className="carousel-track">
          {siblingItems.map((item, idx) => (
            <div
              key={idx}
              className={`carousel-thumb ${item.name === activeItem.name ? "active" : ""}`}
              onClick={() => setActiveItem(item)}
              style={{ "--accent": themeColor }}
            >
              <img src={item.image} alt={item.name} />
              <div className="thumb-overlay"></div>
              <span className="thumb-name">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ModelViewer;
