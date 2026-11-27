// Code brackets around a leaf: developer work plus the "leafy" handle
// (leafyalex, leafyserver). Mirrors app/icon.svg.
export default function LogoMark({ inverted = false, className = "h-8 w-8", title }) {
  const tile = inverted ? "#ffffff" : "#111113";
  const brackets = inverted ? "#111113" : "#ffffff";
  const leaf = inverted ? "#1f7a54" : "#5cc497";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="16" fill={tile} />
      <path
        d="M21 19 L10 32 L21 45 M43 19 L54 32 L43 45"
        stroke={brackets}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="logo-brackets"
      />
      <path
        d="M23.5 46 C21.5 31 29 20 41 16.5 C43.5 31 36 42 23.5 46 Z"
        fill={leaf}
        className="logo-leaf"
      />
      <path
        d="M25.5 43.5 L37.5 22"
        stroke={tile}
        strokeWidth="2"
        strokeLinecap="round"
        className="logo-leaf"
      />
    </svg>
  );
}
