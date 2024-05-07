import React from "react"
import { useIcal } from "../hooks/useIcal"

export function TodayAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate() && event.endDate.toJSDate() > dtNow)
    const todayAgendaList = todayAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center">
            <span className="font-bold">{event.summary.split(/- \dx\d\d/)[0]}</span>
            {(event.startDate.toJSDate() > dtNow) ? (
                <span className="px-1 font-semibold">{event.startDate.toJSDate().toLocaleTimeString('en-GB').slice(1).replace(/(:\d{2}$)/, " ")}</span>
            ) : (
                <span className="px-1">On Air</span>
            )}
        </li>
    )
    return (
        <>
            {(todayAgenda.length > 0) ? (
                <div className={`border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden text-[24px]/${9 - todayAgenda.length}`}>
                    <h2 className="font-sans font-semibold text-[0.9em]/6">Today</h2>
                    <ul className={`w-full divide-y divide-black overflow-y-hidden text-[${1.550 - todayAgenda.length * 0.275}em]`}>{todayAgendaList}</ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default TodayAgendaView