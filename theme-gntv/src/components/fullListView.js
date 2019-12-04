import React from "react"
import { graphql, StaticQuery } from 'gatsby'
import logo from "../images/logo.png"
import Img from 'gatsby-image'
const FullListView = props => {
  const defImg =
    "https://res.cloudinary.com/gonation/gonation.data.prod/default/img-itm-cover-full.png"


  return (
    <StaticQuery
      query={graphql`
        query logoQuery {
          allFile {
            edges {
              node {
                name
                childImageSharp {
                  fixed {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
    `}
      render={data => (
        <div className="list-view-wrap" >
          <div className="logo-background">
            <img src={props.logo} alt="Logo"></img>
            {/* <Img fixed={data.allFile.edges[2].node.childImageSharp.fixed} alt="name"></Img> */}
          </div>

          <div className="list-view-content-container">
            <h2 className="list-section-title is-size-1">{props.data[0].sectionName}</h2>
            <div className="list-parent">

              {props.data.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="item-block  columns is-vcentered is-paddingless is-marginless"
                >
                  <div className="column list-img-col is-paddingless is-1">
                    <img
                      className={`${
                        item.image !== defImg ? "custom-image" : "default-list-logo"
                        }`}
                      src={item.image !== defImg ? item.image : logo}
                    ></img>
                  </div>
                  <div className="list-item-content column">
                    <h3>
                      <span className="list-item-name is-size-3">
                        {item.name}{" "}
                        {item.price.length ? `$ ${item.price[0].price}` : ""}
                      </span>
                    </h3>
                    <p className="list-item-description">{item.description}</p>
                    <p className="list-item-price"></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} />
  )
}

export default FullListView
