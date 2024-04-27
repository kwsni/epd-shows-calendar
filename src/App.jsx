import TodayAgendaView from './components/TodayAgendaView.jsx'
import TomorrowAgendaView from './components/TomorrowAgendaView.jsx'
import RowAgendaView from './components/RowAgendaView.jsx'

function App() {
  return(
    <body className="h-[280px] w-[480px] overflow-hidden p-1">
      <div className="flex">
        <TodayAgendaView/>
        <TomorrowAgendaView/>
      </div>
      <div className="flex">
        <RowAgendaView className="grow-0 overflow-clip"/>
      </div>
    </body>
  )
}

export default App