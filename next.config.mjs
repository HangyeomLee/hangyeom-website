/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/resume.pdf",
        destination: "/resume",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;