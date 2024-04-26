import TodayAgendaView from './components/TodayAgendaView.jsx'
import TomorrowAgendaView from './components/TomorrowAgendaView.jsx'
import RowAgendaView from './components/RowAgendaView.jsx'
import { Flex } from '@tremor/react'

function App() {
  return(
    <>
      <Flex
        flexDirection="row"
        justifyContent="start"
        alignItems="stretch"
      >
        <TodayAgendaView/>
        <TomorrowAgendaView/>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="start"
        alignItems="stretch"
      >
        <RowAgendaView/>
      </Flex>
    </>
  )
}

export default App