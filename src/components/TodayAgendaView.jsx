import React from "react";

function TodayAgendaView({ todayEpisodes, dtNow, showsAvailable, showsToday }) {
  const seen = new Set()
  const sortedEps = { unique: [], dupes: [] }
  todayEpisodes.forEach(
    event => { 
      seen.has(event.series.title) 
        ? sortedEps.dupes.push(event)
        : seen.add(event.series.title) && sortedEps.unique.push(event)
  });
  let posterUrl = ""
  if (showsToday) {
    posterUrl = `/api/posters/${todayEpisodes[0]["seriesId"]}`
  }
  const todayEpisodeList = sortedEps.unique.map((event) => (
    <li key={event["id"]} className="flex flex-row w-full justify-between">
      <span>
        {(event["episodeNumber"] == 1 ? "🆕" : "")}
        {(event["finaleType"] ?? "isNotFinale") == "isNotFinale"
            ? ""
            : "🏁"}
      </span>
      <span className="w-full font-bold text-left">
        {event["series"]["title"]}
      </span>
      <div className="flex flex-col px-1">
        <span className="text-xs whitespace-nowrap font-bold text-right">{event["series"]["network"]}</span>
        {new Date(event["airDateUtc"]) > dtNow ? (
          <>
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
          </>
        ) : (
          <span className="whitespace-nowrap">On Air</span>
        )}
      </div>
    </li>
  ));
  return (
    <>
      {showsToday ? (
        <div className="-order-3 flex h-full grow gap-1">
          <div className="flex grow flex-col overflow-hidden rounded-lg border border-black p-1">
            <h2 className="text-2xl">Today</h2>
            <hr className={`border-black border-1 border-dotted`}/>
            <ul
              className={`w-full divide-y divide-black overflow-y-hidden text-2xl`}
            >
              {todayEpisodeList}
            </ul>
            </div>
            {!showsAvailable && showsToday ? (
              <img src={posterUrl} className="h-0 min-h-full rounded-lg" />
            ) : (
              <></>
            )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TodayAgendaView;
