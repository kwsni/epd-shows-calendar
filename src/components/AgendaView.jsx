import React from "react"
import { useIcal } from "../hooks/useIcal"
function AgendaView() {
    const agenda = useIcal([])
    const dtNow = new Date()
    const dtTomorrow = new Date(dtNow.valueOf() + 60*60*24*1000)
    const todayAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtNow.getDate())
    const tomorrowAgenda = agenda.filter((event) => event.startDate.toJSDate().getDate() == dtTomorrow.getDate())
    const rowAgenda = agenda.filter((event) => (event.startDate.toJSDate().getDate() != dtNow.getDate()) && (event.startDate.toJSDate().getDate() != dtTomorrow.getDate()))
    const todayAgendaList = todayAgenda.map((event) => 
        <tr>
            <td>{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</td>
            <td>{event.summary.split(/- \dx\d\d/)[0]}</td>
        </tr>
    )
    const tomorrowAgendaList = tomorrowAgenda.map((event) => 
        <tr>
            <td>{event.startDate.toJSDate().toLocaleTimeString('en-US').replace(/:\d{2}\s/, " ")}</td>
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
                        <h2>Today</h2>
                        <table>{todayAgendaList}</table>
                    </div>
                ) : (
                    <div/>
                )}
            </div>
            <div>
                {(tomorrowAgenda.length > 0) ? (
                    <div>
                        <h2>Tomorrow</h2>
                        <table>{tomorrowAgendaList}</table>
                    </div>
                ) : (
                    <div/>
                )}
            </div>
            <div>
                {(rowAgenda.length > 0) ? (
                    <div>
                        <h2>Later this week</h2>
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