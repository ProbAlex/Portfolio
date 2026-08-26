"use client";

import { useEffect, useState } from "react";

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  PowerShell: "#012456",
};

function textColorFor(bgColor) {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
}

export default function ProjectCard({ project }) {
  const [stats, setStats] = useState({ stars: "-", forks: "-", failed: false });
  const [languages, setLanguages] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFailed, setDownloadFailed] = useState(false);

  const hasDownload = project.github && project.releases;

  useEffect(() => {
    if (!project.github) return;
    const match = project.repo.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return;
    const [, owner, repo] = match;
    let cancelled = false;

    (async () => {
      try {
        const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          if (!cancelled) {
            setStats({ stars: repoData.stargazers_count, forks: repoData.forks_count, failed: false });
          }
        } else if (!cancelled) {
          setStats({ stars: "?", forks: "?", failed: true });
        }
      } catch {
        if (!cancelled) setStats({ stars: "?", forks: "?", failed: true });
      }

      try {
        const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
        if (languagesResponse.ok) {
          const languagesData = await languagesResponse.json();
          if (!cancelled) setLanguages(Object.keys(languagesData));
        } else if (!cancelled) {
          setLanguages([]);
        }
      } catch {
        if (!cancelled) setLanguages([]);
      }

      if (hasDownload) {
        try {
          const releasesResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/releases/latest`
          );
          if (releasesResponse.ok) {
            const releaseData = await releasesResponse.json();
            if (!cancelled && releaseData.assets && releaseData.assets.length > 0) {
              setDownloadUrl(releaseData.assets[0].browser_download_url);
            } else if (!cancelled) {
              setDownloadFailed(true);
            }
          } else if (!cancelled) {
            setDownloadFailed(true);
          }
        } catch {
          if (!cancelled) setDownloadFailed(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="project-card bg-white p-5 rounded-lg shadow-lg">
      <div className="project-header">
        <h4 className="project-title">{project.box_title}</h4>
        {project.github && (
          <div className="project-stats">
            <div className="stat-item">
              <i className="fas fa-star text-yellow-400"></i> <span>{stats.stars}</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-code-branch text-gray-500"></i> <span>{stats.forks}</span>
            </div>
          </div>
        )}
      </div>

      <p className="project-description">{project.description}</p>

      {project.github && (
        <div className="project-languages">
          {languages === null ? (
            <div className="text-sm text-gray-500">Loading languages...</div>
          ) : languages.length === 0 ? (
            <div className="text-sm text-gray-500">Languages unavailable</div>
          ) : (
            languages.map((language) => {
              const bg = LANGUAGE_COLORS[language] || "#6b7280";
              return (
                <span
                  key={language}
                  className="language-tag"
                  style={{ backgroundColor: bg, color: textColorFor(bg) }}
                >
                  #{language}
                </span>
              );
            })
          )}
        </div>
      )}

      <div className="project-buttons">
        {project.live && (
          <a
            href={project.deployment_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-live"
            style={{ width: hasDownload ? "66%" : "100%" }}
          >
            <div className="recording-icon" />
            <span>Live</span>
          </a>
        )}
        {hasDownload && (
          <a
            href={downloadUrl || "#"}
            title={downloadFailed ? "Download unavailable" : undefined}
            className={`btn-download ${downloadFailed ? "opacity-50" : ""}`}
            style={{ width: project.live ? "33%" : "100%" }}
          >
            <i className="fas fa-download"></i>
          </a>
        )}
      </div>

      {project.github && (
        <div className="mt-3">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github"
          >
            <i className="fab fa-github"></i>
            <span>View Repository</span>
          </a>
        </div>
      )}
    </div>
  );
}
