import React from "react"

function TodayAgendaView({ todayAgenda, dtNow }) {
    const todayAgendaList = todayAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center">
            <span className="font-bold">{event.summary.split(/- \dx\d\d/)[0]}</span>
            {(event.startDate.toJSDate() > dtNow) ? (
                <span className="px-1 font-semibold">{event.startDate.toJSDate().toLocaleTimeString('en-GB').slice(1).replace(/(:\d{2}$)/, " ")}</span>
            ) : (
                <span className="px-1 whitespace-nowrap">On Air</span>
            )}
        </li>
    )
    return (
        <>
            {(todayAgenda.length > 0) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col grow overflow-hidden">
                    <h2 className="font-semibold text-2xl">Today</h2>
                    <ul className={`w-full divide-y divide-black overflow-y-hidden text-3xl`}>{todayAgendaList}</ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default TodayAgendaView