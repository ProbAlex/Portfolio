"use client";

import { useState } from "react";

function ConfidenceGauge({ confidence }) {
  const [hovering, setHovering] = useState(false);

  const rotation = -90 + ((confidence - 1) / 9) * 180;
  const needleRotation = hovering ? rotation + 10 : rotation;

  let needleColor;
  if (confidence < 4) {
    needleColor = "#ef4444";
  } else if (confidence < 7) {
    needleColor = "#f59e0b";
  } else {
    needleColor = "#10b981";
  }

  return (
    <div
      className="confidence-gauge"
      title={`Confidence: ${confidence.toFixed(1)}/10`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="gauge-background" />
      <div className="gauge-center" />
      <div
        className="gauge-needle"
        style={{
          transform: `rotate(${needleRotation}deg)`,
          backgroundColor: needleColor,
          transition: "transform 0.3s ease",
        }}
      />
    </div>
  );
}

export default function SkillCard({ skill }) {
  const [frameworksOpen, setFrameworksOpen] = useState(false);
  const position = ((skill.proficiency - 1) / 9) * 100;
  const hasFrameworks = skill.frameworks && skill.frameworks.length > 0;

  return (
    <div
      className="skill-card bg-white p-5 rounded-lg shadow-lg"
      style={{ borderColor: skill.outline_color, borderWidth: "2px", borderStyle: "solid" }}
    >
      <div className="flex items-center mb-4">
        <div className="logo-circle mr-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={skill.box_image} alt={`${skill.box_title} logo`} />
        </div>
        <h4 className="text-lg font-bold">{skill.box_title}</h4>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Proficiency</p>
        <div className="proficiency-bar">
          <div className="proficiency-indicator" style={{ left: `${position}%` }} />
        </div>
        <p className="text-right text-sm mt-1">{skill.proficiency.toFixed(1)}/10</p>
      </div>

      {hasFrameworks && (
        <div className="mt-4">
          <div
            className="frameworks-header flex justify-between items-center text-gray-500 text-sm cursor-pointer p-2 rounded"
            onClick={() => setFrameworksOpen((open) => !open)}
          >
            <span>Frameworks</span>
            <i className={`fas fa-chevron-down toggle-frameworks ${frameworksOpen ? "active" : ""}`} />
          </div>

          <div className={`frameworks-list mt-2 pl-2 ${frameworksOpen ? "active" : ""}`}>
            {skill.frameworks.map((framework) => (
              <div
                key={framework.title}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div className="flex items-center">
                  <div className="framework-logo mr-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={framework.image} alt={`${framework.title} logo`} />
                  </div>
                  <span className="text-sm">{framework.title}</span>
                </div>
                <ConfidenceGauge confidence={framework.confidence} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
