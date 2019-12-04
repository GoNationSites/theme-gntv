import React, { useState } from "react"

const AlbumToggleCheckbox = ({
    album,
    idx,
    toggleAlbum
}) => {
    const [isChecked, setIsChecked] = useState(true)

    const handleAlbumToggle = album => {
        isChecked ? setIsChecked(false) : setIsChecked(true)
        // if the section is checked, it must be included, therefore we must make sure it's NOT in the set filter array. If the section is not checked, it must not be included, meaning we add it to the setFilterArray
        if (!isChecked) {
            toggleAlbum(album)
        } else {
            toggleAlbum(album)
        }
    }
    return (
        <label key={`${album}-${idx}`} className="checkbox">
            <input
                type="checkbox"
                name="contentType"
                onChange={() => handleAlbumToggle(album)}
                checked={isChecked}
            />
            {album}
        </label>
    )
}

export default AlbumToggleCheckbox
