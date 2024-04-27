import React from "react"
import { useIcal } from "../hooks/useIcal"

export function TodayAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate())
    const todayAgendaList = todayAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center text-sm">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            {(event.startDate.toJSDate() > dtNow) ? (
                <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</span>
            ) : (
                <span className="px-1 font-bold">Aired</span>
            )}
        </li>
    )
    return (
        <>
            {(todayAgenda.length > 0) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-sans font-semibold">Today</h2>
                    <ul className="w-full divide-y divide-black overflow-y-auto">{todayAgendaList}</ul>
                </div>
            ) : (
                <div className="-ml-1"/>
            )}
        </>
    )
}

export default TodayAgendaView