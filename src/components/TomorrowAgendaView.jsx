import React from "react"
import { useIcal } from "../hooks/useIcal"
import { Card, List, ListItem } from '@tremor/react'

function TomorrowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const tomorrowAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtTomorrow.getDate())
    const tomorrowAgendaList = tomorrowAgenda.map((event) => 
        <ListItem key={event.uid} className="p-0">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</span>
        </ListItem>
    )
    return (
        <>
            {(tomorrowAgenda.length > 0) ? (
                <Card className="p-1 m-1">
                    <h2 className="font-sans font-semibold text-lg">Tomorrow</h2>
                    <List>{tomorrowAgendaList}</List>
                </Card>
            ) : (
                <div/>
            )}
        </>
    )
}

export default TomorrowAgendaView