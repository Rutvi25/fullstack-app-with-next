import useSWR from "swr";
import { Playlists, User } from "../models";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR<User>("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR<Playlists[]>("/playlist", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
