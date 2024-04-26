import React from "react"
import { useIcal } from "../hooks/useIcal"
import { Card, List, ListItem } from '@tremor/react'

function TomorrowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const tomorrowAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtTomorrow.getDate())
    const tomorrowAgendaList = tomorrowAgenda.map((event) => 
        <ListItem key={event.uid}>
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span class="px-3 font-bold">{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</span>
        </ListItem>
    )
    return (
        <Card>
            {(tomorrowAgenda.length > 0) ? (
                <div>
                    <h2 class="font-sans font-semibold text-2xl">Tomorrow</h2>
                    <List>{tomorrowAgendaList}</List>
                </div>
            ) : (
                <div/>
            )}
        </Card>
    )
}

export default TomorrowAgendaView