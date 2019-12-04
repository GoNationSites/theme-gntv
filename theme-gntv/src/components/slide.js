import React, { useState, useEffect } from "react"
import SideBySideView from "./SideBySideView"
import FullImageBG from "./fullImageBg"
import SectionShowcase from "./SectionShowcase"
import optimizeImage from "../helpers/cloudinaryOptimization"
import FullListView from "./fullListView"

// data: data object
// showcaseType: default or list
// slideStyleType: random, fullBG, Sidebyside -- Random by default

const Slide = ({ data, showcaseType, slideStyleType, type, isTypeFlyer, showPrices }) => {
  const [displayedSlide, setDisplayedSlide] = useState('')
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * Math.floor(2))
  )
  const getDataType = () => (showcaseType === "list" ? "list" : slideStyleType)
  const handleListType = () => { }

  // generate random styles. Either full background or side by side view.
  const randomlyPickSlideStyle = () => {
    if (type === 'photo' || isTypeFlyer) {
      setDisplayedSlide('fullImageBG')
    } else {
      if (randomNumber == 0) {
        setDisplayedSlide("sideBySideView")
      } else if (randomNumber == 1) {
        setDisplayedSlide("fullImageBG")
      } else {
        setDisplayedSlide("fullImageBG")
      }
    }
  }

  const handleSimpleData = () => {
    // event data can be showcased with a full background or side by side view. Events can either be of type recurring or regular. They are both similar except regular get a countdown and recurring does not.
    switch (slideStyleType) {
      case "random":
        randomlyPickSlideStyle()
        break
      case "fullImageBG":
        setDisplayedSlide("fullImageBG")
        break
      case "sideBySideView":
        setDisplayedSlide("sideBySideView")
        break
    }
  }

  // handle slides based on data type
  const handleDefaultType = () => {
    switch (type) {
      case "event":
        handleSimpleData("event")
        break
      case "item":
        handleSimpleData("item")
        break
      case "shout":
        handleSimpleData("shout")
        break
      case "section":
        setDisplayedSlide("sectionShowcase")
        break
      case "photo":
        handleSimpleData('photo')
        break
      default:
        console.error("error: unknown data type::", type)
        break
    }
  }

  // check if showcaseType is list, section, or default
  const handleStyleType = () => {
    switch (showcaseType) {
      case "list":
        getSlideStyle()
        break
      default:
        handleDefaultType()
    }
  }

  useEffect(() => {
    handleStyleType()
  }, [isTypeFlyer])

  const getSlideStyle = () => {
    if (showcaseType === "list") {
      return <FullListView data={data} />
    } else {
      // for some reason there is no photo
      switch (displayedSlide) {

        case "fullImageBG":
          return (
            <FullImageBG
              type={data.type}
              title={data.name}
              description={data.description}
              price={data.price ? data.price : ""}
              image={optimizeImage(data.image, 2000)}
              eventDays={data.days ? data.days : ""}
              starts={data.starts}
              ends={data.ends}
              eventType={data.eventType}
              textPositioningId={Math.floor(Math.random() * Math.floor(2))}
              shoutedAt={data.shoutedAt ? data.shoutedAt : ""}
              isTypeFlyer={isTypeFlyer}
              showPrices={showPrices}
            />
          )
        case "sideBySideView":
          if (data.type !== 'photo') {
            return (
              <SideBySideView
                type={data.type}
                title={data.name}
                description={data.description}
                price={data.price ? data.price : ""}
                image={optimizeImage(data.image, 2000)}
                eventDays={data.days ? data.days : ""}
                starts={data.starts}
                ends={data.ends}
                textPositioning="right"
                isTypeCard={false}
                shoutedAt={data.shoutedAt ? data.shoutedAt : ""}
                eventType={data.eventType}
                showPrices={showPrices}
              />
            )
          } else {
            return (
              <FullImageBG
                type={data.type}
                title={data.name}
                description={data.description}
                price={data.price ? data.price : ""}
                image={optimizeImage(data.image, 2000)}
                eventDays={data.days ? data.days : ""}
                starts={data.starts}
                ends={data.ends}
                eventType={data.eventType}
                textPositioningId={Math.floor(Math.random() * Math.floor(2))}
                shoutedAt={data.shoutedAt ? data.shoutedAt : ""}
                showPrices={showPrices}
              />
            )
          }

        case "sectionShowcase":
          return (
            <SectionShowcase
              items={data.items}
              sectionName={data.sectionName}
            />
          )
      }
    }
  }

  return (
    <React.Fragment>
      <div className="slide-overlay">{(showcaseType === 'list' || displayedSlide !== '') && getSlideStyle(type)}</div>
    </React.Fragment>
  )
}

export default Slide
