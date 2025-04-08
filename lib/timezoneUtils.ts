// lib/timezone-utils.js
import {
    CountryCode,
    getAllTimezones,
    getTimezonesForCountry as getTimezones,
    Timezone,
} from 'countries-and-timezones'

export const getTimezonesForCountry = (countryCode: CountryCode) => {
    const zones = getTimezones(countryCode)
    return Object.keys(zones) // returns array of timezone strings
}

export const getAllCountriesWithTimezones = (): Array<Timezone> => {
    const timezones = getAllTimezones()

    return Object.values(timezones) as Timezone[]
}
