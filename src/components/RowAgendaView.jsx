import React from "react"
import { useIcal } from "../hooks/useIcal"
import { Card, List, ListItem } from '@tremor/react'

function RowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const rowAgenda = agenda.filter((event) => (event.startDate.toJSDate().getDate() != dtNow.getDate()) && (event.startDate.toJSDate().getDate() != dtTomorrow.getDate()))
    const rowAgendaList = rowAgenda.map((event) => 
        <ListItem key={event.uid} className="p-0">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleDateString('en-US', {weekday: 'long'})}</span>
        </ListItem>
    )
    return (
        <>
            {(rowAgenda.length > 0) ? (
                <Card className="p-1 m-1">
                    <h2 className="font-sans font-semibold text-lg">Later this week</h2>
                    <List>{rowAgendaList}</List>
                </Card>
            ) : (
                <div/>
            )}
        </>
    )
}

export default RowAgendaView