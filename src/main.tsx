import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Message could not be sent.");
      }

      setStatus("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Message could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">PORTFOLIO</p>

        <h1>Mert</h1>

        <p className="claim">
          I build practical software products that turn real-world problems
          into usable digital solutions.
        </p>

        <div className="divider" />

        <section className="contact">
          <p className="eyebrow">CONTACT</p>

          <h2>Get in touch</h2>

          <p className="contact-description">
            Have a question or want to work together? Send me a message.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                maxLength={100}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={200}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows={5}
                maxLength={5000}
                required
              />
            </label>

            <button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send message"}
            </button>
          </form>

          {status && <p className="form-status">{status}</p>}
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);