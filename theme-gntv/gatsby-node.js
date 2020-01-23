exports.createPages = async ({ actions: { createPage } }, options) => {
  console.log('developer options: ', options)
  createPage({
    path: `/`,
    component: require.resolve('./src/templates/tv.js'),
    context: {
      options: options
    }
  })
}
