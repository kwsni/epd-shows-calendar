import React from "react";

function MView({
  mEpisodes,
  showsAvailable,
  showsTomorrow,
  showsRow,
}) {
  const dtDay = new Date().getDay();
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  mEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const mEpisodeList = sortedEps.unique.map((event) => (
    <li key={event.uid} className="items-top flex w-full justify-between">
      <span className="overflow-hidden text-wrap break-words font-bold">
        {event["series"]["title"]}
      </span>
    </li>
  ));
  return (
    <>
      {mEpisodes.length > 0 && !showsAvailable && !showsTomorrow && showsRow ? (
        <div
          className={`flex h-0 min-h-full min-w-16 flex-col rounded-lg border border-black ${1 - dtDay >= 0 ? "" : "bg-black"} p-1 order-${1 - dtDay >= 0 ? 1 - dtDay : 7 + 1 - dtDay} overflow-hidden`}
        >
          <h2
            className={`text-sm ${1 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            Mon
          </h2>
          <hr
            className={`${1 - dtDay >= 0 ? "border-black" : "border-white"} border-1 border-dotted`}
          />
          <ul
            className={`flex flex-col divide-y ${1 - dtDay >= 0 ? "divide-black" : "divide-white"} overflow-y-hidden ${1 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            {mEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MView;
