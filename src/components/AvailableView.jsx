import React from "react"
import poster from '../assets/poster.jpg'

export function AvailableView({ availableEpisodes }) {
    const availableEpisodeList = availableEpisodes.map((event) => 
        <li key={event['id']} className="w-full flex justify-between items-end">
            <span className={`font-bold`}>{event['series']['title']}</span>
            <span className="px-1 font-semibold text-3xl">S{event['seasonNumber']}E{event['episodeNumber']}</span>
        </li>
    )
    return (
        <>
            {(availableEpisodes.length > 0) ? (
                <div className="w-full flex grow gap-1">
                    <div className={`border border-black rounded-lg p-1 flex flex-col grow space-between overflow-hidden`}>
                        <h2 className="font-semibold text-2xl">Available now on PleX</h2>
                        <ul className="flex w-full divide-y divide-black overflow-y-hidden text-3xl">{availableEpisodeList}</ul>
                    </div>
                    <img src={poster} className="h-0 min-h-full rounded-lg"/>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default AvailableView