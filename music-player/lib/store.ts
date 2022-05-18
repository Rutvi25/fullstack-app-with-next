import { createStore, action, persist } from "easy-peasy";

export const store = createStore(
  persist({
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
    changeActiveSongs: action((state: any, payload) => {
      state.activeSongs = payload;
    }),
    changeActiveSong: action((state: any, payload) => {
      // console.log(payload);
      state.activeSong = payload;
    }),
    changePlayState: action((state: any, payload) => {
      state.songStates.playing = payload;
    }),
    changeRepeat: action((state: any) => {
      state.songStates.repeat = !state.songStates.repeat;
    }),
    changeShuffle: action((state: any) => {
      state.songStates.shuffle = !state.songStates.shuffle;
    }),
    prevSong: action((state: any, payload) => {
      state.songStates.index = payload
        ? payload - 1
        : state.activeSongs.length - 1;
    }),
    nextSong: action((state: any, payload) => {
      if (state.songStates.shuffle) {
        const next = Math.floor(Math.random() * state.activeSongs.length);
        if (next === payload) {
          return state.nextSong();
        }
        return next;
      }
      state.songStates.index =
        payload === state.activeSongs.length - 1 ? 0 : payload + 1;
    }),
    setSeek: action((state: any, payload) => {
      state.songStates.seek = payload;
    }),
  })
);
