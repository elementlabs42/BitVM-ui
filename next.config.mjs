/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
  async rewrites() {
    return [
      {
        source: "/bridge",
        destination: "/"
      }
    ]
  }
};

// monkey patch for bigint JSON.stringify
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export default nextConfig;
