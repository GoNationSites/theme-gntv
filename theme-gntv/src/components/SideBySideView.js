import React from "react"
import ContentBlock from "./contentBlock"

const SideBySideView = ({
  title,
  price,
  description,
  image,
  textPositioning,
  isTypeCard,
  shoutedAt,
  type,
  eventType,
  eventDays,
  starts,
  ends,
}) => {
  return (
    <div
      className={`side-by-side-container columns is-marginless ${
        Math.floor(Math.random() * Math.floor(2)) === 0 ? "is-last" : "is-first"
        }`}
    >
      <div className={`column is-one-fourth img-col  `}>
        <div className="img-wrapper">
          <img src={image} alt={title}></img>
        </div>
      </div>

      <ContentBlock
        title={title}
        price={price}
        description={description}
        textPositioning={textPositioning}
        isTypeCard
        isSideBySide
        shoutedAt={shoutedAt}
        type={type}
        eventType={eventType}
        eventDays={eventDays}
        starts={starts}
        ends={ends}
      ></ContentBlock>
    </div>
  )
}

export default SideBySideView
