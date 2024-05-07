import React from "react"
import { useSonarr } from "../hooks/useSonarr"
import poster from '../assets/poster.jpg'

export function AvailableView() {
    const todayAgenda = useSonarr([])
    const dtNow = new Date()
    const availableEpisodes = todayAgenda.filter((event) => new Date(event['airDate']).getDate() == dtNow.getDate() 
                                                                    && Date.parse(event['airDateUtc']) < dtNow && 
                                                                    JSON.parse(event['hasFile']))
    const availableEpisodeList = availableEpisodes.map((event) => 
        <li key={event['id']} className="w-full flex justify-between items-end">
            <span className={`font-bold`}>{event['series']['title'].split(/- \dx\d\d/)[0]}</span>
            <span className="px-1 font-semibold text-3xl">S{event['seasonNumber']}E{event['episodeNumber']}</span>
        </li>
    )
    return (
        <>
            {(availableEpisodes.length > 0) ? (
                <div className="h-full p-1 flex flex-row grow overflow-hidden">
                    <div className={`border border-black rounded-lg flex flex-col grow overflow-hidden text-4xl`}>
                        <h2 className="font-sans font-semibold text-3xl">Available now on PleX</h2>
                        <ul className="w-full divide-y divide-black overflow-y-hidden">{availableEpisodeList}</ul>
                    </div>
                    <img src={poster} className="m-auto pl-3 w-[20%] object-contain"/>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default AvailableView