/** @type {import('next').NextConfig} */
const nextConfig = {
  // Home used to live at /home behind an "Enter" screen at /. Keep old links working.
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
};

export default nextConfig;
