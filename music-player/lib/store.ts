import { createStore, action, persist, Action } from "easy-peasy";

export interface Artist {
  id: number;
  name: string;
}
interface SongStates {
  repeat: boolean;
  playing: boolean;
  shuffle: boolean;
  index: number;
  seek: number;
}
interface ActiveSong {
  id: number;
  artist: Artist;
  artistId: number;
  name: string;
  url: string;
  duration: number;
}
interface StoreModel {
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
export const store = createStore(
  persist<StoreModel>({
    activeSongs: [],
    activeSong: null,
    songStates: {
      repeat: false,
      playing: true,
      shuffle: false,
      index: 0,
      seek: 0.0,
    },
    // actions
    changeActiveSongs: action((state, payload) => {
      state.activeSongs = payload;
    }),
    changeActiveSong: action((state, payload) => {
      state.activeSong = payload;
    }),
    changePlayState: action((state, payload) => {
      state.songStates.playing = payload;
    }),
    changeRepeat: action((state) => {
      state.songStates.repeat = !state.songStates.repeat;
    }),
    changeShuffle: action((state) => {
      state.songStates.shuffle = !state.songStates.shuffle;
    }),
    prevSong: action((state, payload) => {
      state.songStates.index = payload
        ? payload - 1
        : state.activeSongs.length - 1;
    }),
    nextSong: action((state, payload) => {
      if (state.songStates.shuffle) {
        const next = Math.floor(Math.random() * state.activeSongs.length);
        state.songStates.index = (state.songStates.index + next) % 6;
      } else {
        state.songStates.index =
          payload === state.activeSongs.length - 1 ? 0 : payload + 1;
      }
    }),
    setSeek: action((state, payload) => {
      state.songStates.seek = payload;
    }),
  })
);
