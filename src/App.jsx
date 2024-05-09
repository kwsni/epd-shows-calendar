import AvailableView from './components/AvailableView.jsx'
import TodayAgendaView from './components/TodayAgendaView.jsx'
import NextAgendaView from './components/NextAgendaView.jsx'
import TomorrowAgendaView from './components/TomorrowAgendaView.jsx'
import RowAgendaView from './components/RowAgendaView.jsx'
import { useIcal } from './hooks/useIcal.jsx'
import { useSonarr } from './hooks/useSonarr.jsx'

function App() {
  const weekAgenda = useIcal([])
  const sonarrAgenda = useSonarr([])
  const dtNow = new Date()
  const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
  const todayAgenda = weekAgenda.filter(
    (event) => event.startDate.toJSDate().getDate() == dtNow.getDate() 
                && event.endDate.toJSDate() > dtNow)
  const tomorrowAgenda = weekAgenda.filter(
    (event) => event.startDate.toJSDate().getDate() == dtTomorrow.getDate())
  const rowAgenda = weekAgenda.filter(
    (event) => (event.startDate.toJSDate().getDate() != dtNow.getDate()) 
                && (event.startDate.toJSDate().getDate() != dtTomorrow.getDate()))
  const availableEpisodes = sonarrAgenda.filter(
    (event) => new Date(event['airDate']).getDate() == dtNow.getDate() 
                && Date.parse(event['airDateUtc']) < dtNow 
                && JSON.parse(event['hasFile']))
  let posterUrl = ''
  if(availableEpisodes.length > 0) {
    for(let media of availableEpisodes[0]['series']['images']) {
      if(media['coverType'] == 'poster') {
          posterUrl = media['remoteUrl']
      }
    }
  }
  return(
    <div className="flex flex-col h-[280px] w-[480px] p-1 gap-y-1">
      <AvailableView availableEpisodes={availableEpisodes}
                      posterUrl={posterUrl}/>
      <div className={`flex ${availableEpisodes.length > 0 ? '' : 'grow'} w-full overflow-y-scroll gap-1`}>
        <TodayAgendaView todayAgenda={todayAgenda} 
                          dtNow={dtNow}/>
        <TomorrowAgendaView todayAgenda={todayAgenda} 
                            tomorrowAgenda={tomorrowAgenda} 
                            availableEpisodes={availableEpisodes}/>
        <RowAgendaView todayAgenda={todayAgenda} 
                        tomorrowAgenda={tomorrowAgenda} 
                        rowAgenda={rowAgenda} 
                        availableEpisodes={availableEpisodes}/>
      </div>
    </div>
  )
}

export default App