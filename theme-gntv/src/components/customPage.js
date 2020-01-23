import React from 'react'
import logo from '../images/logo.png'
const CustomPage = props => {
  return (
    <div className="list-view-wrap">
      <div className="logo-background">
        <img src={logo} alt="Logo"></img>
      </div>
      page here
      <h1>{props.data}</h1>
      {/* <div className="list-view-content-container">
        <h2 className="list-section-title is-size-1">
          {props.data[0].sectionName}
        </h2>
        <div className="list-parent">
          {props.data.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="item-block  columns is-vcentered is-paddingless is-marginless">
              <div className="list-item-content column">
                <h3>
                  <span className="list-item-name is-size-3">
                    {item.name}{' '}
                    {showPrices && item.price.length
                      ? `$ ${item.price[0].price}`
                      : ''}
                  </span>
                </h3>
                <p className="list-item-description">{item.description}</p>
                <p className="list-item-price"></p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default CustomPage
