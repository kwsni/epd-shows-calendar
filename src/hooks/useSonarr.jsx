import { useState, useEffect } from "react"

export function useSonarr() {
    const [ sonarrCal, setSonarrCal ] = useState([])
    const sonarrUrl = import.meta.env.VITE_SONARR_URL
    const apikey = import.meta.env.VITE_API_KEY

    const dtNow = new Date()
    const dtToday = new Date(dtNow.toDateString())
    const dtTodayJSON = dtToday.toJSON()
    const oneWeekDate = new Date(dtToday.valueOf() + 7*24*60*60*1000)

    const fetchCal = async () => {
        const url = `${sonarrUrl}/api/v3/calendar?start=${dtTodayJSON}&includeSeries=true&apikey=${apikey}`;
        const response = await fetch(url, { mode: 'cors', })
        return await response.json()
    }
    useEffect(() => {
        async function getSonarrCal() {
            const sonarrCal = await fetchCal()
            const weekCal = sonarrCal.filter((event) => Date.parse(event['airDate']) > dtToday && Date.parse(event['airDate']) < oneWeekDate)
            setSonarrCal(weekCal)
        }
        getSonarrCal()
    }, [])
    return sonarrCal
}