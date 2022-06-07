import useSWR from "swr";
import fetcher from "./fetcher";

export interface Playlists {
  id: number;
  name: string;
  userId: number;
}
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  playlistsCount?: number;
}

export const useMe = () => {
  const { data, error } = useSWR<User>("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR<Playlists>("/playlist", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
