import React from "react";

function WView({
  wEpisodes,
  showsAvailable,
  showsTomorrow,
  showsRow,
}) {
  const dtDay = new Date().getDay();
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  wEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const wEpisodeList = sortedEps.unique.map((event) => (
    <li key={event.uid} className="items-top flex w-full justify-between">
      <span className="overflow-hidden text-ellipsis font-bold">
        {event["series"]["title"]}
      </span>
    </li>
  ));
  return (
    <>
      {wEpisodes.length > 0 && !showsAvailable && !showsTomorrow && showsRow ? (
        <div
          className={`flex h-0 min-h-full min-w-16 flex-col rounded-lg border border-black ${3 - dtDay >= 0 ? "" : "bg-black"} p-1 order-${3 - dtDay >= 0 ? 3 - dtDay : 7 + 3 - dtDay} overflow-hidden`}
        >
          <h2
            className={`text-sm ${3 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            Wed
          </h2>
          <hr
            className={`${3 - dtDay >= 0 ? "border-black" : "border-white"} border-1 border-dotted`}
          />
          <ul
            className={`flex flex-col divide-y ${3 - dtDay >= 0 ? "divide-black" : "divide-white"} overflow-y-hidden ${3 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            {wEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default WView;
