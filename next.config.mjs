/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://localhost:5217/:path*',
        },
      ]
    },
      experimental: {
        serverActions: true,
        serverComponentsExternalPackages:["mongoose"],
      }
    }
    
    export default nextConfig;