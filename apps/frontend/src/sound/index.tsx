import { Howl } from 'howler';
import { FC, PropsWithChildren } from 'react';
import { useSettingStore } from '@/stores/useSettingStore';

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

export const SoundProvider: FC<PropsWithChildren> = ({ children }) => {
  const { backgroundVolume, isBackgroundMute } = useSettingStore();

  Howler.volume(backgroundVolume);
  Howler.mute(isBackgroundMute);

  return <>{children}</>;
};
