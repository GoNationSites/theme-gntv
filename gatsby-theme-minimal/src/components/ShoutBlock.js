import React from "react"
import dayjs from "dayjs"

const ShoutBlock = ({ description, shoutedAt }) => {
  return (
    <div className="content-block shout-block">
      <h1>Recent Shout</h1>
      <p className="shout-time">
        {dayjs(shoutedAt).format("dddd MMM DD, hh:mm A")}
      </p>
      <p className="shout-desc">{description}</p>
    </div>
  )
}

export default ShoutBlock
