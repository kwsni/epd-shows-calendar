import React from "react"
import { useIcal } from "../hooks/useIcal"
import { Card, List, ListItem, Flex } from '@tremor/react'

export function TodayAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate())
    const todayAgendaList = todayAgenda.map((event) => 
        <ListItem key={event.uid}>
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span class="px-3 font-bold">{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</span>
        </ListItem>
    )
    return (
        <Card>
            {(todayAgenda.length > 0) ? (
                <div>
                    <h3 class="font-sans font-semibold text-2xl">Today</h3>
                    <List>{todayAgendaList}</List>
                </div>
            ) : (
                <div/>
            )}
        </Card>
    )
}

export default TodayAgendaView