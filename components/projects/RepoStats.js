"use client";

import { useEffect, useState } from "react";

function parseRepo(url) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  return match ? { owner: match[1], repo: match[2] } : null;
}

// Stars and forks from the GitHub API. Shown only once there is something to show.
export default function RepoStats({ repo }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const parsed = parseRepo(repo);
    if (!parsed) return;
    let cancelled = false;

    fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setStats({ stars: data.stargazers_count, forks: data.forks_count });
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [repo]);

  if (!stats || (stats.stars === 0 && stats.forks === 0)) return null;

  return (
    <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted">
      {stats.stars > 0 && (
        <span title={`${stats.stars} GitHub stars`}>
          <i className="fas fa-star mr-1 text-amber-500" aria-hidden="true" />
          {stats.stars}
        </span>
      )}
      {stats.forks > 0 && (
        <span title={`${stats.forks} forks`}>
          <i className="fas fa-code-branch mr-1" aria-hidden="true" />
          {stats.forks}
        </span>
      )}
    </div>
  );
}

export { parseRepo };
