import React from 'react'
import Ticker from 'react-ticker'
import dayjs from 'dayjs'

const ShoutTicker = ({ shout }) => (
    <div className="section section-shout-ticker">

        <div className="columns is-vcentered">
            <div className="column is-2">
                <h2 className="ticker-shout is-size-4">Recent Shout</h2>
                <h2 className="is-size-6">Shouted: {dayjs(shout.date).format("MMMM dddd, HH:MM")}</h2>
            </div>


            <div className="column">
                <Ticker class>
                    {() => (
                        <>
                            <div className="spacing-div">
                                <p className='ticker-text'>{shout.text}</p>
                            </div>
                        </>
                    )}
                </Ticker>
            </div>

        </div>
    </div>
)

export default (ShoutTicker)