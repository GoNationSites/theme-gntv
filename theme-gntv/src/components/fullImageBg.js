import React from "react"
import ContentBlock from "./contentBlock"
import PhotoCaption from './photoCaption'
import optimizeImage from "../helpers/cloudinaryOptimization"
const FullImageBG = ({
  type,
  title,
  price,
  description,
  image,
  textPositioningId,
  isTypeCard,
  starts,
  ends,
  eventType,
  eventDays,
  shoutedAt,
  isTypeFlyer,
  showPrices
}) => {
  const fullImageBackground = {
    background: `url(${optimizeImage(image, 2000)}) center center / cover`,
    height: "100vh",
    width: "100%",
  }

  const getTextPositioning = () => {
    if (type !== 'photo') {
      return textPositioningId === 0 ? "positioning-left" : "positioning-right"
    } else {
      return "positioning-center positioning-bottom"
    }
  }

  const getLayoutType = () => {
    if (type === 'photo') {
      return <PhotoCaption caption={description} />
    } else if (!isTypeFlyer) {
      return <ContentBlock
        title={title}
        price={price ? price : ""}
        description={description}
        textPositioningId={Math.floor(Math.random() * Math.floor(2))}
        type={type}
        image={image}
        starts={starts}
        ends={ends}
        eventType={eventType}
        eventDays={eventDays}
        shoutedAt={shoutedAt}
        showPrices={showPrices}
      ></ContentBlock>
    } else return ''
  }

  return (
    <div
      className={`full-background-slide ${
        isTypeCard ? "card-type" : ""
        } ${getTextPositioning()} ${type === "event" ? "darken-overlay" : ""} ${isTypeFlyer ? 'flyer-mode' : ''}`}
      style={fullImageBackground}
    >
      {getLayoutType()}
    </div>
  )
}

export default FullImageBG
