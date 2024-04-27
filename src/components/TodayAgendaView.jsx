import React from "react"
import { useIcal } from "../hooks/useIcal"
import { Card, List, ListItem } from '@tremor/react'

export function TodayAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate())
    const todayAgendaList = todayAgenda.map((event) => 
        <ListItem key={event.uid} className="p-0">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            {(event.startDate.toJSDate().valueof > dtNow.valueOf) ? (
                <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</span>
            ) : (
                <span className="px-1 font-bold">Aired</span>
            )}
        </ListItem>
    )
    return (
        <>
            {(todayAgenda.length > 0) ? (
                <Card className="p-1 m-1">
                    <h2 className="font-sans font-semibold text-lg">Today</h2>
                    <List>{todayAgendaList}</List>
                </Card>
            ) : (
                <div/>
            )}
        </>
    )
}

export default TodayAgendaView