module.exports = {
  plugins: [{ resolve: `@gonationcore/theme-gntv`, options: { gonationID: 'bzn-3hU27AHwSp_8zR1zGI3qlg' } },
  {
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
      modules: [`@gonationcore/theme-gntv`]
    }
  }],
}
