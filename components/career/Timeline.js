"use client";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Timeline({ data }) {
  const nodes = Object.entries(data).sort((a, b) => {
    const dateA = new Date(a[1].year, a[1].month - 1);
    const dateB = new Date(b[1].year, b[1].month - 1);
    return dateA - dateB;
  });

  return (
    <div className="relative">
      {nodes.map(([nodeName, nodeData]) => {
        const formattedDate = `${MONTH_NAMES[nodeData.month - 1]} ${nodeData.year}`;
        const hasLink = Boolean(nodeData.click_url);

        return (
          <div key={nodeName} className="timeline-item">
            <div
              className="timeline-dot"
              onClick={hasLink ? () => window.open(nodeData.click_url, "_blank") : undefined}
            >
              <div className="timeline-dot-inner" />
            </div>
            <div className="timeline-content">
              <h3
                className="timeline-title"
                onClick={hasLink ? () => window.open(nodeData.click_url, "_blank") : undefined}
              >
                {nodeName}
              </h3>
              <div className="timeline-date">{formattedDate}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
