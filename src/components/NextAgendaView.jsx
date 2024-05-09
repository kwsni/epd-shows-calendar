import React from "react"

export function NextAgendaView({ todayAgenda, dtNow, posterUrl }) {
    const nextEvent = todayAgenda[0]
    return (
        <>
            {(todayAgenda.length > 0) ? (
                <div className="flex basis-full w-full grow gap-1">
                    <div className="border border-black rounded-lg p-1 flex flex-col grow overflow-hidden">
                        <h2 className="font-semibold text-2xl">Next</h2>
                        <ul className="w-full">
                            <li key={nextEvent.uid} className="justify-between items-end text-3xl">
                                <span className="font-bold">{nextEvent.summary.split(/- \dx\d\d/)[0]}</span>
                                {(nextEvent.startDate.toJSDate() > dtNow) ? (
                                    <span className="px-1 font-semibold">{nextEvent.startDate.toJSDate().toLocaleTimeString('en-UK').slice(1).replace(/:\d{2}$/, " ")}</span>
                                ) : (
                                    <span className="px-1 whitespace-nowrap">On Air</span>
                                )}
                            </li>
                        </ul>
                    </div>
                    <img src={posterUrl} className="h-0 min-h-full rounded-lg"/>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default NextAgendaView