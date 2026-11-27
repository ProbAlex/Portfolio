"use client";

import { useEffect, useState } from "react";
import { parseRepo } from "./RepoStats";

// Links to the latest release's first asset, falling back to the releases page.
export default function ReleaseDownload({ repo }) {
  const [assetUrl, setAssetUrl] = useState(null);

  useEffect(() => {
    const parsed = parseRepo(repo);
    if (!parsed) return;
    let cancelled = false;

    fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/releases/latest`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.assets?.length > 0) {
          setAssetUrl(data.assets[0].browser_download_url);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [repo]);

  return (
    <a
      href={assetUrl || `${repo}/releases/latest`}
      target={assetUrl ? undefined : "_blank"}
      rel={assetUrl ? undefined : "noopener noreferrer"}
      className="btn btn-secondary flex-1"
    >
      <i className="fas fa-download" aria-hidden="true" />
      Download
    </a>
  );
}
