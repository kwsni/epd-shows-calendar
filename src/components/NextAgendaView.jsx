import React from "react"
import poster from '../assets/poster.jpg'

export function NextAgendaView({ todayAgenda }) {
    const nextEvent = todayAgenda[0]
    return (
        <>
            {(todayAgenda.length > 0) ? (
                <div className="border border-black rounded-lg h-full p-1 flex flex-row grow divide-x divide-black overflow-hidden">
                    <div className="flex flex-col grow overflow-hidden">
                        <h2 className="font-semibold text-2xl">Next</h2>
                        <ul className="w-full divide-y divide-black overflow-y-hidden">
                            <li key={nextEvent.uid} className="w-full mb-2 flex justify-between items-center text-5xl">
                                <span className="pr-1 font-bold">{nextEvent.summary.split(/- \dx\d\d/)[0]}</span>
                                {(nextEvent.startDate.toJSDate() > dtNow) ? (
                                    <span className="pr-2 font-semibold">{nextEvent.startDate.toJSDate().toLocaleTimeString('en-UK').slice(1).replace(/:\d{2}$/, " ")}</span>
                                ) : (
                                    <span className="pr-2">Airing</span>
                                )}
                            </li>
                        </ul>
                    </div>
                    {/*<img src={poster} className="h-0 min-h-full rounded-lg"/>*/}
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default NextAgendaView