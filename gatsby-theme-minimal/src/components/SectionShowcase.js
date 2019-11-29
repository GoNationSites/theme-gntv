import React from "react"
import optimizeImage from "../helpers/cloudinaryOptimization"
import shuffleArray from "../helpers/shuffleArray"
const SectionShowcase = ({ sectionName, items }) => {
  const sectionItems = shuffleArray(items)

  const getCardBackground = image => {
    return {
      background: `url(${optimizeImage(image, 2000)}) center center / cover`,
      // backgroundPosition: "center",
      // backgroundSize: "cover",
    }
  }

  const getCard = item => (
    <div
      className="section-item-card columns"
      style={getCardBackground(item.image)}
    >
      <div className=" section-item-card__data">
        <p>{item.name}</p>
      </div>
    </div>
  )

  const renderSectionData = () => {
    if (sectionItems.length > 4) {
      return (
        <div className="columns is-multiline section-data-wrap">
          {sectionItems.map((item, idx) => {
            if (idx < 5) {
              return (
                <div
                  key={`${item}-${idx}`}
                  className={`column  ${idx > 2 ? "is-half" : "is-one-third"}`}
                >
                  {getCard(item)}
                </div>
              )
            } else return ''
          })}
        </div>
      )
    }
    return (
      <div className="columns is-multiline section-data-wrap">
        {items.map((item, idx) => (
          <div key={`${item}-${idx}`} className="column is-half">
            {getCard(item)}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className={`section-showcase-wrap`} >
      {renderSectionData()}
      <h1 className="section-showcase-name">{sectionName}</h1>
    </div>
  )
}

export default SectionShowcase
