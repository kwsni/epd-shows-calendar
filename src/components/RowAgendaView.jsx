import React from "react"
import { useIcal } from "../hooks/useIcal"

function RowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate() && event.startDate.toJSDate() > dtNow)
    const rowAgenda = agenda.filter((event) => (event.startDate.toJSDate().getDate() != dtNow.getDate()) && (event.startDate.toJSDate().getDate() != dtTomorrow.getDate()))
    const rowAgendaList = rowAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleDateString('en-US', {weekday: 'short'})}</span>
        </li>
    ).slice(0,3)
    return (
        <>
            {(rowAgenda.length > 0 && todayAgenda < 1) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-sans font-semibold text-sm">Later this week</h2>
                    <ul className="w-full divide-y divide-black overflow-y-hidden text-[12px]">{rowAgendaList}</ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default RowAgendaView