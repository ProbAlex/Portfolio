import Link from "next/link";
import { getProject } from "@/lib/links";

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
    <ol className="relative ml-2 border-l border-line">
      {nodes.map(([nodeName, nodeData], index) => {
        const formattedDate = `${MONTH_NAMES[nodeData.month - 1]} ${nodeData.year}`;
        const project = nodeData.project ? getProject(nodeData.project) : null;
        const isLatest = index === nodes.length - 1;

        return (
          <li key={nodeName} className="reveal relative pb-10 pl-8 last:pb-0" style={{ "--i": index }}>
            <span
              className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent ${
                isLatest ? "bg-accent" : "bg-surface"
              }`}
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{formattedDate}</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink">
              {nodeData.click_url ? (
                <a
                  href={nodeData.click_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  {nodeName}
                  <i className="fas fa-arrow-up-right-from-square text-xs text-muted" aria-hidden="true" />
                </a>
              ) : (
                nodeName
              )}
            </h2>
            {project && (
              <Link href={`/projects#${project.id}`} className="text-link text-sm">
                See the {project.box_title} project
                <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}
