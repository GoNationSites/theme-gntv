import React, { useState } from 'react'
// import logo from '../images/logo.png'

const CustomRenderer = props => {
  const { data } = props
  console.log('my data', data)
  return (
    <div className="list-view-wrap">
      {/* <div
        className="logo-background"
        style={{ pointerEvents: 'none', zIndex: -1 }}>
        <img src={logo} alt="Logo"></img>
      </div> */}
      <section
        className={`custom-page-wrapper custom-page-wrapper__${props.pageNumber +
          1}`}>
        {data.map((node, idx) => (
          <div className={`custom-page-child custom-page-child__${idx + 1}`}>
            <h1 className="custom-page-title">{node.name}</h1>

            <div className={`custom-page-items`}>
              {node.items.map(item => (
                <div className="custom-page-item">
                  <p className={`custom-page-item__name`}>
                    {item.name}{' '}
                    <span className={`custom-page-item__price`}></span>
                    {item.price ? item.price[0].price : ''}
                  </p>
                  <p className={`custom-page-item__description`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default CustomRenderer
