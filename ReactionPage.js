import React, { useEffect, useState } from "react";

const cardColors = [
  "#f4b400", "#ff6f61", "#00ced1", "#66ccff",
  "#9acd32", "#dda0dd", "#ffb347", "#ff69b4"
];

const GIF_DURATION_MS = 3200;

const prettify = (key) =>
  key.replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, l => l.toUpperCase());

const formatValue = (val) => {
  if (Array.isArray(val)) return val.length ? val.join(", ") : null;
  if (typeof val === "object" && val !== null)
    return Object.entries(val)
      .map(([k, v]) => {
        const fv = formatValue(v);
        return fv ? `${prettify(k)}: ${fv}` : null;
      })
      .filter(Boolean)
      .join("; ");
  return val != null ? val.toString() : null;
};

const renderDetails = (obj, color) =>
  Object.entries(obj)
    .filter(([key, val]) => {
      if (val === null || val === undefined || val === "" ||
          (Array.isArray(val) && val.length === 0)) return false;
      if (key === "conditions" && typeof val === "object" && !Array.isArray(val)) return false;
      if (typeof val === "object" && !Array.isArray(val)) return false;
      return true;
    })
    .map(([key, val]) => (
      <div key={key} className="para-animate" style={{ marginBottom: 6, color }}>
        <strong>{prettify(key)}:</strong> <span style={{ color: "#fff" }}>{formatValue(val)}</span>
      </div>
    ));

// --- NEW: Card shuffle + mystic pop animation CSS ---
const injectShufflePopCSS = () => {
  if (document.getElementById("card-shuffle-css")) return;
  const style = document.createElement("style");
  style.id = "card-shuffle-css";
  style.textContent = `
    .card-shuffle-pop {
      opacity: 0;
      transform: translate(var(--x,0), var(--y,0)) scale(0.6) rotate(var(--rot,-18deg));
      filter: blur(5px);
      animation: shufflePop 0.68s cubic-bezier(.6,.1,.8,1.5) forwards;
    }
    @keyframes shufflePop {
      0% {
        opacity: 0;
        transform: translate(var(--x,0), var(--y,0)) scale(0.6) rotate(var(--rot,-18deg));
        filter: blur(5px);
      }
      60% {
        opacity: 1;
        transform: translate(0,0) scale(1.09) rotate(3deg);
        filter: blur(0px);
      }
      100% {
        opacity: 1;
        transform: translate(0,0) scale(1) rotate(0deg);
        filter: blur(0px);
      }
    }
  `;
  document.head.appendChild(style);
};
// --- END CSS ---

