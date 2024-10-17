import { useState, useEffect } from "react";

export function useTautulli() {
  const [watched, setWatched] = useState([]);

  const fetchWatched = async () => {
    const url = '/api/tautulliWatched';
    const response = await fetch(url);
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
