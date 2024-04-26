import React from "react"
import { useIcal } from "../hooks/useIcal"
import { Card, List, ListItem } from '@tremor/react'

function RowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const rowAgenda = agenda.filter((event) => (event.startDate.toJSDate().getDate() != dtNow.getDate()) && (event.startDate.toJSDate().getDate() != dtTomorrow.getDate()))
    const rowAgendaList = rowAgenda.map((event) => 
        <ListItem key={event.uid}>
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span class="px-3 font-bold">{event.startDate.toJSDate().toLocaleDateString('en-US', {weekday: 'long'})}</span>
        </ListItem>
    )
    return (
        <Card>
            {(rowAgenda.length > 0) ? (
                <div>
                    <h2 class="font-sans font-semibold text-2xl">Later this week</h2>
                    <List>{rowAgendaList}</List>
                </div>
            ) : (
                <div/>
            )}
        </Card>
    )
}

export default RowAgendaView