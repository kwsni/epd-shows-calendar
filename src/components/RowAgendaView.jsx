import React from "react";

function RowAgendaView({
  rowEpisodes,
  showsRow,
  showsTomorrow
}) {
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  rowEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const rowEpisodeList = sortedEps.unique.map((event => (
    <li key={event.uid} className="flex flex-row w-full justify-between">
      <span>
        {(event["episodeNumber"] == 1 ? "🆕" : "")}
        {(event["finaleType"] ?? "isNotFinale") == "isNotFinale"
            ? ""
            : "🏁"}
      </span>
      <span className="w-full truncate font-bold text-left">
        {event["series"]["title"]}
      </span>
      <span className="px-1">
        {new Date(event["airDateUtc"])
          .toLocaleDateString("en-GB", { weekday: "short"})}
      </span>
    </li>
  )))
  return (
    <>
      {showsRow && showsTomorrow ? (
        <div className="-order-1 flex h-0 min-h-full flex-col overflow-hidden rounded-lg border border-black p-1">
          <h2 className={`text-${showsTomorrow ? "sm" : "xl"}`}>
            Later this week
          </h2>
          <hr className={`border-black border-1 border-dotted`}/>
          <ul
            className={`flex flex-col divide-y divide-black overflow-y-hidden ${showsTomorrow ? "text-[12px]" : ""}`}
          >
            {rowEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default RowAgendaView;
