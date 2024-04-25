import React from "react"
import { useIcal } from "../hooks/useIcal"
function AgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtToday = new Date(dtNow.toDateString())
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate())
    const tomorrowAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == (dtNow.getDate() + 1))
    const rowAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() > (dtNow.getDate() + 1))
    const todayAgendaList = todayAgenda.map((event) => 
        <tr>
            <td>{event.startDate.toJSDate().toLocaleTimeString('en-US')}</td>
            <td>{event.summary.split(/- \dx\d\d/)[0]}</td>
        </tr>
    )
    const tomorrowAgendaList = tomorrowAgenda.map((event) => 
        <tr>
            <td>{event.startDate.toJSDate().toLocaleTimeString('en-US')}</td>
            <td>{event.summary.split(/- \dx\d\d/)[0]}</td>
        </tr>
    )
    const rowAgendaList = rowAgenda.map((event) => 
        <tr>
            <td>{event.startDate.toJSDate().toLocaleDateString('en-US', {weekday: 'long'})}</td>
            <td>{event.summary.split(/- \dx\d\d/)[0]}</td>
        </tr>
    )
    return (
        <div>
            <div>
                {(todayAgenda.length > 0) ? (
                    <div>
                        <h2>Airing Today</h2>
                        <table>{todayAgendaList}</table>
                    </div>
                ) : (
                    <div/>
                )}
            </div>
            <div>
                {(tomorrowAgenda.length > 0) ? (
                    <div>
                        <h2>Airing Tomorrow</h2>
                        <table>{tomorrowAgendaList}</table>
                    </div>
                ) : (
                    <div/>
                )}
            </div>
            <div>
                {(rowAgenda.length > 0) ? (
                    <div>
                        <h2>Airing Later</h2>
                        <table>{rowAgendaList}</table>
                    </div>
                ) : (
                    <div/>
                )}
            </div>
        </div>
    )
}

export default AgendaView