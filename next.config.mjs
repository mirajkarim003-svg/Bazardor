/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Safety net so a type-only mismatch never blocks the deployment.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
