import { Action } from "easy-peasy";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  playlistsCount?: number;
}

export interface Playlists {
  id: number;
  name: string;
  userId: number;
  isLoading?: boolean;
  isError?: boolean;
}

export interface Artist {
  id: number;
  name: string;
}
export interface SongStates {
  repeat: boolean;
  playing: boolean;
  shuffle: boolean;
  index: number;
  seek: number;
}
export interface ActiveSong {
  id: number;
  artist: Artist;
  artistId: number;
  name: string;
  url: string;
  duration: number;
  createdAt?: Date;
}
export interface StoreModel {
  activeSongs: ActiveSong[];
  songStates: SongStates;
  activeSong: ActiveSong | null;
  changeActiveSongs: Action<StoreModel, ActiveSong[]>;
  changeActiveSong: Action<StoreModel, ActiveSong>;
  changePlayState: Action<StoreModel, SongStates["playing"]>;
  changeRepeat: Action<StoreModel, SongStates["repeat"]>;
  changeShuffle: Action<StoreModel, SongStates["shuffle"]>;
  prevSong: Action<StoreModel, SongStates["index"]>;
  nextSong: Action<StoreModel, SongStates["index"]>;
  setSeek: Action<StoreModel, SongStates["seek"]>;
}
