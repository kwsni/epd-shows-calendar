import React from "react"
import { useIcal } from "../hooks/useIcal"

function TomorrowAgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate() && event.startDate.toJSDate() > dtNow)
    const tomorrowAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtTomorrow.getDate())
    const tomorrowAgendaList = tomorrowAgenda.map((event) => 
        <li key={event.uid} className="w-full my-1 flex justify-between items-center">
            <span className="font-bold">{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-semibold">{event.startDate.toJSDate().toLocaleTimeString('en-UK').slice(1).replace(/:\d{2}$/, " ")}</span>
        </li>
    ).slice(0,3)
    return (
        <>
            {(tomorrowAgenda.length > 0) ? ((todayAgenda < 1) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-sans font-semibold text-3xl">Tomorrow</h2>
                    <ul className={`w-full divide-y divide-black overflow-y-hidden text-4xl`}>{tomorrowAgendaList}</ul>
                </div>
            ) : (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-sans font-semibold text-3xl">Tomorrow</h2>
                    <ul className="w-full divide-y divide-black overflow-y-hidden text-xl">{tomorrowAgendaList}</ul>
                </div>
            )
            ) : (
                <></>
            )}
        </>
    )
}

export default TomorrowAgendaView