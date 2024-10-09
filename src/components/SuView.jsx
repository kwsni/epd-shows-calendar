import React from "react";

function SuView({
  suEpisodes,
  showsAvailable,
  showsTomorrow,
  showsRow
}) {
  const dtDay = new Date().getDay();
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  suEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const suEpisodeList = sortedEps.unique.map((event) => (
    <li key={event.uid} className="items-top flex w-full justify-between">
      <span className="overflow-hidden text-wrap break-words font-bold">
        {event["series"]["title"]}
      </span>
    </li>
  ))
  return (
    <>
      {suEpisodes.length > 0 && !showsAvailable && !showsTomorrow && showsRow ? (
        <div
          className={`border border-black ${dtDay <= 0 ? "" : "bg-black"} flex h-0 min-h-full min-w-16 flex-col rounded-lg p-1 order-${dtDay <= 0 ? 0 : 7 - dtDay} overflow-hidden`}
        >
          <h2 className={`text-sm ${dtDay <= 0 ? "text-black" : "text-white"}`}>
            Sun
          </h2>
          <hr
            className={`${dtDay <= 0 ? "border-black" : "border-white"} border-1 border-dotted`}
          />
          <ul
            className={`flex flex-col divide-y ${dtDay <= 0 ? "divide-black" : "divide-white"} overflow-y-hidden ${dtDay <= 0 ? "text-black" : "text-white"}`}
          >
            {suEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SuView;
