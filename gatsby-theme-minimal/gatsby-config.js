module.exports = themeOptions => {
    console.log('themeOptions!!#@: ', themeOptions)
    return {
        plugins: [
            `gatsby-plugin-sass`,
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    name: `images`,
                    path: `${__dirname}/src/images`,
                },
            },
            `gatsby-transformer-sharp`,
            `gatsby-plugin-sharp`,
        ]
    }

}
