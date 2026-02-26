import React, { useState, useEffect, useRef } from "react";
import ReactionPage from "./ReactionPage";
import QuizPage from "./QuizPage";

// GROUP TO NEON COLOR
const groupColors = {
  "alkali-metal": "#f4b400",
  "alkaline-earth-metal": "#ffe082",
  "transition-metal": "#ff6f61",
  "post-transition-metal": "#b0bec5",
  metalloid: "#00ced1",
  nonmetal: "#66ccff",
  halogen: "#9acd32",
  "noble-gas": "#dda0dd",
  lanthanide: "#ffb347",
  actinide: "#ff69b4",
  all: "#ff6f61"
};

const groups = [
  { id: "all", label: "All" },
  { id: "alkali-metal", label: "Alkali Metals" },
  { id: "alkaline-earth-metal", label: "Alkaline Earth Metals" },
  { id: "transition-metal", label: "Transition Metals" },
  { id: "post-transition-metal", label: "Post-Transition Metals" },
  { id: "metalloid", label: "Metalloids" },
  { id: "nonmetal", label: "Nonmetals" },
  { id: "halogen", label: "Halogens" },
  { id: "noble-gas", label: "Noble Gases" },
  { id: "lanthanide", label: "Lanthanides" },
  { id: "actinide", label: "Actinides" }
];

function prettify(str) {
  return str ? str.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "";
}

