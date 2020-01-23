import React, { useState, useEffect } from 'react'
import axios from 'axios-jsonp'
import jsonAdapter from 'axios-jsonp'
import { getData } from '../helpers/apicalls'
import { Carousel } from 'react-responsive-carousel'
import Layout from '../components/layout'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Slide from '../components/slide'
import slugify from '../helpers/slugify'
import ShoutTicker from '../components/shoutTicker'
import PoweredToolsSlide from '../components/poweredToolsSlide'

const TV = ({ pageContext }) => {
  const gonationID = process.env.GATSBY_GONATIONID
  const { options } = pageContext
  console.log(options.type)

  // State where initial requests and data are stored
  const [menuData, setMenuData] = useState({})
  const [eventData, setEventData] = useState({})
  const [recurringData, setRecurringEventData] = useState({})
  const [photoData, setPhotoData] = useState([])
  const [shoutData, setShoutData] = useState({})
  const [initialUpdateTime, setInitialUpdateTime] = useState('')
  const [lastUpdateTime, setLastUpdateTime] = useState('')
  const [shoutTime, setShoutTime] = useState('')
  const [initialShoutTime, setInitialShoutTime] = useState('')

  // State where formatted data that's ready to be used is stored
  const [formattedMenu, setFormattedMenu] = useState([])
  const [formattedRecurringEvents, setFormattedRecurringEvents] = useState([])
  const [formattedEventData, setFormattedEventData] = useState([])
  const [formattedPhotos, setFormattedPhotos] = useState([])
  const [formattedShoutData, setFormattedShoutData] = useState([])
  const [sectionData, setSectionData] = useState([])

  // State for the powered tools
  // todo refactor all powered tools settings inside of a single object
  const [albumNames, setAlbumNames] = useState([])
  const [filteredOutAlbums, setFilteredOutAlbums] = useState([])

  const isLite = options.type === 'lite'

  const CONFIG = {
    slideDuration: 15000,
    showTicker: false,
    showPrices: true,
    activeTypes: isLite ? ['item'] : ['item', 'event', 'shout', 'photo'],
    displayType: isLite ? 'list' : 'default',
    filteredOutSections: [],
    eventItems: [],
    flyerModeEvents: [],
    albumNames: []
  }
  const [poweredToolsConfig, setPoweredToolsConfig] = useState(CONFIG)

  //Where ALL the slide data is stored before it is served for <Carousel />
  const [slideData, setSlideData] = useState([])

  // isLoading keeps track of when the data is ready to be served for <Carousel />
  const [isLoading, setIsLoading] = useState(true)

  // USEEFFECT: Make requests when page loads
  useEffect(() => {
    // get initial update time
    getData(gonationID, 'initialUpdateTime').then(res => {
      setInitialUpdateTime(res.data.pricelistLastUpdated)
      setLastUpdateTime(res.data.pricelistLastUpdated)
    })
    // get special events
    getData(gonationID, 'specialEvents').then(res => {
      setEventData(res.data.events)
    })
    // get recurring events
    getData(gonationID, 'recurringEvents').then(res => {
      setRecurringEventData(res.data.events)
    })
    // get last shout time
    getData(gonationID, 'shoutTime').then(res => {
      setInitialShoutTime(res.data.shout.updatedAt)
      setShoutTime(res.data.shout.updatedAt)
    })
    // get menu data
    getData(gonationID, 'menu').then(res => {
      setMenuData(res.data)
    })
    // get shout data
    getData(gonationID, 'shout').then(res => {
      setShoutData(res.data)
    })
    // get gallery data
    getData(gonationID, 'gallery').then(res => {
      setPhotoData(
        res.data.filter(el => el._id.includes('abm') && el.name !== 'Shouts')
      )
    })

    // Check for new menu update every 10 seconds
    const menuInterval = setInterval(() => {
      axios({
        url: `https://data.prod.gonation.com/profile/newLastPricelistUpdate?profile_id=${gonationID}`,
        adapter: jsonAdapter
      }).then(res => {
        setLastUpdateTime(res.data.pricelistLastUpdated)
      })
    }, 10000)

    // Check for new shout update every 10 seconds
    const shoutInterval = setInterval(() => {
      axios({
        url: `https://data.prod.gonation.com/profile/shoutsnew/${gonationID}`,
        adapter: jsonAdapter
      }).then(res => {
        setShoutTime(res.data.shout.updatedAt)
      })
    }, 10000)
  }, [])

  // USEEFFECT: if last update time of menu changes, make a request to the menu data
  useEffect(() => {
    if (
      lastUpdateTime !== '' &&
      initialUpdateTime !== '' &&
      lastUpdateTime !== initialUpdateTime
    ) {
      getData(gonationID, 'menu').then(res => setMenuData(res))
    }
  }, [lastUpdateTime, initialUpdateTime])

  // USEEFFECT: if last update time of shout changes, then make new request to shout
  useEffect(() => {
    if (
      shoutTime !== '' &&
      initialShoutTime !== '' &&
      shoutTime !== initialShoutTime
    ) {
      getData(gonationID, 'shout').then(res => {
        setShoutData(res.data)
      })
    }
  }, [shoutTime, initialShoutTime])

  const formattedMenuDataArr = []
  const buildSection = element => {
    if (element.inventory) {
      element.inventory.forEach(item => {
        if (!item.section) {
          formattedMenuDataArr.push({
            type: 'item',
            name: item.item.name,
            description: item.item.desc,
            sectionName: element.section.name,
            image: item.item.imageUrl,
            price: item.item.variants.length > 0 ? item.item.variants : ''
          })
        } else {
          buildSection(item)
        }
      })
    } else {
      formattedMenuDataArr.push({
        type: 'item',
        name: element.item.name,
        description: element.item.desc,
        sectionName: element.section ? element.section.name : '',
        image: element.item.imageUrl,
        price: element.item.variants.length > 0 ? element.item.variants : ''
      })
    }
  }

  // This code creates an object of section objects. Used for the section showcase component
  // !This can and will most likely be moved to a different component
  // todo this is a very long function, break it up.
  const sortedSections = []

  const buildSortedSectionData = data => {
    data.forEach((item, itmID) => {
      let sectionExists = true
      // For the first time through, we automatically populate the array
      if (sortedSections.length === 0) {
        sortedSections.push({
          type: 'section',
          name: item.sectionName,
          items: [
            {
              name: item.name,
              description: item.desc,
              price: item.variants,
              image: item.image
            }
          ]
        })
      } else {
        sortedSections.forEach((section, secID) => {
          if (slugify(item.sectionName) === slugify(section.name)) {
            sectionExists = true
            section.items.push({
              name: item.name,
              description: item.desc,
              price: item.variants,
              image: item.image
            })
          } else {
            sectionExists = false
          }
        })
        if (!sectionExists) {
          sortedSections.push({
            type: 'section',
            name: item.sectionName,
            items: [
              {
                name: item.name,
                description: item.desc,
                price: item.variants,
                image: item.image
              }
            ]
          })
        }
      }
    })
    const limitedResults = sortedSections.filter(
      section => section.items.length >= 4
    )
    setSectionData(sortedSections)
  }

  // Helps format the menu
  const runMenu = () => {
    //Theres only 1 powered list id here unlike beef barl
    menuData.forEach(poweredList => {
      poweredList.inventory.forEach(element => {
        buildSection(element)
      })
    })

    buildSortedSectionData(formattedMenuDataArr)
    setFormattedMenu(formattedMenuDataArr)
  }

  // Formats the recurring event data
  const eventArr = []
  const formatRecurringData = () => {
    recurringData.forEach(event => {
      eventArr.push({
        type: 'event',
        eventType: 'recurring',
        name: event.name,
        description: event.description,
        image: event.imageurl,
        days: event.eventDays,
        tags: event.eventTags,
        starts: event.starts,
        ends: event.ends
      })
    })
    setFormattedRecurringEvents(eventArr)
  }

  const formatEventData = () => {
    const formattedEvents = []
    eventData.forEach(event => {
      formattedEvents.push({
        type: 'event',
        eventType: 'regular',
        name: event.name,
        description: event.description,
        image: event.imageurl,
        tags: event.eventTags,
        starts: event.starts,
        ends: event.ends
      })
    })
    setFormattedEventData(formattedEvents)
  }

  const formatShoutData = () => {
    const formattedShout = []
    formattedShout.push({
      type: 'shout',
      description: shoutData.shout.text,
      name: 'Recent Shout',
      shoutedAt: shoutData.shout.updatedAt,
      image: `${shoutData.imageBaseUrl}/${shoutData.shout.image.image.cloudinaryId}`
    })
    setFormattedShoutData(formattedShout)
  }

  // This effect formats the data the way we need it for the slide component

  // const allData = sectionData
  // const mapped = formattedMenu.map(function(el, i) {
  //   return { index: i, value: el.sectionName.toLowerCase() }
  // })
  const sortFormattedMenu = () =>
    formattedMenu.sort((a, b) => {
      if (a.sectionName > b.sectionName) {
        return 1
      }
      if (a.sectionName < b.sectionName) {
        return -1
      }
      return 0
    })

  // handles pagination of list view.
  // @params perPage = amount of items per page
  // @params items = all items  * ideally sorted *
  const paginatedItems = (perPage, items) => {
    const paginatedItemsArr = []
    let tmpArr = []

    items.forEach((itm, idx) => {
      if (idx === 0) {
        tmpArr.push(itm)
      } else {
        if (
          items[idx - 1].sectionName === itm.sectionName &&
          tmpArr.length < perPage
        ) {
          tmpArr.push(itm)
        } else {
          paginatedItemsArr.push(tmpArr)
          tmpArr = []
          tmpArr.push(itm)
        }
      }
    })
    paginatedItemsArr.push(tmpArr)
    return paginatedItemsArr
  }

  const formatPhotoData = () => {
    const arr = []
    photoData.forEach(album => {
      album.photos.forEach(photo => {
        arr.push({
          type: 'photo',
          name: '',
          description: photo.caption,
          albumName: album.name,
          image: photo.imageUrl
        })
      })
    })
    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }
    const uniqueAlbums = photoData.filter(unique).map(album => album.name)
    setAlbumNames(uniqueAlbums)
    setFormattedPhotos(arr)
  }

  useEffect(() => {
    if (
      (poweredToolsConfig.activeTypes.includes('item') ||
        poweredToolsConfig.activeTypes.includes('section')) &&
      menuData.length
    ) {
      runMenu()
    }
    if (
      poweredToolsConfig.activeTypes.includes('event') &&
      recurringData.length
    ) {
      formatRecurringData()
    }
    if (poweredToolsConfig.activeTypes.includes('event') && eventData.length) {
      formatEventData()
    }
    if (
      shoutData.hasOwnProperty('shout') &&
      poweredToolsConfig.activeTypes.includes('shout')
    ) {
      formatShoutData()
    }
    if (photoData.length) {
      formatPhotoData()
    }
  }, [
    menuData,
    recurringData,
    eventData,
    shoutData,
    poweredToolsConfig.displayType,
    poweredToolsConfig.activeTypes,
    photoData
  ])

  const shuffleData = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  useEffect(() => {
    // if (menuData.length && recurringData.length && eventData && shoutData && photoData) {
    setIsLoading(false)
    // }
    if (!isLoading) {
      if (poweredToolsConfig.displayType !== 'list') {
        setSlideData(
          shuffleData(
            formattedMenu

              // .concat(sectionData)
              .concat(formattedEventData)
              .concat(formattedShoutData)
              .concat(formattedRecurringEvents)
              .concat(formattedPhotos)
          )
        )
      } else {
        // If list view, we just need to worry about the menu data
        setSlideData(formattedMenu)
      }
    }
  }, [
    isLoading,
    menuData,
    recurringData,
    shoutData,
    poweredToolsConfig.displayType,
    poweredToolsConfig.activeTypes,
    formattedPhotos
  ])

  // USEEFFECT: we reRender when active types array changes
  useEffect(() => {
    if (poweredToolsConfig.activeTypes) {
      handleRender()
    }
  }, [poweredToolsConfig.activeTypes])

  const handleFiltering = allSlideData => {
    if (poweredToolsConfig.eventItems.length) {
      return allSlideData.filter(slide =>
        poweredToolsConfig.eventItems.includes(slide.name)
      )
    } else {
      return allSlideData.filter(
        item =>
          item.image !==
            'https://res.cloudinary.com/gonation/gonation.data.prod/default/img-itm-cover-full.png' &&
          !poweredToolsConfig.filteredOutSections.includes(item.sectionName) &&
          poweredToolsConfig.activeTypes.includes(item.type) &&
          !filteredOutAlbums.includes(item.albumName)
      )
    }
  }

  const handleRender = () => {
    switch (poweredToolsConfig.displayType) {
      case 'default':
        return handleFiltering(slideData).map((item, idx) => {
          return (
            <Slide
              key={`${item}-${idx}`}
              slideStyleType={
                item.type === 'photo' ||
                poweredToolsConfig.flyerModeEvents.includes(item.name)
                  ? 'fullImageBG'
                  : 'random'
              }
              showcaseType={'default'}
              data={item}
              type={item.type}
              isTypeFlyer={poweredToolsConfig.flyerModeEvents.includes(
                item.name
              )}
              showPrices={poweredToolsConfig.showPrices}
            />
          )
        })
        break
      case 'list':
        if (options.listType === 'custom') {
          return paginatedItems(
            99,
            sortFormattedMenu().filter(
              pile =>
                !poweredToolsConfig.filteredOutSections.includes(
                  pile.sectionName
                )
            )
          ).map((pile, idx) => {
            console.log('the pile is: ', pile)
            return (
              <Slide
                key={`${pile}-${idx}`}
                slideStyleType={'sideBySideView'}
                showcaseType="list"
                data={pile}
                showPrices={poweredToolsConfig.showPrices}
              />
            )
          })
        } else {
          return paginatedItems(
            10,
            sortFormattedMenu().filter(
              pile =>
                !poweredToolsConfig.filteredOutSections.includes(
                  pile.sectionName
                )
            )
          ).map((pile, idx) => (
            <Slide
              key={`${pile}-${idx}`}
              slideStyleType={'sideBySideView'}
              showcaseType="list"
              data={pile}
              showPrices={poweredToolsConfig.showPrices}
            />
          ))
        }

        break
      case 'both':

      default:
    }
  }

  const getEventTypes = () => slideData.filter(item => item.type === 'event')

  return (
    <Layout>
      <PoweredToolsSlide
        formRestrictions={options.type}
        listData={sectionData}
        eventTypes={getEventTypes()}
        albumNames={albumNames}
        setFilteredOutAlbums={setFilteredOutAlbums}
        filteredOutAlbums={filteredOutAlbums}
        poweredToolsConfig={poweredToolsConfig}
        setPoweredToolsConfig={setPoweredToolsConfig}
      />
      {slideData.length > 1 ? (
        <Carousel
          showThumbs={false}
          useKeyboardArrows={true}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          transitionTime={poweredToolsConfig.displayType === 'list' ? 0 : 0}
          interval={poweredToolsConfig.slideDuration}
          stopOnHover={false}
          infiniteLoop
          autoPlay={poweredToolsConfig.eventItems.length === 1 ? false : true}
          emulateTouch={true}>
          {!isLoading && handleRender()}
        </Carousel>
      ) : (
        ''
      )}

      {shoutData.shout && poweredToolsConfig.showTicker ? (
        <ShoutTicker shout={shoutData.shout} />
      ) : (
        ''
      )}
    </Layout>
  )
}

export default TV
