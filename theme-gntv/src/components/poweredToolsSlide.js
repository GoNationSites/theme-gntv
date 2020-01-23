import React, { useState, useEffect } from 'react'
import poweredBy from '../images/poweredby.png'
import SectionToggleCheckbox from './sectionToggleCheckbox'
import ActiveTypesForm from './activeTypesForm'
import RefreshIcon from '../images/refresh.svg'
import EventCheckbox from './eventCheckbox'
import AlbumToggleCheckbox from './albumToggleCheckbox'
const PoweredToolsSlide = props => {
  const [showForm, setShowForm] = useState(false)
  const { poweredToolsConfig, setPoweredToolsConfig } = props

  const isLite = props.formRestrictions === 'lite'

  const handleDurationChange = event => {
    setPoweredToolsConfig({
      ...poweredToolsConfig,
      slideDuration: event.target.value
    })
  }

  const handleDisplayType = type => {
    setPoweredToolsConfig({ ...poweredToolsConfig, displayType: type })
  }

  const addSectionToTV = section => {
    setPoweredToolsConfig({
      ...poweredToolsConfig,
      filteredOutSections: [
        ...poweredToolsConfig.filteredOutSections,
        section.name
      ]
    })
  }

  const removeSectionFromTV = section => {
    const newArr = poweredToolsConfig.filteredOutSections.filter(
      sec => sec !== section.name
    )
    setPoweredToolsConfig({
      ...poweredToolsConfig,
      filteredOutSections: newArr
    })
  }

  const handleAdd = value => {
    setPoweredToolsConfig({
      ...poweredToolsConfig,
      activeTypes: [...poweredToolsConfig.activeTypes, value]
    })
  }

  const handleRemoval = value => {
    const newValue = poweredToolsConfig.activeTypes.filter(
      item => item !== value
    )
    setPoweredToolsConfig({ ...poweredToolsConfig, activeTypes: newValue })
  }

  const handleFMToggle = eventName => {
    if (poweredToolsConfig.flyerModeEvents.includes(eventName)) {
      const replacedArr = poweredToolsConfig.flyerModeEvents.filter(
        evt => evt !== eventName
      )
      setPoweredToolsConfig({
        ...poweredToolsConfig,
        flyerModeEvents: replacedArr
      })
    } else {
      setPoweredToolsConfig({
        ...poweredToolsConfig,
        flyerModeEvents: [...poweredToolsConfig.flyerModeEvents, eventName]
      })
    }
  }

  const toggleAlbum = album => {
    if (props.filteredOutAlbums.includes(album)) {
      const newArr = props.filteredOutAlbums.filter(abm => abm !== album)
      props.setFilteredOutAlbums(newArr)
    } else {
      props.setFilteredOutAlbums([...props.filteredOutAlbums, album])
    }
  }

  return (
    <>
      <div
        className={`powered-by-bar ${
          showForm ? 'animated slideInUp faster tools-active' : ''
        }`}>
        <p className="has-text-centered" onClick={() => setShowForm(!showForm)}>
          <img src={poweredBy}></img>
        </p>
        <div
          className={`powered-tools-form-wrap ${showForm ? '' : 'is-hidden'}`}>
          <div
            className="refresh-container"
            onClick={() => window.location.reload()}>
            <img src={RefreshIcon} alt="refresh"></img>
          </div>
          <form className="powered-tools-form">
            <h1 className="has-text-centered">GoNation TV Powered Settings</h1>

            <div className="columns is-centered form-col-container">
              <div className="column is-2 control flex-down">
                <h4>Slide Duration (Seconds)</h4>
                <label className="radio">
                  <input
                    type="radio"
                    name="duration"
                    onChange={handleDurationChange}
                    value={5000}
                    checked={poweredToolsConfig.slideDuration == 5000}
                  />
                  5
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="duration"
                    onChange={handleDurationChange}
                    value={10000}
                    checked={poweredToolsConfig.slideDuration == 10000}
                  />
                  10
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="duration"
                    value={15000}
                    onChange={handleDurationChange}
                    checked={poweredToolsConfig.slideDuration == 15000}
                  />
                  15
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="duration"
                    value={30000}
                    onChange={handleDurationChange}
                    checked={poweredToolsConfig.slideDuration == 30000}
                  />
                  30
                </label>
                {isLite ? (
                  ''
                ) : (
                  <>
                    <h4>Display Shout Ticker: </h4>
                    <label className="radio">
                      <input
                        type="checkbox"
                        name="showTicker"
                        onChange={() =>
                          setPoweredToolsConfig({
                            ...poweredToolsConfig,
                            showTicker: !poweredToolsConfig.showTicker
                          })
                        }
                        checked={poweredToolsConfig.showTicker}
                      />
                      Show The Shout Ticker
                    </label>
                  </>
                )}

                <h4>Hide Item Prices: </h4>
                <label className="radio">
                  <input
                    type="checkbox"
                    name="hidePrices"
                    onChange={() =>
                      setPoweredToolsConfig({
                        ...poweredToolsConfig,
                        showPrices: !poweredToolsConfig.showPrices
                      })
                    }
                    checked={poweredToolsConfig.showPrices}
                  />
                  Show prices
                </label>
              </div>

              {isLite ? (
                ''
              ) : (
                <ActiveTypesForm
                  handleAdd={handleAdd}
                  handleRemoval={handleRemoval}
                />
              )}

              <div className="column control full-width">
                <div className=" columns">
                  {isLite ? (
                    ''
                  ) : (
                    <div className="column is-5">
                      <h4>TV Display Type: </h4>
                      <p>
                        Single items showcase a single item/event/shout with
                        large images. List type displays all of your items you
                        have to offer.
                      </p>
                      <div className="select flex-down">
                        <label className="radio">
                          <input
                            type="radio"
                            name="isList"
                            onChange={() => handleDisplayType('default')}
                            checked={
                              poweredToolsConfig.displayType === 'default'
                            }
                          />
                          Display single items
                        </label>
                        <label className="radio">
                          <input
                            type="radio"
                            name="isList"
                            onChange={() => handleDisplayType('list')}
                            checked={poweredToolsConfig.displayType === 'list'}
                          />
                          Display List
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="flex-down control column">
                    <h4>Choose your sections to display:</h4>
                    <div className="sections-checkbox-wrap">
                      {props.listData.map((section, idx) => {
                        return (
                          <SectionToggleCheckbox
                            key={`${section}-${idx}`}
                            section={section}
                            idx={idx}
                            addSectionToTV={addSectionToTV}
                            removeSectionFromTV={removeSectionFromTV}
                          />
                        )
                      })}
                    </div>
                    {isLite ? (
                      ''
                    ) : (
                      <div className="flex-down control">
                        <h4>Choose Photo Albums to display</h4>
                        {props.albumNames.map((album, idx) => {
                          return (
                            <AlbumToggleCheckbox
                              key={`${album}-${idx}`}
                              toggleAlbum={toggleAlbum}
                              idx={idx}
                              album={album}
                            />
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-down control column evt-toggle">
                  {isLite ? (
                    ''
                  ) : (
                    <div className="events-toggle-section">
                      <p>
                        Select the event you'd like to only display. (Checking
                        Flyer Mode removes all the content and just shows the
                        image of the event)
                      </p>
                      {props.eventTypes.map((event, idx) => {
                        return (
                          <div key={`${event}-${idx}`} className="event-cols">
                            <EventCheckbox
                              event={event}
                              setPoweredToolsConfig={setPoweredToolsConfig}
                              poweredToolsConfig={poweredToolsConfig}
                            />
                            <label className="radio">
                              FM
                              <input
                                type="checkbox"
                                name="FM"
                                onChange={() => handleFMToggle(event.name)}
                              />
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PoweredToolsSlide
