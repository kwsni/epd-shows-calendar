import TodayAgendaView from './components/TodayAgendaView.jsx'
import TomorrowAgendaView from './components/TomorrowAgendaView.jsx'
import RowAgendaView from './components/RowAgendaView.jsx'
import poster from './assets/poster.jpg'

function App() {
  return(
    <body className="flex flex-col h-[280px] w-[480px] p-1 space-y-1">
      <div className="flex grow w-full space-x-1 space-y-1">
        <TodayAgendaView/>
        <TomorrowAgendaView/>
      </div>
      <div className="flex grow w-full overflow-y-hidden space-x-1 space-y-1">
          <RowAgendaView/>
          <img src={poster} className="m-auto p-1 w-1/2 object-contain"/>
      </div>
    </body>
  )
}

export default App