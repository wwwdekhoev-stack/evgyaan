export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', 'Manrope', sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* Animated background glow */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(46,125,82,0.12) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: "pulse 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Top electric line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, transparent, #2E7D52, #00c8ff, #2E7D52, transparent)",
      }} />

      {/* Main content */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        zIndex: 1,
        padding: "20px",
      }}>

        {/* Tarun Photo */}
        <img
          src="/tarun.jpg"
          alt="Tarun - EVGYAN"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "50%",
            border: "2px solid rgba(46,125,82,0.7)",
            filter: "drop-shadow(0 0 30px rgba(46,125,82,0.5))",
            animation: "float 3s ease-in-out infinite",
          }}
        />

        {/* COMING SOON - big transparent outline text */}
        <div style={{
          fontSize: "clamp(48px, 12vw, 130px)",
          fontWeight: "900",
          letterSpacing: "0.05em",
          WebkitTextStroke: "2px rgba(46,125,82,0.8)",
          color: "transparent",
          lineHeight: "1",
          textAlign: "center",
          userSelect: "none",
          textTransform: "uppercase",
          filter: "drop-shadow(0 0 20px rgba(46,125,82,0.3))",
        }}>
          COMING
          <br />
          SOON
        </div>

        {/* Divider */}
        <div style={{
          width: "80px",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #2E7D52, transparent)",
        }} />

        {/* Tagline */}
        <p style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "clamp(12px, 2vw, 15px)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          margin: 0,
          textAlign: "center",
        }}>
          Something Electric is Brewing ⚡
        </p>

        <p style={{
          color: "rgba(46,125,82,0.55)",
          fontSize: "11px",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          margin: 0,
        }}>
          EVGYAN.COM
        </p>

      </div>

      {/* Bottom electric line */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, transparent, #2E7D52, #00c8ff, #2E7D52, transparent)",
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
