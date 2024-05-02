import TodayAgendaView from './components/TodayAgendaView.jsx'
import NextAgendaView from './components/NextAgendaView.jsx'
import TomorrowAgendaView from './components/TomorrowAgendaView.jsx'
import RowAgendaView from './components/RowAgendaView.jsx'

function App() {
  return(
    <body className="flex flex-col h-[280px] w-[480px] p-1 space-y-1">
      <div className="flex grow w-full gap-1">
        <NextAgendaView/>
      </div>
      <div className="flex grow w-full overflow-y-hidden gap-1">
        <TodayAgendaView/>
        <TomorrowAgendaView/>
        <RowAgendaView/>
      </div>
    </body>
  )
}

export default App