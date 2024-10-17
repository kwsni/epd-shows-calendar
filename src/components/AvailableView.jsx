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
      <span>
        {(event["episodeNumber"] == 1 ? "🆕" : "")}
        {(event["finaleType"] ?? "isNotFinale") == "isNotFinale"
            ? ""
            : "🏁"}
      </span>
      <span
        className={`w-full font-bold text-${oneOrLessShowsAvailable ? "3" : "2"}xl text-left`}
      >
        {event["series"]["title"]}
      </span>
      <div className="flex flex-col px-1">
        <span className="text-center text-2xl">
        S{event["seasonNumber"]}E{event["episodeNumber"]}
        </span>
        {sortedEps.dupes.map(dupe => (
              dupe.series.title == event.series.title
              ? <span className="text-center text-2xl">
                  S{dupe["seasonNumber"]}E{dupe["episodeNumber"]}
                </span>
              : <></>
        ))}
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