const DraggableCard = ({
  children, color, initial, title, onClose, animIndex = 0
}) => {
  const cardWidth = 340;
  const cardHeight = 300;
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // For shuffle-pop animation
  useEffect(() => { injectShufflePopCSS(); }, []);

  // offsets for 4 cards: shuffled/scattered
  const shuffleOffsets = [
    { x: "-110px", y: "-60px", rot: "-16deg" },
    { x: "90px", y: "-80px", rot: "18deg" },
    { x: "-90px", y: "88px", rot: "14deg" },
    { x: "100px", y: "74px", rot: "-10deg" },
  ];

  const animStyle = {
    '--x': shuffleOffsets[animIndex]?.x || "0px",
    '--y': shuffleOffsets[animIndex]?.y || "0px",
    '--rot': shuffleOffsets[animIndex]?.rot || "0deg",
    animationDelay: `${animIndex * 0.13}s`
  };

  const cardBg = "url('/a4.gif')";

  const startDrag = (e) => {
    e.stopPropagation();
    const pageX = e.pageX || (e.touches?.[0]?.pageX);
    const pageY = e.pageY || (e.touches?.[0]?.pageY);
    setOffset({ x: pageX - pos.x, y: pageY - pos.y });
    setDragging(true);
  };

  const duringDrag = (e) => {
    if (!dragging) return;
    const pageX = e.pageX || (e.touches?.[0]?.pageX);
    const pageY = e.pageY || (e.touches?.[0]?.pageY);
    let newX = pageX - offset.x;
    let newY = pageY - offset.y;

    const vw = window.innerWidth + window.scrollX;
    const vh = window.innerHeight + window.scrollY;
    newX = Math.max(window.scrollX, Math.min(newX, vw - cardWidth));
    newY = Math.max(window.scrollY, Math.min(newY, vh - cardHeight));
    setPos({ x: newX, y: newY });
  };

  const stopDrag = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", duringDrag);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", duringDrag, { passive: false });
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", duringDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", duringDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  });

  return (
    <div
      className="card-shuffle-pop"
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        minWidth: "260px",
        maxWidth: `${cardWidth}px`,
        background: "rgba(0,0,0,0.87)",
        backgroundImage: cardBg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        border: `2px solid ${color}`,
        color,
        borderRadius: "8px",
        boxShadow: `0 0 16px ${color}77`,
        padding: "10px",
        fontFamily: "'Geo', sans-serif",
        cursor: dragging ? "grabbing" : "default",
        zIndex: 1002,
        ...animStyle
      }}
    >
      <div
        style={{
          display: "flex", justifyContent: "space-between", marginBottom: "8px",
          cursor: "grab", fontWeight: "bold", fontSize: "1.05em"
        }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        {title}
        <button
          onClick={onClose}
          style={{
            background: "transparent", border: "none", color: "#fff",
            fontSize: "1.2em", cursor: "pointer"
          }}
        >×</button>
      </div>
      <div style={{
        color: "#fff",
        fontSize: "0.95em",
        maxHeight: `${cardHeight - 60}px`,
        overflowY: "auto",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "6px",
        padding: "6px"
      }}>
        {children}
      </div>
    </div>
  );
};


