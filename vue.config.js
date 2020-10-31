module.exports = {
    pwa: {
        name: "Outsourced",
        themeColor: "#323937",
        msTileColor: '#2b5797',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        iconPaths: {
            favicon32: 'favicon-32x32.png',
            favicon16: 'favicon-16x16.png',
            appleTouchIcon: 'apple-touch-icon.png',
            maskIcon: 'safari-pinned-tab.svg',
            msTileImage: 'mstile-150x150.png'
        },
        manifestOptions: {
            background_color: "#323937",
            icons: [
                {
                  src: 'favicon-32x32.png',
                  sizes: '32x32',
                  type: 'image/png'
                },
                {
                  src: 'favicon-16x16.png',
                  sizes: '16x16',
                  type: 'image/png'
                },
                {
                  src: 'apple-touch-icon.png',
                  sizes: '152x152',
                  type: 'image/png'
                },
                {
                  src: 'safari-pinned-tab.svg',
                  sizes: '942x942',
                  type: 'image/svg+xml'
                },
                {
                  src: 'mstile150x150.png',
                  sizes: '150x150',
                  type: 'image/png'
                },
                {
                    src: 'andriod-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                src: 'andriod-chrome-384x384.png',
                sizes: '384x384',
                type: 'image/png'
                },
            ]
        }
    }
}