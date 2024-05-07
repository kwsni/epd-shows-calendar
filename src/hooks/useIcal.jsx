import { useState, useEffect } from "react"
import IcalExpander from "ical-expander"

export function useIcal() {
    const [ weekAgenda, setAgenda ] = useState([])
    const sonarrUrl = import.meta.env.VITE_SONARR_URL
    const apikey = import.meta.env.VITE_API_KEY

    const fetchIcs = async () => {
        const url = `${sonarrUrl}/feed/v3/calendar/Sonarr.ics?apikey=${apikey}`;
        const response = await fetch(url)
        return await response.text()
    }
    useEffect(() => {
        async function getAgenda() {
            const sonarrIcs = await fetchIcs()
            const cal = new IcalExpander({ ics: sonarrIcs, maxIterations: 1000 })
            const dtNow = new Date()
            const dtToday = new Date(dtNow.toDateString())
            const oneWeekDate = new Date(dtToday.valueOf() + 7*24*60*60*1000)
            const weekCal = cal.between(dtToday, oneWeekDate)
            setAgenda(weekCal.events)
        }
        getAgenda()
    }, [])
    return weekAgenda
}