import AvailableView from "./components/AvailableView.jsx";
import TodayAgendaView from "./components/TodayAgendaView.jsx";
import TomorrowAgendaView from "./components/TomorrowAgendaView.jsx";
import RowAgendaView from "./components/RowAgendaView.jsx";
import SuView from "./components/SuView.jsx";
import MView from "./components/MView.jsx";
import TuView from "./components/TuView.jsx";
import WView from "./components/WView.jsx";
import ThView from "./components/ThView.jsx";
import FView from "./components/FView.jsx";
import SaView from "./components/SaView.jsx";
import { useSonarr } from "./hooks/useSonarr.jsx";
import { useTautulli } from "./hooks/useTautulli.jsx";
import { useWindowDimensions } from "./hooks/useWindowDimensions.jsx"

function App() {
  const sonarrAgenda = useSonarr([]);
  const recentlyWatched = useTautulli([]);
  const dtNow = new Date();
  const dtTomorrow = new Date(dtNow.valueOf() + 60 * 60 * 24 * 1000);
  const availableEpisodes = sonarrAgenda.filter(
    (event) =>
      new Date(event["airDateUtc"]).getDate() == dtNow.getDate()
      && Date.parse(event["airDateUtc"]) < dtNow
      && JSON.parse(event["hasFile"]),
  ).filter(
    (event) => !recentlyWatched.some((watched) => (
      (event.series.title.toLowerCase() == watched.grandparent_title.toLowerCase())
      && (event.episodeNumber == watched.media_index)
      && (event.seasonNumber == watched.parent_media_index)
    ))
  );
  const todayEpisodes = sonarrAgenda.filter(
    (event) => (new Date(event["airDateUtc"]).getDate() == dtNow.getDate())
    && (new Date(Date.parse(event["airDateUtc"]).valueOf() + (parseInt(event["runtime"]) * 60 * 1000)) > dtNow),
  );
  const tomorrowEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDate() == dtTomorrow.getDate(),
  );
  const rowEpisodes = sonarrAgenda.filter(
    (event) => 
      new Date(event["airDateUtc"]).getDate() != dtNow.getDate()
      && new Date(event["airDateUtc"]).getDate() != dtTomorrow.getDate()
  );
  const suEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDay() == 0,
  );
  const mEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDay() == 1,
  );
  const tuEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDay() == 2,
  );
  const wEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDay() == 3,
  );
  const thEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDay() == 4,
  );
  const fEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDay() == 5,
  );
  const saEpisodes = sonarrAgenda.filter(
    (event) => new Date(event["airDateUtc"]).getDay() == 6,
  );
  
  const showsAvailable = availableEpisodes.length > 0
  const oneOrLessShowsAvailable = availableEpisodes.length < 2
  const showsToday = todayEpisodes.length > 0
  const showsOneOrLessAvailable = oneOrLessShowsAvailable && !showsToday
  const airingTomorrow = tomorrowEpisodes.length > 0
  const showsTomorrow = airingTomorrow && showsOneOrLessAvailable
  const airingRow = rowEpisodes.length > 0
  const showsRow = airingRow && showsOneOrLessAvailable

  const { width, height } = useWindowDimensions()
  const scale = Math.min(width / 480, height / 280)

  return (
    <div style={{ transform: `scale(${scale})`}} className={`${width < 480 ? 'origin-left' : ''} flex h-[280px] w-[480px] flex-col space-y-1 p-1 bg-white`}>
      <AvailableView
        availableEpisodes={availableEpisodes}
        showsAvailable={showsAvailable}
        oneOrLessShowsAvailable={oneOrLessShowsAvailable}
      />
      {(showsToday || showsTomorrow || (showsRow && !showsAvailable && !showsTomorrow)) ?
        <div className={`flex flex-row ${showsAvailable ? "" : "grow"} w-full gap-1 overflow-y-scroll`}>
          <TodayAgendaView
            todayEpisodes={todayEpisodes}
            dtNow={dtNow}
            showsAvailable={showsAvailable}
            showsToday={showsToday}
          />
          <TomorrowAgendaView
            tomorrowEpisodes={tomorrowEpisodes}
            showsAvailable={showsAvailable}
            showsToday={showsToday}
            showsTomorrow={showsTomorrow}
          />
          <RowAgendaView
            rowEpisodes={rowEpisodes}
            showsRow={showsRow}
            showsTomorrow={showsTomorrow}
          />
          <SuView
            suEpisodes={suEpisodes}
            showsAvailable={showsAvailable}
            showsTomorrow={showsTomorrow}
            showsRow={showsRow}
          />
          <MView
            mEpisodes={mEpisodes}
            showsAvailable={showsAvailable}
            showsTomorrow={showsTomorrow}
            showsRow={showsRow}
          />
          <TuView
            tuEpisodes={tuEpisodes}
            showsAvailable={showsAvailable}
            showsTomorrow={showsTomorrow}
            showsRow={showsRow}
          />
          <WView
            wEpisodes={wEpisodes}
            showsAvailable={showsAvailable}
            showsTomorrow={showsTomorrow}
            showsRow={showsRow}
          />
          <ThView
            thEpisodes={thEpisodes}
            showsAvailable={showsAvailable}
            showsTomorrow={showsTomorrow}
            showsRow={showsRow}
          />
          <FView
            fEpisodes={fEpisodes}
            showsAvailable={showsAvailable}
            showsTomorrow={showsTomorrow}
            showsRow={showsRow}
          />
          <SaView
            saEpisodes={saEpisodes}
            showsAvailable={showsAvailable}
            showsTomorrow={showsTomorrow}
            showsRow={showsRow}
          />
        </div>
        :
        <></>}
    </div>
  );
}

export default App;
