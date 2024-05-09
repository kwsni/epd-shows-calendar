import React from "react"

export function AvailableView({ availableEpisodes, posterUrl }) {
    const availableEpisodeList = availableEpisodes.map((event) => 
        <li key={event['id']} className="w-full flex justify-between items-end">
            <span className="font-bold text-3xl text-balance">{event['series']['title']}</span>
            <span className="px-1 font-semibold text-2xl">S{event['seasonNumber']}E{event['episodeNumber']}</span>
        </li>
    )
    return (
        <>
            {(availableEpisodes.length > 0) ? (
                <div className="flex grow gap-1">
                    <div className="border border-black rounded-lg p-1 flex flex-col grow">
                        <h2 className="font-semibold text-2xl">Available now</h2>
                        <ul className="flex divide-y divide-black overflow-hidden">{availableEpisodeList}</ul>
                    </div>
                    <img src={posterUrl} className="h-0 min-h-full rounded-lg"/>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default AvailableView