/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['ktfdfxflirqkfsoqmjox.supabase.co'],
    // Supabase Storageにある画像をnext/imageで表示するための設定
  },
}

module.exports = nextConfig