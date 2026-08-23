import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">PORTFOLIO</p>
        <h1>Mert</h1>
        <p className="claim">
          I build practical software products that turn real-world problems
          into usable digital solutions.
        </p>
        <p className="status">Portfolio coming soon.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
