import React from "react";

function TomorrowAgendaView({
  tomorrowEpisodes,
  showsAvailable,
  showsToday,
  showsTomorrow
}) {
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  tomorrowEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  const tomorrowEpisodeList = sortedEps.unique.map((event) => (
    <li key={event.id} className="flex flex-row w-full justify-between">
      <span>     
        {(event["episodeNumber"] == 1 ? "🆕" : "")}
        {(event["finaleType"] ?? "isNotFinale") == "isNotFinale"
            ? ""
            : "🏁"}
      </span>
      <span
        className={`w-full font-bold text-left ${!showsAvailable && !showsToday ? "" : "truncate"}`}
      >
        {event["series"]["title"]}
      </span>
      <div className={"flex flex-col px-1"}>
        <span className="text-right">
          {new Date(event["airDateUtc"])
            .toLocaleTimeString("en-GB")
            .replace(/((0)|(1|2))(\d:\d{2})(:\d{2})/, "$3$4")}
        </span>
        {sortedEps.dupes.map(dupe => (
          dupe.series.title == event.series.title && dupe.airDateUtc != event.airDateUtc
          ? <span className="text-right">
              {new Date(dupe["airDateUtc"])
                .toLocaleTimeString("en-GB")
                .replace(/((0)|(1|2))(\d:\d{2})(:\d{2})/, "$3$4")}
            </span>
          : <></>
        ))}
      </div>
    </li>
  ));
  return (
    <>
      {showsTomorrow ? (
        <div className="-order-2 flex flex-[1_0_auto] h-full flex-col overflow-hidden rounded-lg border border-black p-1">
          <h2 className="text-2xl">Tomorrow</h2>
          <hr className={`border-black border-1 border-dotted`}/>
          <ul
            className={`w-full divide-y divide-black overflow-y-hidden text-${!showsAvailable && !showsToday ? "2" : ""}xl`}
          >
            {tomorrowEpisodeList}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TomorrowAgendaView;
