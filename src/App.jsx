// App.jsx
export default function App() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        background: "linear-gradient(135deg, #ff7eb3, #ff758c, #ff9a9e)",
        minHeight: "100vh",
        color: "white",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}>
        🎉 React is Working! 🎉
      </h1>
      <p style={{ fontSize: "1.5rem" }}>
        Hello from <span style={{ color: "#ffe082" }}>React</span> 🚀
      </p>
      <button
        style={{
          background: "#00e676",
          color: "#000",
          border: "none",
          padding: "15px 30px",
          borderRadius: "30px",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginTop: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
        onClick={() => alert("Priya tha poole 🎯")}
      >
        Click Me
      </button>
    </div>
  );
}
