import React from "react";

function TuView({
  tuEpisodes,
  showsAvailable,
  showsTomorrow,
  showsRow,
}) {
  const dtDay = new Date().getDay();
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  tuEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const tuEpisodeList = sortedEps.unique.map((event) => (
    <li key={event.uid} className="items-top flex w-full justify-between">
      <span className="overflow-hidden text-wrap break-words font-bold">
        {event["series"]["title"]}
      </span>
    </li>
  ));
  return (
    <>
      {tuEpisodes.length > 0 && !showsAvailable && !showsTomorrow && showsRow ? (
        <div
          className={`flex h-0 min-h-full min-w-16 flex-col rounded-lg border border-black ${2 - dtDay >= 0 ? "" : "bg-black"} p-1 order-${2 - dtDay >= 0 ? 2 - dtDay : 7 + 2 - dtDay} overflow-hidden`}
        >
          <h2
            className={`text-sm ${2 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            Tue
          </h2>
          <hr
            className={`${2 - dtDay >= 0 ? "border-black" : "border-white"} border-1 border-dotted`}
          />
          <ul
            className={`flex flex-col divide-y ${2 - dtDay >= 0 ? "divide-black" : "divide-white"} overflow-y-hidden ${2 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            {tuEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TuView;
