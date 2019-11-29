import axios from "axios-jsonp"
import jsonAdapter from "axios-jsonp"

export function getData(id, type) {
    switch (type) {
        case ('specialEvents'):
            return axios({
                url: `https://data.prod.gonation.com/profile/events?profile_id=${id}`,
                adapter: jsonAdapter,
            }).then(res =>
                res
            )
        case ('recurringEvents'):
            return axios({
                url: `https://data.prod.gonation.com/profile/recurringevents?profile_id=${id}`,
                adapter: jsonAdapter,
            }).then(res =>
                res
            )
        case ('initialUpdateTime'):
            return axios({
                url: `https://data.prod.gonation.com/profile/newLastPricelistUpdate?profile_id=${id}`,
                adapter: jsonAdapter,
            }).then(res =>
                res
            )
        case ('menu'):
            return axios({
                url: `https://data.prod.gonation.com/pl/get?profile_id=${id}`,
                adapter: jsonAdapter,
            }).then(res =>
                res
            )
        case ('shoutTime'):
            return axios({
                url: `https://data.prod.gonation.com/profile/shoutsnew/${id}`,
                adapter: jsonAdapter,
            }).then(res =>
                res
            )
        case ('shout'):
            return axios({
                url: `https://data.prod.gonation.com/profile/shoutsnew/${id}`,
                adapter: jsonAdapter,
            }).then(res =>
                res
            )
        case ('gallery'):
            return axios({
                url: `https://data.prod.gonation.com/profile/gallery?profile_id=${id}`,
                adapter: jsonAdapter,
            }).then(res =>
                res
            )
    }

}