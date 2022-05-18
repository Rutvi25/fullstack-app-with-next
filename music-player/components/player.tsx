import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions, useStoreState } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
  // const [playing, setPlaying] = useState(true);
  const playing = useStoreState((state: any) => state.songStates.playing);
  const setPlaying = useStoreActions((state: any) => state.changePlayState);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);
  const setRepeat = useStoreActions((state: any) => state.changeRepeat);
  const repeat = useStoreState((state: any) => state.songStates.repeat);
  const setShuffle = useStoreActions((state: any) => state.changeShuffle);
  const shuffle = useStoreState((state: any) => state.songStates.shuffle);
  const index = useStoreState((state: any) => state.songStates.index);
  const prevSong = useStoreActions((state: any) => state.prevSong);
  const nextSong = useStoreActions((state: any) => state.nextSong);
  // const [index, setIndex] = useState(0);
  // const [seek, setSeek] = useState(0.0);
  const seek = useStoreState((state: any) => state.songStates.seek);
  const setSeek = useStoreActions((state: any) => state.setSeek);
  const [isSeeking, setIsSeeking] = useState(false);
  // const [repeat, setRepeat] = useState(false);
  // const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking, setSeek]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value) => {
    setPlaying(value);
  };
  // const onShuffle = () => {
  //   setShuffle((state) => !state);
  // };
  // const onRepeat = () => {
  //   setRepeat((state) => !state);
  // };
  // const prevSong = () => {
  //   setIndex((state) => {
  //     return state ? state - 1 : songs.length - 1;
  //   });
  // };
  // const nextSong = () => {
  //   setIndex((state: any) => {
  //     if (shuffle) {
  //       const next = Math.floor(Math.random() * songs.length);
  //       if (next === state) {
  //         return nextSong();
  //       }
  //       return next;
  //     }
  //     return state === songs.length - 1 ? 0 : state + 1;
  //   });
  // };
  const onEnd = () => {
    if (repeatRef.current) {
      console.log("repeat");
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      console.log("don't repeat");
      nextSong();
    }
  };
  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };
  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? "white" : "gray.600"}
            onClick={() => setShuffle()}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={() => prevSong(index)}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={() => nextSong(index)}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            color={repeat ? "white" : "gray.600"}
            onClick={() => setRepeat()}
            fontSize="24px"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>

      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              id="player-range"
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
