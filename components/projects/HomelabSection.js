import homelab from "@/data/homelab.json";

export default function HomelabSection() {
  return (
    <div className="homelab-panel bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold">{homelab.title}</h4>
          <p className="text-gray-600 mt-1">{homelab.tagline}</p>
        </div>
        <a
          href={homelab.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-live md:flex-shrink-0"
        >
          <div className="recording-icon" />
          <span>Visit leafyserver.tech</span>
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {homelab.highlights.map((item) => (
          <div key={item.title} className="homelab-item">
            <div className="flex items-center gap-2 mb-1">
              <i className={`fas ${item.icon} text-blue-500`}></i>
              <h5 className="font-semibold">{item.title}</h5>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
