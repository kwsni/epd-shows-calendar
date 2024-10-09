import React from "react";

function ThView({
  thEpisodes,
  showsAvailable,
  showsTomorrow,
  showsRow,
}) {
  const dtDay = new Date().getDay();
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  thEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const thEpisodeList = sortedEps.unique.map((event) => (
    <li key={event.uid} className="items-top flex w-full justify-between">
      <span className="overflow-hidden text-wrap break-words font-bold">
        {event["series"]["title"]}
      </span>
    </li>
  ));

  return (
    <>
      {thEpisodes.length > 0 && !showsAvailable && !showsTomorrow && showsRow ? (
        <div
          className={`flex h-0 min-h-full min-w-16 flex-col rounded-lg border border-black ${4 - dtDay >= 0 ? "" : "bg-black"} p-1 order-${4 - dtDay >= 0 ? 4 - dtDay : 7 + 4 - dtDay} overflow-hidden`}
        >
          <h2
            className={`text-sm ${4 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            Thu
          </h2>
          <hr
            className={`${4 - dtDay >= 0 ? "border-black" : "border-white"} border-1 border-dotted`}
          />
          <ul
            className={`flex flex-col divide-y ${4 - dtDay >= 0 ? "divide-black" : "divide-white"} overflow-y-hidden ${4 - dtDay >= 0 ? "text-black" : "text-white"}`}
          >
            {thEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ThView;
