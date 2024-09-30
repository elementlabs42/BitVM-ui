/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/bridge",
        destination: "/"
      }
    ]
  }
};

export default nextConfig;
