module.exports = {
  plugins: [
    {
      resolve: `@gonationcore/theme-gntv`,
      options: {
        gonationID: 'bzn-3hU27AHwSp_8zR1zGI3qlg',
        type: 'lite',
        listType: 'custom'
      }
    },
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`@gonationcore/theme-gntv`]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Playfair Display SC\:400,700,900`, `Oswald\:400,700`],
        display: 'swap'
      }
    }
  ]
}