const Homepage = () => {
  const [mode, setMode] = useState("home");
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("all");

  // Info box drag
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const infoBoxRef = useRef(null);

  // Detail box drag
  const [detailDragPos, setDetailDragPos] = useState({ x: 0, y: 0 });
  const [detailOffset, setDetailOffset] = useState({ x: 0, y: 0 });
  const [isDetailDragging, setIsDetailDragging] = useState(false);
  const detailBoxRef = useRef(null);

  const [searchText, setSearchText] = useState("");

  // Disable horizontal scroll globally
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  useEffect(() => {
    fetch("/elements.json")
      .then(res => res.json())
      .then(data => setElements(data))
      .catch(err => console.error("Error loading elements.json:", err));
  }, []);

  useEffect(() => {
    if (!detailsOpen || !selectedElement) {
      setSelectedDetails(null);
      return;
    }
    fetch("/PeriodicTableJSON.json")
      .then(res => res.json())
      .then(data => {
        if (!data.elements) return;
        const found = data.elements.find(
          el => el.number === selectedElement.atomicNumber
        );
        setSelectedDetails(found || null);
      })
      .catch(() => {
        setSelectedDetails(null);
      });
  }, [detailsOpen, selectedElement]);

  if (mode === "reaction") {
    return <ReactionPage goHome={() => setMode("home")} goQuiz={() => setMode("quiz")} />;
  }
  if (mode === "quiz") {
    return <QuizPage goHome={() => setMode("home")} goReaction={() => setMode("reaction")} />;
  }

  // Info box drag logic
  const startDrag = e => {
    e.preventDefault();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = infoBoxRef.current.getBoundingClientRect();
    setOffset({ x: cx - rect.left, y: cy - rect.top });
    setIsDragging(true);
  };
  const onDrag = e => {
    if (!isDragging) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    setDragPos({ x: cx - offset.x, y: cy - offset.y });
  };
  const endDrag = () => setIsDragging(false);

  // Detail box drag logic
  const startDetailDrag = e => {
    e.preventDefault();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = detailBoxRef.current.getBoundingClientRect();
    setDetailOffset({ x: cx - rect.left, y: cy - rect.top });
    setIsDetailDragging(true);
  };
  const onDetailDrag = e => {
    if (!isDetailDragging) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    setDetailDragPos({ x: cx - detailOffset.x, y: cy - detailOffset.y });
  };
  const endDetailDrag = () => setIsDetailDragging(false);

  // Filtered elements
  const filteredElements = elements.filter(el => {
    const search = searchText.trim().toLowerCase();
    if (!search) return (selectedGroup === "all" || el.group === selectedGroup);
    return (
      el.name?.toLowerCase().includes(search) ||
      el.symbol?.toLowerCase().includes(search) ||
      String(el.atomicNumber) === search ||
      el.group?.toLowerCase().includes(search)
    );
  });

  const selColor = selectedElement
    ? groupColors[selectedElement.group] || groupColors.all
    : groupColors[selectedGroup] || groupColors.all;

  const resetSearch = () => {
    setSearchText("");
    setSelectedGroup("all");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar"
        style={{
          borderBottom: `3px solid ${selColor}`,
          boxShadow: `0 0 12px ${selColor}77`,
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 18px",
          minHeight: "66px",
          background: "#111"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div
            className="nav-title neon-flicker"
            style={{
              color: "#FF3131",
              fontFamily: "'Geo',sans-serif",
              textShadow: `0 0 5px #FF3131, 0 0 10px #FF3131, 0 0 20px #FF3131, 0 0 40px #FF3131`,
              fontSize: "clamp(2em, 6vw, 2.7em)", // makes it big and responsive
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }}
          >🕷 Alchemist
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{
              border: "2px solid #FF3131",
              color: "#FF3131",
              background: "#000",
              padding: "8px 16px",
              borderRadius: "7px",
              fontSize: "1em",
              outline: "none",
              minWidth: "140px"
            }}
          />
          <button
            tabIndex={0}
            title="Reset"
            onClick={resetSearch}
            className="spider-btn"
            style={{
              border: "2px solid #FF3131",
              color: "#FF3131",
              background: "#000",
              padding: "6px 13px",
              borderRadius: "6px",
              fontSize: "1.18em",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🕷
          </button>
        </div>
        {/* Moved buttons left by extra negative margin for better placement */}
        <div style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginLeft: "-34px"    // Moves the buttons left, so they stay close on all widths
        }}>
          <button className="nav-btn" onClick={() => setMode("home")}>Home</button>
          <button className="nav-btn" onClick={() => setMode("reaction")}>Reaction</button>
          <button className="nav-btn" onClick={() => setMode("quiz")}>Quiz</button>
        </div>
      </nav>

      {/* GROUP FILTER */}
      <div className="filter-bar" style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        padding: "10px 0",
        background: "#18191a"
      }}>
        {groups.map(group => {
          const isActive = selectedGroup === group.id;
          const color = groupColors[group.id] || groupColors.all;
          return (
            <button
              key={group.id}
              className={`filter-btn${isActive ? " active" : ""}`}
              style={{
                border: `2px solid ${color}`,
                color: isActive ? "#18191a" : color,
                background: isActive ? color : "#18191a",
                boxShadow: isActive ? `0 0 16px ${color}` : "none",
                fontWeight: isActive ? "bold" : "normal",
                fontFamily: "'Geo',sans-serif",
                fontSize: "1em",
                padding: "8px 18px", // stays same
                borderRadius: "7px",
                letterSpacing: "0.7px",
                cursor: "pointer",
                transition: "background 0.17s, color 0.13s, box-shadow 0.17s, transform 0.14s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = color;
                e.currentTarget.style.color = "#111";
                e.currentTarget.style.transform = "scale(1.07)";
                e.currentTarget.style.boxShadow = `0 0 20px ${color}cc`;
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "#18191a";
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.boxShadow = "none";
                } else {
                  e.currentTarget.style.background = color;
                  e.currentTarget.style.color = "#18191a";
                  e.currentTarget.style.boxShadow = `0 0 16px ${color}`;
                }
                e.currentTarget.style.transform = "scale(1)";
              }}
              onTouchStart={e => {
                e.currentTarget.style.background = color;
                e.currentTarget.style.color = "#111";
                e.currentTarget.style.transform = "scale(0.97)";
                e.currentTarget.style.boxShadow = `0 0 20px ${color}cc`;
              }}
              onTouchEnd={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "#18191a";
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.boxShadow = "none";
                } else {
                  e.currentTarget.style.background = color;
                  e.currentTarget.style.color = "#18191a";
                  e.currentTarget.style.boxShadow = `0 0 16px ${color}`;
                }
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => setSelectedGroup(group.id)}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      {/* PERIODIC TABLE */}
      <div className="app-background">
        <div className="periodic-table">
          {filteredElements.map((el, i) => {
            const color = groupColors[el.group] || groupColors.all;
            return (
              <div
                key={i}
                className={`element-card ${el.group}`}
                style={{
                  gridColumn: el.col,
                  gridRow: el.row,
                  border: `2px solid ${color}`,
                  color,
                  fontSize: 20,
                  background: "#0e0f0f"
                }}
                onClick={() => {
                  setSelectedElement(el);
                  setDragPos({ x: 0, y: 0 });
                  setDetailsOpen(false);
                }}
              >
                {el.symbol}
              </div>
            );
          })}
        </div>
      </div>

      {/* INFO BOX */}
      {selectedElement && !detailsOpen && (
        <div
          className="info-overlay"
          onClick={() => setSelectedElement(null)}
          onMouseMove={onDrag}
          onTouchMove={onDrag}
          onMouseUp={endDrag}
          onTouchEnd={endDrag}
        >
          <div
            ref={infoBoxRef}
            className={`info-box mystic-pop`}
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute",
              top: dragPos.y || "50%",
              left: dragPos.x || "50%",
              transform: dragPos.x ? "none" : "translate(-50%,-50%)",
              borderColor: selColor,
              color: selColor
            }}
          >
            <div
              className="info-header"
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            >
              Info
              <button
                className="info-close-btn"
                onClick={() => setSelectedElement(null)}
                style={{ color: selColor }}
              >×</button>
            </div>
            <button
              style={{
                position: "absolute", top: 8, right: 35,
                background: selColor, border: "none", borderRadius: 4,
                color: "#000", fontWeight: "bold",
                padding: "2px 8px", cursor: "pointer"
              }}
              onClick={() => setDetailsOpen(true)}
            >
              Details
            </button>
            <h3>{selectedElement.name} ({selectedElement.symbol})</h3>
            <p>Atomic Number: {selectedElement.atomicNumber}</p>
            <p>Group: {prettify(selectedElement.group)}</p>
            <p>Name: {selectedElement.name}</p>
            <p>Symbol: {selectedElement.symbol}</p>
            <p>Mass: {selectedElement.mass}</p>
          </div>
        </div>
      )}

      {/* DETAIL BOX */}
      {selectedElement && detailsOpen && (
        <div
          className="info-overlay"
          onClick={() => { setDetailsOpen(false); setSelectedElement(null); setSelectedDetails(null); }}
          onMouseMove={onDetailDrag}
          onTouchMove={onDetailDrag}
          onMouseUp={endDetailDrag}
          onTouchEnd={endDetailDrag}
        >
          <div
            ref={detailBoxRef}
            className={`info-box mystic-pop`}
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute",
              top: detailDragPos.y || "50%",
              left: detailDragPos.x || "50%",
              transform: detailDragPos.x ? "none" : "translate(-50%,-50%)",
              borderColor: selColor,
              color: selColor,
              width: "600px", height: "400px", overflowY: "auto"
            }}
          >
            <div className="info-header"
              onMouseDown={startDetailDrag}
              onTouchStart={startDetailDrag}
            >
              Details
              <button
                className="info-close-btn"
                onClick={() => { setDetailsOpen(false); setSelectedElement(null); setSelectedDetails(null); }}
                style={{ color: selColor }}
              >×</button>
            </div>
            {selectedDetails ? (
              <>
                <h3>{selectedDetails.name} ({selectedDetails.symbol})</h3>
                <p>Atomic Number: {selectedDetails.number}</p>
                <p>Atomic Mass: {selectedDetails.atomic_mass || "N/A"}</p>
                <p>Group: {prettify(selectedDetails.category || "")}</p>
                <p>Period: {selectedDetails.period || "-"}</p>
                <p>Phase: {selectedDetails.phase || "-"}</p>
                <p>Density: {selectedDetails.density || "N/A"}</p>
                <p>Boiling Point: {selectedDetails.boil || "N/A"}</p>
                <p>Melting Point: {selectedDetails.melt || "N/A"}</p>
                <p>Molar Heat: {selectedDetails.molar_heat || "N/A"}</p>
                <p>Discovered By: {selectedDetails.discovered_by || "N/A"}</p>
                <p>Electronegativity: {selectedDetails.electronegativity_pauling || "N/A"}</p>
                <p>Electron Affinity: {selectedDetails.electron_affinity || "N/A"}</p>
                <p>Summary: {selectedDetails.summary || "N/A"}</p>
                <p>Source: <a href={selectedDetails.source} target="_blank" rel="noreferrer">{selectedDetails.source}</a></p>
              </>
            ) : (
              <p>Loading details...</p>
            )}
          </div>
        </div>
      )}

      <style>{`
        body { overflow-x: hidden !important; }
        .nav-btn {
          background: #000; color: #FF3131; border: 2px solid #FF3131;
          padding: 10px 22px; border-radius: 7px; cursor: pointer;
          font-family: 'Geo',sans-serif; font-size:1em; font-weight: 500;
          transition: background 0.16s, color 0.12s, box-shadow 0.13s, transform 0.13s;
        }
        .nav-btn:hover,
        .nav-btn:focus {
          background: #FF3131; color: #18191a;
          box-shadow: 0 0 14px #FF3131cc;
          transform: scale(1.08);
        }
        .spider-btn:hover,
        .spider-btn:active {
          background: #FF3131; color: #111; box-shadow: 0 0 12px #FF3131cc; transform: scale(1.09);
        }
        .neon-flicker {
          animation: flicker 1.5s infinite alternate;
        }
        @keyframes flicker {
          0%, 19%, 22%, 62%, 64%, 100% {
            opacity: 1;
            text-shadow: 0 0 5px #FF3131, 0 0 10px #FF3131, 0 0 20px #FF3131, 0 0 40px #FF3131;
          }
          20%, 21%, 63% {
            opacity: 0.6;
            text-shadow: none;
          }
        }
        @media (max-width: 650px) {
          .navbar { flex-direction: column; align-items: flex-start; min-height: 58px; }
          .nav-right { width: 100%; justify-content: space-around; margin-top:8px; }
          .nav-title { font-size: clamp(1.15em, 4vw, 2em); }
          .filter-bar { gap: 6px; padding: 7px 0; }
          .nav-btn { padding: 8px 12px; font-size: 0.97em; }
        }
        @media (max-width:480px){
          .filter-bar{gap:2px;}
          .nav-title{font-size:1em;}
        }
      `}</style>
    </>
  );
};

export default Homepage;