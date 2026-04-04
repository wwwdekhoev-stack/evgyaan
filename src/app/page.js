export default function Home() {
  const news = [
    {
      title: "Tata Safari EV: India's First Electric 7-Seater SUV Launching This Festive Season",
      desc: "Tata Motors gears up for the Safari EV launch — 75kWh battery, AWD option, 6 terrain modes, and a price range of ₹22.5–30 lakh. Festive season 2026 just got exciting.",
      date: "April 4, 2026",
      tag: "New Launch",
      link: "/blogs/article_5",
      img: "/blogs/safari-ev.jpg",
    },
  ];

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

      {/* EV News Section */}
      <div style={{
        width: "100%",
        maxWidth: "900px",
        padding: "0 20px 60px",
        zIndex: 1,
      }}>
        {/* Section Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(46,125,82,0.25)",
          paddingBottom: "12px",
        }}>
          <span style={{ fontSize: "18px" }}>⚡</span>
          <h2 style={{
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "700",
            margin: 0,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>EV News</h2>
          <span style={{
            marginLeft: "auto",
            color: "rgba(46,125,82,0.6)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>By EVGYAN Team</span>
        </div>

        {/* News Cards */}
        {news.map((item, i) => (
          <a key={i} href={item.link} style={{
            display: "flex",
            gap: "16px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(46,125,82,0.2)",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "12px",
            textDecoration: "none",
            transition: "border-color 0.2s",
          }}
          >
            <img src={item.img} alt={item.title} style={{
              width: "120px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "6px",
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <span style={{
                background: "rgba(46,125,82,0.2)",
                color: "#2E7D52",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "8px",
              }}>{item.tag}</span>
              <h3 style={{
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 6px",
                lineHeight: "1.4",
              }}>{item.title}</h3>
              <p style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "12px",
                margin: "0 0 8px",
                lineHeight: "1.5",
              }}>{item.desc}</p>
              <span style={{
                color: "rgba(46,125,82,0.6)",
                fontSize: "11px",
              }}>{item.date}</span>
            </div>
          </a>
        ))}
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