const ReactionPage = ({ goHome, goQuiz }) => {
  const [allReactions, setAllReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGif, setShowGif] = useState(true);

  const [reactant1, setReactant1] = useState("");
  const [reactant2, setReactant2] = useState("");
  const [filteredReactions, setFilteredReactions] = useState([]);

  const [selectedReaction, setSelectedReaction] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#48cbd7");
  const [clickPos, setClickPos] = useState({ x: 100, y: 100 });
  const [showReactionForm, setShowReactionForm] = useState(false);
  const [selColor] = useState("#48cbd7");

  const cardWidth = 340;
  const cardGap = 20;

  useEffect(() => {
    fetch("/reactions.json")
      .then(res => res.json())
      .then(data => {
        setAllReactions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowGif(false), GIF_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const normalize = s => s.toLowerCase().trim();

  const handleSearch = e => {
    e.preventDefault();
    if (!reactant1 && !reactant2) return setFilteredReactions([]);
    const r1 = normalize(reactant1);
    const r2 = normalize(reactant2);
    const matches = allReactions.filter(reaction => {
      const precursors = reaction.precursors || [];
      const precursorStrs = precursors.flatMap(p => [
        p.material_string?.toLowerCase() || "",
        p.material_formula?.toLowerCase() || ""
      ]);
      const matchR1 = r1 && precursorStrs.some(s => s.includes(r1));
      const matchR2 = r2 && precursorStrs.some(s => s.includes(r2));
      return r1 && r2 ? matchR1 && matchR2 : matchR1 || matchR2;
    });
    setFilteredReactions(matches);
    setShowReactionForm(false);
  };

  const handleClear = () => {
    setReactant1("");
    setReactant2("");
    setFilteredReactions([]);
  };

  const reactionsToShow =
    filteredReactions.length > 0 ? filteredReactions : allReactions.slice(0, 100);

  // Inject flicker animation CSS once
  useEffect(() => {
    if (!document.getElementById("flicker-style")) {
      const styleTag = document.createElement("style");
      styleTag.id = "flicker-style";
      styleTag.innerHTML = `
        .neon-flicker {
          animation: flicker 2s infinite alternate;
          user-select: none;
        }
        @keyframes flicker {
          0%, 19%, 21%, 64%, 66%, 100% {
            opacity: 1;
            text-shadow: 0 0 4px #48cbd7, 0 0 11px #48cbd7, 0 0 19px #48cbd7, 0 0 40px #48cbd7;
          }
          20%, 65% {
            opacity: 0.6;
            text-shadow: none;
          }
        }
        .nav-btn {
          background: transparent;
          border: 2px solid #48cbd7;
          padding: 6px 14px;
          color: #48cbd7;
          border-radius: 4px;
          font-family: 'Geo', sans-serif;
          cursor: pointer;
          font-size: 1em;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background: #48cbd7;
          color: #000;
          box-shadow: 0 0 10px #48cbd7, 0 0 20px #48cbd7;
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div style={{
      backgroundColor: showGif ? "#000" : "#111",
      minHeight: "100vh",
      overflowY: "auto"
    }}>
      {/* Navbar always visible */}
      <nav
        className="navbar"
        style={{
          height: "70px",
          lineHeight: "70px",
          borderBottom: `3px solid ${selColor}`,
          boxShadow: `0 0 12px ${selColor}77`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor: "#111",
          position: "sticky",
          top: 0,
          zIndex: 3001
        }}
      >
        <div className="nav-left">
          <div
            className="nav-title neon-flicker"
            style={{
              color: "#48cbd7",
              fontFamily: "'Geo', sans-serif",
              fontSize: "1.5em",
              fontWeight: "bold",
              textShadow: `0 0 15px #48cbd7, 0 0 30px #48cbd7, 0 0 45px #48cbd7`
            }}
          >
            🕷 Alchemist
          </div>
        </div>
        <div className="nav-right" style={{ display: "flex", gap: "10px" }}>
          <button className="nav-btn" onClick={() => goHome?.()}>Home</button>
          <button className="nav-btn">Reaction</button>
          <button className="nav-btn" onClick={() => setShowReactionForm(f => !f)}>Reaction Form</button>
          <button className="nav-btn" onClick={() => goQuiz?.()}>Quiz</button>
        </div>
      </nav>

      {showGif ? (
        <div style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3000,
          background: "#000"
        }}>
          <img src="/a1.gif" alt="Loading..." style={{ display: "block", background: "#000" }}/>
        </div>
      ) : (
        <>
          {/* REACTION FORM */}
          {showReactionForm && (
            <form onSubmit={handleSearch} style={{
              display: "flex", gap: "10px",
              padding: "15px 20px",
              background: "#222",
              alignItems: "center",
              boxShadow: `0 0 10px #48cbd722`,
              borderRadius: "5px",
              margin: "20px 18px 0 18px"
            }}>
              <input
                type="text"
                placeholder="Reactant 1"
                value={reactant1}
                onChange={e => setReactant1(e.target.value)}
                style={{ padding: "8px", flex: 1, borderRadius: "4px", border: "1px solid #48cbd7", background: "#111", color: "#fff" }}
              />
              <input
                type="text"
                placeholder="Reactant 2"
                value={reactant2}
                onChange={e => setReactant2(e.target.value)}
                style={{ padding: "8px", flex: 1, borderRadius: "4px", border: "1px solid #48cbd7", background: "#111", color: "#fff" }}
              />
              <button type="submit" className="nav-btn" style={{ padding: "8px 12px" }}>Search</button>
              <button type="button" className="nav-btn" style={{ background: "#ff6f61", color: "#fff", border: "none", padding: "8px 12px" }} onClick={handleClear}>Clear</button>
            </form>
          )}

          {/* Reaction Cards */}
          <div style={{ padding: "20px" }}>
            {!loading && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px"
              }}>
                {reactionsToShow.map((rct, idx) => {
                  const color = cardColors[idx % cardColors.length];
                  return (
                    <div
                      key={idx}
                      style={{
                        border: `2px solid ${color}`,
                        borderRadius: "8px",
                        padding: "14px",
                        background: "rgba(0,0,0,0.87)",
                        color,
                        fontFamily: "'Tilt Neon', monospace",
                        boxShadow: `0 0 16px ${color}77`,
                        cursor: "pointer",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease"
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = `0 0 20px ${color}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = `0 0 16px ${color}77`;
                      }}
                      onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const cardCenterX = rect.left + rect.width / 2 + window.scrollX;
                        const cardY = rect.top + window.scrollY;
                        const popupRowWidth = cardWidth * 4 + cardGap * 3;
                        const vw = window.innerWidth + window.scrollX;
                        const vh = window.innerHeight + window.scrollY;
                        let startX = cardCenterX - popupRowWidth / 2;
                        if (startX < window.scrollX) startX = window.scrollX + 10;
                        if (startX + popupRowWidth > vw) startX = vw - popupRowWidth - 10;
                        let startY = cardY;
                        if (startY + 300 > vh) startY = vh - 310;
                        if (startY < window.scrollY) startY = window.scrollY + 10;
                        setClickPos({ x: startX, y: startY });
                        setSelectedReaction(rct);
                        setSelectedColor(color);
                      }}
                    >
                      <div><strong>Reaction #{idx + 1}</strong></div>
                      <div><strong>DOI:</strong> <span style={{ color: "#fff" }}>{rct.doi}</span></div>
                      <div><strong>Reaction:</strong> <span style={{ color: "#fff" }}>{rct.reaction_string}</span></div>
                      <div><strong>Target:</strong> <span style={{ color: "#fff" }}>{rct.target?.material_string}</span></div>
                      <div><strong>Precursors:</strong> <span style={{ color: "#fff" }}>{rct.precursors?.map(p => p.material_formula).join(", ")}</span></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Floating Popup Cards */}
          {selectedReaction && (
            <>
              <div
                onClick={() => setSelectedReaction(null)}
                style={{
                  position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                  background: "rgba(0,0,0,0.6)", zIndex: 1001
                }}
              />
              <DraggableCard animIndex={0} color={selectedColor} initial={{ x: clickPos.x, y: clickPos.y }} title="Summary" onClose={() => setSelectedReaction(null)}>
                <p><strong>DOI:</strong> {selectedReaction.doi}</p>
                <p><strong>Reaction:</strong> {selectedReaction.reaction_string}</p>
                <p><strong>Target:</strong> {selectedReaction.target?.material_string}</p>
                <p><strong>Precursors:</strong> {selectedReaction.precursors?.map(p => p.material_formula).join(", ")}</p>
              </DraggableCard>
              <DraggableCard animIndex={1} color={selectedColor} initial={{ x: clickPos.x + (cardWidth + cardGap), y: clickPos.y }} title="Target Details" onClose={() => setSelectedReaction(null)}>
                {renderDetails(selectedReaction.target || {}, selectedColor)}
              </DraggableCard>
              <DraggableCard animIndex={2} color={selectedColor} initial={{ x: clickPos.x + 2 * (cardWidth + cardGap), y: clickPos.y }} title="Precursors Details" onClose={() => setSelectedReaction(null)}>
                {selectedReaction.precursors?.map((prec, i) => (
                  <div key={i}>{renderDetails(prec, selectedColor)}</div>
                ))}
              </DraggableCard>
              <DraggableCard animIndex={3} color={selectedColor} initial={{ x: clickPos.x + 3 * (cardWidth + cardGap), y: clickPos.y }} title="Operations" onClose={() => setSelectedReaction(null)}>
                {selectedReaction.operations?.map((op, i) => (
                  <div key={i}>
                    <p><strong style={{ color: selectedColor }}>Step {i + 1}:</strong> {op.string}</p>
                    {renderDetails(op, selectedColor)}
                  </div>
                ))}
              </DraggableCard>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ReactionPage;