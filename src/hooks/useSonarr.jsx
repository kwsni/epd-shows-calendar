import { useState, useEffect } from "react";

export function useSonarr() {
  const [sonarrCal, setSonarrCal] = useState([]);
  const sonarrUrl = import.meta.env.VITE_SONARR_URL;
  const apikey = import.meta.env.VITE_SONARR_API_KEY;

  const dtNow = new Date();
  const dtToday = new Date(dtNow.toDateString());
  const dtTodayJSON = dtToday.toJSON();
  const dtTomorrowJSON = new Date(
    dtToday.valueOf() + 24 * 60 * 60 * 1000,
  ).toJSON();
  const dtWeek = new Date(dtToday.valueOf() + 7 * 24 * 60 * 60 * 1000);
  const dtWeekJSON = dtWeek.toJSON();

  const fetchCal = async () => {
    const url = `${sonarrUrl}/api/v3/calendar?start=${dtTodayJSON}&end=${dtWeekJSON}&includeSeries=true&apikey=${apikey}`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  };
  useEffect(() => {
    async function getSonarrCal() {
      const sonarrCal = await fetchCal();
      const weekCal = sonarrCal.filter(
        (event) =>
          Date.parse(event["airDateUtc"]) > dtToday &&
          Date.parse(event["airDateUtc"]) < dtWeek,
      );
      setSonarrCal(weekCal);
    }
    getSonarrCal();
  }, []);
  return sonarrCal;
}
