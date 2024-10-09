import { useState, useEffect } from "react";

export function useTautulli() {
  const [watched, setWatched] = useState([]);
  const tautulliUrl = import.meta.env.VITE_TAUTULLI_URL;
  const apikey = import.meta.env.VITE_TAUTULLI_API_KEY;

  const dtNow = new Date();
  const dtToday = new Date(dtNow.toDateString());
  const dtTodayJSON = dtToday.toJSON().split('T')[0];

  const fetchWatched = async () => {
    const url = `${tautulliUrl}/api/v2/?apikey=${apikey}&cmd=get_history&section_id=2&after=${dtTodayJSON}`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  };
  useEffect(() => {
    async function getWatched() {
      const watched = await fetchWatched();
      setWatched(watched.response.data.data);
    }
    getWatched();
  }, []);
  return watched;
}
