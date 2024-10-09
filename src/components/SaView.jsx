import React from "react";

function SaView({
  saEpisodes,
  showsAvailable,
  showsTomorrow,
  showsRow,
}) {
  const dtDay = new Date().getDay();
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  saEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const saEpisodeList = sortedEps.unique.map((event) => (
    <li key={event.uid} className="items-top flex w-full justify-between">
      <span className="overflow-hidden text-ellipsis font-bold">
        {event["series"]["title"]}
      </span>
    </li>
  ));
  return (
    <>
      {saEpisodes.length > 0 && !showsAvailable && !showsTomorrow && showsRow ? (
        <div
          className={`flex h-0 min-h-full min-w-16 flex-col rounded-lg border border-black ${6 - dtDay >= 0 ? "" : "bg-black"} p-1 order-${6 - dtDay >= 0 ? 6 - dtDay : 7 + 6 - dtDay} overflow-hidden`}
        >
          <h2
            className={`text-sm ${6 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            Sat
          </h2>
          <hr
            className={`${6 - dtDay >= 0 ? "border-black" : "border-white"} border-1 border-dotted`}
          />
          <ul
            className={`flex flex-col divide-y ${6 - dtDay >= 0 ? "divide-black" : "divide-white"} overflow-y-hidden ${6 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            {saEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SaView;
