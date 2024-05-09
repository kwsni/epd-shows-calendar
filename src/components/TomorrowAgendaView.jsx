import React from "react"

function TomorrowAgendaView({ todayAgenda, tomorrowAgenda, availableEpisodes}) {
    const tomorrowAgendaList = tomorrowAgenda.map((event) => 
        <li key={event.uid} className="w-full my-1 flex justify-between items-top">
            <span className={`font-bold ${(todayAgenda.length < 1 && availableEpisodes.length < 1) ? 'truncate' : ''}`}>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-semibold">{event.startDate.toJSDate().toLocaleTimeString('en-UK').slice(1).replace(/:\d{2}$/, " ")}</span>
        </li>
    )
    return (
        <>
            {(tomorrowAgenda.length > 0 && availableEpisodes.length < 2) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-col overflow-hidden">
                    <h2 className="font-semibold text-2xl">Tomorrow</h2>
                    <ul className={`w-full divide-y divide-black overflow-y-hidden text-${(todayAgenda.length < 1 && availableEpisodes.length < 1) ? '2' : ''}xl`}>{tomorrowAgendaList}</ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default TomorrowAgendaView