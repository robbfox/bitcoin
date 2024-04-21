module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
 
plugins: [
  {
      resolve: 'gatsby-source-mongodb',
      options: {
          dbName: 'bitcoin',
          collection: 'robbcoin1',
          server: {
              // Here you change with YOUR address
              address: 'ac-2g2gfez-shard-00-01.7pneiuc.mongodb.net',
              port: 27017
          },
          auth: {
              // YOUR user, I used an default one, get creative xD
              user: 'default',
              password: 'Prettyp0lly'
          },
          extraParams: {
              ssl: true,
              authSource: 'admin',
              retryWrites: true
          }
      }
  }
]

}