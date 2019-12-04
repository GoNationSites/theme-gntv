import React from 'react'

const PhotoCaption = ({ caption }) =>
    caption ? <div className="photo-caption-container">
        <p>{caption}</p>
    </div> : ''


export default PhotoCaption