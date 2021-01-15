import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Header from './header.js'
import PagNav from './pagnav.js'
import './normalize.css'
import './gibson/gibson.css'
import './layout.css'
import avatarImg from './avatar.jpg'
import Helmet from 'react-helmet'
import '../../static/photoset.css'

export default ({ headerText, older, newer, children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            headerLinks
            twitter
          }
        }
        sitePlugin (name:{eq:"gatsby-remark-tumble-media"}) {
          pluginOptions {
            maxWidth
          }
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___title] },
          filter:{frontmatter:{date:{eq:null}}}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `
    }
    render={data => (
    <div id="wrapper">
      <Helmet>
        <meta property="og:image" content={avatarImg} />
        <meta name="twitter:image" content={avatarImg} />
        <meta name="twitter:site" content={'@' + data.site.siteMetadata.twitter} />
      </Helmet>
      <style>{/* all the properties depending on settings */`
#content { width: ${data.sitePlugin.pluginOptions.maxWidth}px; }
#pagnav { width:${data.sitePlugin.pluginOptions.maxWidth}px; }
#header { max-width: ${data.sitePlugin.pluginOptions.maxWidth}px; }
`
      }</style>
      <Header head={data.site.siteMetadata.title}
        subhead={headerText}
        description={data.site.siteMetadata.description}
        headerLinks={data.site.siteMetadata.headerLinks.concat(
          data.allMarkdownRemark.edges.map(edge =>
            [edge.node.fields.slug, edge.node.frontmatter.slug])
        )}
        />
      <div id="content">
        {children}
      </div>
      <PagNav
        newer={newer}
        older={older} />
    </div>
    )}
  />
)
