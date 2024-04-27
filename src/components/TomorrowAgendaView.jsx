import React from "react"
import { useIcal } from "../hooks/useIcal"

function TomorrowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const tomorrowAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtTomorrow.getDate())
    const tomorrowAgendaList = tomorrowAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center text-sm">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</span>
        </li>
    )
    return (
        <>
            {(tomorrowAgenda.length > 0) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-sans font-semibold text-lg">Tomorrow</h2>
                    <ul className="w-full divide-y divide-black overflow-y-auto">{tomorrowAgendaList}</ul>
                </div>
            ) : (
                <div/>
            )}
        </>
    )
}

export default TomorrowAgendaView