import { Howl } from 'howler';

Howler.volume(0.1);

export const lobbySound = new Howl({
  src: ['/assets/bgm/lobby.mp3'],
  loop: true,
  volume: 1
});

export const inGameSound = new Howl({
  src: ['/assets/bgm/ingame.mp3'],
  loop: true,
  volume: 1
});
