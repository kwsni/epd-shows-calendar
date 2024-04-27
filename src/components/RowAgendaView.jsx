import React from "react"
import { useIcal } from "../hooks/useIcal"

function RowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const rowAgenda = agenda.filter((event) => (event.startDate.toJSDate().getDate() != dtNow.getDate()) && (event.startDate.toJSDate().getDate() != dtTomorrow.getDate()))
    const rowAgendaList = rowAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center text-sm">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleDateString('en-US', {weekday: 'long'})}</span>
        </li>
    )
    return (
        <>
            {(rowAgenda.length > 0) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-sans font-semibold">Later this week</h2>
                    <ul className="w-full divide-y divide-black overflow-y-auto">{rowAgendaList}</ul>
                </div>
            ) : (
                <div/>
            )}
        </>
    )
}

export default RowAgendaView