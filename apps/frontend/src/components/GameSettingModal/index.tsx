import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Modal } from '@/components/Modal';
import { useSettingStore } from '@/stores/useSettingStore';

interface GameSettingForm {
  readonly backgroundVolume: number;
  readonly isBackgroundMute: boolean;
}

interface GameSettingModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
}

const gameSettingFormSchema = yup.object().shape({
  backgroundVolume: yup.number().required().min(0).max(0.1),
  isBackgroundMute: yup.boolean().required()
});

export const GameSettingModal: FC<GameSettingModalProps> = ({ isOpen, close }) => {
  const { backgroundVolume, isBackgroundMute, setBackgroundVolume, setBackgroundMute } = useSettingStore();
  const { register, watch, reset } = useForm<GameSettingForm>({
    defaultValues: {
      backgroundVolume: 0.1,
      isBackgroundMute: false
    },
    resolver: yupResolver(gameSettingFormSchema)
  });

  useEffect(() => {
    reset({ backgroundVolume, isBackgroundMute });
  }, [isOpen, reset, backgroundVolume, isBackgroundMute]);

  useEffect(() => {
    const subscription = watch((value) => {
      setBackgroundVolume(value.backgroundVolume ?? 0.1);
      setBackgroundMute(value.isBackgroundMute ?? false);
      Howler.volume(value.backgroundVolume ?? 0.1);
      Howler.mute(value.isBackgroundMute ?? false);
    });
    return () => subscription.unsubscribe();
  }, [watch, setBackgroundVolume, setBackgroundMute]);

  return (
    <Modal isOpen={isOpen} close={close} title="게임 설정" width="500px" height="250px">
      <div className="flex flex-col justify-between">
        <div className="mt-6 flex flex-col">
          <div className="mb-3 flex items-center">
            <Label className="mr-2 w-14 text-center text-black" htmlFor="gameSetting-background">
              배경음악
            </Label>
            <input
              className="w-40"
              id="gameSetting-background"
              type="range"
              min={0}
              max={0.1}
              step={0.01}
              {...register('backgroundVolume', { required: true })}
            />
          </div>

          <div className="mb-3 flex items-center">
            <Label className="mr-2 w-14 text-center text-black" htmlFor="gameSetting-background_mute">
              배경음악 음소거
            </Label>
            <Input
              className="w-4"
              id="gameSetting-background_mute"
              type="checkbox"
              {...register('isBackgroundMute', { required: true })}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
