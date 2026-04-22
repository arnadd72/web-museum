import {
  Center,
  ContactShadows,
  Environment,
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
const ModelViewer = ({ userData }) => {
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
      encyclopediaData[returnContext.targetCategory]
    ) {
      const sub = encyclopediaData[
        returnContext.targetCategory
      ].subCategories.find((s) => s.title === returnContext.targetSubCategory);
      if (sub) setSiblingItems(sub.items);
    }
  }, [returnContext]);

  const handleBack = () => {
    if (returnPath) {
      navigate(returnPath);
    } else if (returnContext) {
      navigate("/gallery", { state: returnContext });
    } else {
      navigate("/gallery");
    }
  };

  const extendedData = useMemo(() => {
    if (!activeItem) return {};
    const dbDesc = activeItem.description || {};
    const customInfo = activeItem.customInfo || {};

    return {
      scientificName:
        activeItem.scientificName ||
        customInfo.scientificName ||
        "Specimen Unknown",
      category: activeItem.category || customInfo.category || "Unclassified",
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
          camera={{ position: cameraPosition, fov: 45 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
          <color attach="background" args={["#030508"]} />
          <fog attach="fog" args={["#030508", 5, 25]} />

          <Suspense fallback={<Loader />}>
            <Environment files="/textures/lighting.hdr" />
            <ambientLight intensity={0.5} />
            <spotLight
              position={[10, 15, 10]}
              angle={0.3}
              penumbra={1}
              intensity={2}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={1} />

            <Resize>
              <Center top>
                <ModelErrorBoundary color={themeColor}>
                  <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Model3D path={activeItem.model} />
                  </Float>
                </ModelErrorBoundary>
              </Center>
            </Resize>

            <Sparkles
              count={60}
              scale={10}
              size={1.5}
              speed={0.4}
              opacity={0.2}
              color={themeColor}
            />
            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.6}
              scale={20}
              blur={2}
              far={10}
              color="#000000"
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
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
        <div className="nav-left-group">
          <button onClick={handleBack} className="btn-hud-back">
            <span className="arr">←</span> TERMINATE LINK
          </button>
          <div className="hud-nav-status">
            <div className="blink-dot"></div>
            <span>LIVE TELEMETRY // 3D RENDER</span>
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
            <span className="val">{extendedData.scientificName}</span>
          </div>
          <div className="hud-data-row">
            <span className="lbl">PERIODE</span>
            <span className="val">{extendedData.period}</span>
          </div>
          <div className="hud-data-row">
            <span className="lbl">STATUS</span>
            <span
              className="val status-glow"
              style={{
                color:
                  activeItem.status === "MASIH HIDUP"
                    ? "var(--neon-green)"
                    : "var(--neon-red)",
              }}
            >
              {activeItem.status || "PUNAH"}
            </span>
          </div>
        </div>

        <div className="hud-desc-box mt-3">
          <p>{extendedData.desc}</p>
        </div>
      </motion.aside>

      {/* === 4. RIGHT PANEL (METRIK & ANALISIS) === */}
      <motion.aside
        key={`right-${activeItem.name}`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
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
              color: activeTab === "ANATOMY" ? themeColor : "#666",
              borderColor: activeTab === "ANATOMY" ? themeColor : "transparent",
            }}
          >
            BIOMETRIK
          </button>
          <button
            className={activeTab === "LORE" ? "active" : ""}
            onClick={() => setActiveTab("LORE")}
            style={{
              color: activeTab === "LORE" ? themeColor : "#666",
              borderColor: activeTab === "LORE" ? themeColor : "transparent",
            }}
          >
            WAWASAN
          </button>
        </div>

        <div className="hud-tab-content">
          <AnimatePresence mode="wait">
            {activeTab === "ANATOMY" ? (
              <motion.div
                key="anatomy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="hud-metrics-container"
              >
                <div className="metric-bar-group">
                  <div className="metric-info">
                    <span>STRUKTUR TULANG</span>
                    <span>{extendedData.stats.completeness}%</span>
                  </div>
                  <div className="metric-track">
                    <div
                      className="metric-fill"
                      style={{
                        width: `${extendedData.stats.completeness}%`,
                        backgroundColor: themeColor,
                        boxShadow: `0 0 10px ${themeColor}`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="metric-bar-group">
                  <div className="metric-info">
                    <span>KELANGKAAN SPESIMEN</span>
                    <span>{extendedData.stats.rarity}%</span>
                  </div>
                  <div className="metric-track">
                    <div
                      className="metric-fill"
                      style={{
                        width: `${extendedData.stats.rarity}%`,
                        backgroundColor: themeColor,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="metric-bar-group">
                  <div className="metric-info">
                    <span>AKURASI DATA</span>
                    <span>{extendedData.stats.value}%</span>
                  </div>
                  <div className="metric-track">
                    <div
                      className="metric-fill"
                      style={{
                        width: `${extendedData.stats.value}%`,
                        backgroundColor: themeColor,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="hud-wireframe-decor">
                  <div className="wf-line" style={{ color: themeColor }}></div>
                  <div className="wf-line" style={{ color: themeColor }}></div>
                  <div className="wf-line" style={{ color: themeColor }}></div>
                  <div className="wf-line" style={{ color: themeColor }}></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lore"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="hud-lore-box"
                style={{ borderColor: themeColor }}
              >
                <div className="lore-title">CATATAN PALEONTOLOGI</div>
                <p>{extendedData.funFact}</p>
                <div className="hud-desc-box mt-3">
                  <span className="lbl" style={{ fontSize: "0.7rem" }}>
                    DITEMUKAN SEKITAR:
                  </span>
                  <div className="val">{extendedData.discoveryYear}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* === 5. BOTTOM CAROUSEL (SIBLING ITEMS) === */}
      {siblingItems.length > 0 && (
        <div className="hud-bottom-carousel">
          <div className="carousel-track">
            {siblingItems.map((sibling, idx) => (
              <div
                key={idx}
                className={`carousel-thumb ${
                  activeItem.name === sibling.name ? "active" : ""
                }`}
                style={{ "--accent": themeColor }}
                onClick={() => setActiveItem(sibling)}
              >
                <img src={sibling.image} alt={sibling.name} />
                <div className="thumb-overlay"></div>
                <div className="thumb-name">{sibling.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- CENTER RETICLE DECOR --- */}
      <div className="hud-center-reticle" style={{ color: themeColor }}>
        <div className="reticle-line h"></div>
        <div className="reticle-line v"></div>
        <div className="reticle-circle" style={{ borderColor: themeColor }}></div>
      </div>
    </div>
  );
};

export default ModelViewer;
