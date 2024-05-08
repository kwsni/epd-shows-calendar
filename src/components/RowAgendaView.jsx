import React from "react"

function RowAgendaView({ todayAgenda, tomorrowAgenda, rowAgenda, availableEpisodes}) {
    const rowAgendaList = rowAgenda.map((event) => 
        <li key={event.uid} className="w-full flex justify-between items-center">
            <span>{event.summary.split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-bold">{event.startDate.toJSDate().toLocaleDateString('en-US', {weekday: 'short'})}</span>
        </li>
    )
    return (
        <>
            {(rowAgenda.length > 0 && todayAgenda < 1 && availableEpisodes < 1) ? ((tomorrowAgenda.length > 0) ? (
                <div className="border border-black rounded-lg h-0 min-h-full p-1 flex flex-col overflow-hidden">
                    <h2 className="font-semibold text-xl">Later this week</h2>
                    <ul className="flex flex-col divide-y divide-black overflow-y-hidden">{rowAgendaList}</ul>
                </div>
            ) : (
                <div className="border border-black rounded-lg h-0 min-h-full p-1 flex flex-col overflow-hidden">
                    <h2 className="font-semibold text-sm">Later this week</h2>
                    <ul className="flex flex-col divide-y divide-black overflow-y-hidden text-[12px]">{rowAgendaList}</ul>
                </div>
            )) : (
                <></>
            )}
        </>
    )
}

export default RowAgendaView