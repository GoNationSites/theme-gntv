import React, { useState } from "react"

const EventCheckbox = ({ setPoweredToolsConfig, poweredToolsConfig, event }) => {
  const handleRadioChange = event => {
    if (poweredToolsConfig.eventItems.includes(event)) {
      const modifiedEvents = poweredToolsConfig.eventItems.filter(evt => evt !== event)
      setPoweredToolsConfig({ ...poweredToolsConfig, eventItems: modifiedEvents })
    } else {
      setPoweredToolsConfig({ ...poweredToolsConfig, eventItems: [...poweredToolsConfig.eventItems, event] })
    }
  }
  return (
    <label key={event.name} className="checkbox">
      <input
        type="checkbox"
        name="contentType"
        onChange={() => handleRadioChange(event.name)}
        checked={poweredToolsConfig.eventItems.includes(event.name)}
      />
      {event.name}
    </label>
  )
}

export default EventCheckbox
