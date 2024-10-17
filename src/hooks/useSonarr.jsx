import { useState, useEffect } from "react";

export function useSonarr() {
  const [sonarrCal, setSonarrCal] = useState([]);

  const dtNow = new Date();
  const dtToday = new Date(dtNow.toDateString());
  const dtWeek = new Date(dtToday.valueOf() + 7 * 24 * 60 * 60 * 1000);

  const fetchCal = async () => {
    const url = '/api/sonarrCal';
    const response = await fetch(url);
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
