import { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const contactPayload = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    };

    console.log("Contact payload ready for API:", contactPayload);

    setSent(true);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSent(false);
    }, 3500);
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-badge">
          <MessageCircle size={15} />
          <span>Contact SkillBridge</span>
        </div>

        <h1>
          Let’s talk about your <span>skill exchange journey</span>
        </h1>

        <p>
          Have a question, feedback, or need help using SkillBridge? Send us a
          message and our team will get back to you as soon as possible.
        </p>
      </section>

      <section className="contact-wrapper">
        <div className="contact-info">
          <div className="contact-info-card main-info-card">
            <div className="contact-info-icon">
              <Mail size={22} />
            </div>

            <div>
              <h3>Email Support</h3>
              <p>Reach out to us anytime.</p>
              <a href="mailto:support@skillbridge.com">
                support@skillbridge.com
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Clock size={22} />
            </div>

            <div>
              <h3>Response Time</h3>
              <p>We usually reply within 24 hours.</p>
              <strong>Sunday - Thursday</strong>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <MapPin size={22} />
            </div>

            <div>
              <h3>Platform</h3>
              <p>SkillBridge is an online learning exchange platform.</p>
              <strong>Remote & Global</strong>
            </div>
          </div>

          <div className="contact-help-box">
            <HelpCircle size={24} />
            <div>
              <h3>Need quick help?</h3>
              <p>
                Check the FAQ page first. You may find answers about accounts,
                matching, sessions, and reviews.
              </p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <div className="contact-form-header">
            <h2>Send us a message</h2>
            <p>Fill out the form and we’ll respond shortly.</p>
          </div>

          {sent && (
            <div className="contact-success">
              <CheckCircle size={18} />
              <span>Your message has been sent successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-grid">
              <div className="contact-field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help?"
                required
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Write your message here..."
                required
                rows="6"
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
              />
            </div>

            <button type="submit" className="contact-submit">
              Send Message
              <Send size={17} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
