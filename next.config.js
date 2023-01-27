// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pokemontcg.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
}