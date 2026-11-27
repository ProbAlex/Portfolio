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

const DETAILS = [
  {
    icon: "fa-solid fa-envelope",
    label: "Email",
    value: "alex.dial@outlook.com",
    href: "mailto:alex.dial@outlook.com",
  },
  {
    icon: "fa-solid fa-phone",
    label: "Phone",
    value: "+1 (347) 859-6566",
    href: "tel:+13478596566",
  },
  {
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
    value: "in/1AlexanderDial",
    href: "https://www.linkedin.com/in/1AlexanderDial",
  },
];

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
        setStatus({ text: "Message sent. I'll get back to you soon.", tone: "success" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ text: data.message || "Failed to send message. Please try again.", tone: "error" });
      }
    } catch (error) {
      setStatus({ text: "Something went wrong. Please try again later.", tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  const toneClasses = {
    info: "border-line bg-canvas text-body",
    success: "border-accent/30 bg-accent-soft text-accent-strong",
    error: "border-red-200 bg-red-50 text-red-700",
  };

  const inputClasses =
    "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-zinc-400 transition focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent/20";

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      {/* Direct contact details */}
      <div className="reveal space-y-6">
        <ul className="card divide-y divide-line">
          {DETAILS.map((detail) => {
            const external = detail.href.startsWith("http");
            return (
              <li key={detail.label}>
                <a
                  href={detail.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex min-h-[64px] items-center gap-4 px-5 py-3 transition-colors hover:bg-canvas"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <i className={detail.icon} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
                      {detail.label}
                    </span>
                    <span className="block truncate font-medium text-ink group-hover:text-accent">
                      {detail.value}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="card space-y-3 p-5">
          <div className="flex items-center gap-3 text-sm text-body">
            <i className="far fa-clock w-4 text-muted" aria-hidden="true" />
            <span>
              My time: <span className="font-mono text-ink">{time || "Loading..."}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-body">
            <i className="fas fa-calendar-check w-4 text-muted" aria-hidden="true" />
            <span>
              Available <span className="font-medium text-ink">4 PM to 9 PM EST</span>
            </span>
          </div>
          <a
            href="/Alexander_Dial_Resume_FullStack.pdf"
            download
            className="text-link text-sm"
          >
            <i className="fas fa-file-arrow-down" aria-hidden="true" />
            Download my résumé
          </a>
        </div>
      </div>

      {/* Contact form */}
      <form
        onSubmit={handleSubmit}
        className="card reveal space-y-5 p-6 md:p-8"
        style={{ "--i": 1 }}
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Send me a message</h2>
          <p className="mt-1 text-body">I&apos;ll get back to you as soon as I can.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="you@company.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
            placeholder="Hi Alex, I'd like to talk about a role on our team."
            required
          />
        </div>

        <button type="submit" disabled={submitting} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
          {submitting ? "Sending..." : "Send message"}
          {!submitting && <i className="fas fa-paper-plane text-sm" aria-hidden="true" />}
        </button>

        {status && (
          <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${toneClasses[status.tone]}`}>
            {status.text}
          </p>
        )}
      </form>
    </div>
  );
}
