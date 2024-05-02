import React from "react"
import { useIcal } from "../hooks/useIcal"

export function TodayAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate() && event.startDate.toJSDate() > dtNow).slice(1)
    const todayAgendaList = todayAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center">
            <span className="font-bold text-xl">{event.summary.split(/- \dx\d\d/)[0]}</span>
            {(event.startDate.toJSDate() > dtNow) ? (
                <span className="px-1 font-semibold">{event.startDate.toJSDate().toLocaleTimeString('en-GB').slice(1).replace(/(:\d{2}$)/, " ")}</span>
            ) : (
                <span className="px-1">Aired</span>
            )}
        </li>
    )
    return (
        <>
            {(todayAgenda.length > 0) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-sans text-semibold text-2xl">Later today</h2>
                    <ul className="w-full divide-y divide-black overflow-y-hidden">{todayAgendaList}</ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default TodayAgendaView