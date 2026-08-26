"use client";

import { useEffect, useState } from "react";

const EST_TIME_ZONE = "America/New_York";

// Minutes to ADD to a UTC timestamp to get local time in `timeZone`, DST-aware.
function getTimeZoneOffsetMinutes(timeZone, date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );

  return (asUTC - date.getTime()) / 60000;
}

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: EST_TIME_ZONE,
      });

      // Hours to add to the visitor's local time to land on EST/EDT right now.
      // Rounded to the nearest quarter-hour: real-world UTC offsets are always
      // a multiple of 15 minutes, so this also absorbs the sub-second rounding
      // noise from formatToParts truncating milliseconds.
      const estOffsetMinutes = getTimeZoneOffsetMinutes(EST_TIME_ZONE, now);
      const localOffsetMinutes = -now.getTimezoneOffset();
      const diffHours = Math.round(((estOffsetMinutes - localOffsetMinutes) / 60) * 4) / 4;
      const sign = diffHours >= 0 ? "+" : "-";

      setTime(`${timeString} (EST ${sign}${Math.abs(diffHours)})`);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export default function ContactForm() {
  const time = useClock();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // { text, tone: 'info' | 'success' | 'error' }
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ text: "Sending message...", tone: "info" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ text: "Message sent successfully!", tone: "success" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ text: data.message || "Failed to send message. Please try again.", tone: "error" });
      }
    } catch (error) {
      setStatus({ text: "An error occurred. Please try again later.", tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  const toneClasses = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-4xl mx-auto contact-card p-8 md:p-10">
      {/* Top Section with LinkedIn, Email, Phone, and Time */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-200">
        <div className="mb-6 md:mb-0">
          <div className="contact-info-item flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <i className="fas fa-envelope text-primary"></i>
            </div>
            <a
              href="mailto:alex.dial@outlook.com"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              alex.dial@outlook.com
            </a>
          </div>
          <div className="contact-info-item flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <i className="fas fa-phone text-primary"></i>
            </div>
            <a href="tel:+13478596566" className="text-gray-700 hover:text-primary transition-colors">
              +1 (347) 859-6566
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <a
            href="https://www.linkedin.com/in/1AlexanderDial"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon mb-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center">
              <i className="fab fa-linkedin-in text-white text-xl"></i>
            </div>
          </a>

          <div className="time-display mb-2">
            <i className="far fa-clock mr-2"></i>
            <span>{time || "Loading..."}</span>
          </div>

          <div className="available-times">
            <i className="fas fa-calendar-check mr-2"></i>
            Available: 4PM - 9PM EST
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Send Me a Message</h3>
          <p className="text-gray-500">I&apos;ll get back to you as soon as possible</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-lg"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-lg"
              placeholder="Your email address"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="input-field w-full px-4 py-3 rounded-lg resize-none"
            placeholder="Hey Alex, love the website! I'd like to chat about some opportunities you might like! 🎉"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="submit-btn text-white font-medium py-3 px-8 rounded-lg disabled:opacity-60"
          >
            Send Message
          </button>
        </div>

        {status && (
          <div className="text-center">
            <p className={`py-2 px-4 rounded-lg inline-block ${toneClasses[status.tone]}`}>
              {status.text}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
