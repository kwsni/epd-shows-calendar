import React from "react";

export function AvailableView({ availableEpisodes, showsAvailable, oneOrLessShowsAvailable }) {
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  availableEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  let posterUrl = ""
  if (showsAvailable) {
    posterUrl = `/api/posters/${availableEpisodes[0]["seriesId"]}`
  }
  const availableEpisodeList = sortedEps.unique.map((event) => (
    <li key={event["id"]} className="flex flex-row w-full justify-between">
      <span
        className={`w-full font-bold ${sortedEps.unique.length < 2 ? "text-3xl" : "text-2xl"} text-left`}
      >
        {(event["episodeNumber"] == 1 ? "🆕" : "")}
        {(event["finaleType"] ?? "isNotFinale") == "isNotFinale"
            ? ""
            : "🏁"}
        {event["series"]["title"]}
      </span>
      <div className="flex flex-col px-1">
        <span className="text-center text-2xl">
        S{event["seasonNumber"]}E{`${event["episodeNumber"]
        // Displays available episodes of series as S[]E[] (as above) or S[]E[]-[]
        }${
          // Check for multi-episode release: add dash if dupes found
          sortedEps.dupes.some(dupe => dupe.series.title == event.series.title).length < 1 ? "" : "-"
        }${
          // Find last episode to release today
          sortedEps.dupes.filter(dupe => dupe.series.title == event.series.title).reduce(
          (lastEp, curDupe) => 
            (lastEp && lastEp["episodeNumber"] > curDupe["episodeNumber"]) ? lastEp : curDupe
          , event
        )["episodeNumber"]}`}
        </span>
        
      </div>
    </li>
  ));
  return (
    <>
      {showsAvailable ? (
        <div className="flex grow gap-1">
          <div className="flex grow flex-col rounded-lg border border-black p-1">
            <h2 className="text-2xl">Available now</h2>
            <hr className={`border-black border-1 border-dotted`}/>
            <ul className="flex flex-col divide-y divide-black overflow-hidden">
              {availableEpisodeList}
            </ul>
          </div>
          <img src={posterUrl} className="h-0 min-h-full rounded-lg" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AvailableView;
