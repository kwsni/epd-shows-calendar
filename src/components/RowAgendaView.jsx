import React from "react"

function RowAgendaView({ todayAgenda, tomorrowAgenda, rowAgenda, availableEpisodes}) {
    const rowAgendaList = rowAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-top">
            <span className="font-bold truncate">{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-semibold">{event.startDate.toJSDate().toLocaleDateString('en-US', {weekday: 'short'})}</span>
        </li>
    )
    return (
        <>
            {(rowAgenda.length > 0 && todayAgenda.length < 1 && availableEpisodes.length < 2) ? (
                <div className="border border-black rounded-lg h-0 min-h-full p-1 flex flex-col overflow-hidden">
                    <h2 className={`font-semibold text-${(tomorrowAgenda.length > 0) ? 'sm' : 'xl'}`}>Later this week</h2>
                    <ul className={`flex flex-col divide-y divide-black overflow-y-hidden ${(tomorrowAgenda.length > 0) ? 'text-[12px]' : ''}`}>
                        {rowAgendaList}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default RowAgendaView