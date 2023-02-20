/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_ADDRESS: "localhost",
    SERVER_PORT: "8080",
  },
};

module.exports = nextConfig;
