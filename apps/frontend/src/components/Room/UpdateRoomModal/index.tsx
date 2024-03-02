import React, { useEffect } from 'react';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Modal } from '@/components/Modal';

export interface UpdateRoomForm {
  readonly name: string;
  readonly maxPeople: number;
}

interface UpdateRoomModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
  readonly onUpdateRoomClick: SubmitHandler<UpdateRoomForm>;
  readonly initialValues: UpdateRoomForm;
  readonly form: {
    readonly register: UseFormRegister<UpdateRoomForm>;
    readonly handleSubmit: UseFormHandleSubmit<UpdateRoomForm>;
    readonly reset: UseFormReset<UpdateRoomForm>;
  };
}

export const updateRoomFormSchema = yup.object().shape({
  name: yup.string().required(),
  maxPeople: yup.number().required().min(2).max(4)
});

export const UpdateRoomModal: React.FC<UpdateRoomModalProps> = ({
  isOpen,
  close,
  onUpdateRoomClick,
  initialValues,
  form: { register, handleSubmit, reset }
}) => {
  useEffect(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title="방 정보 수정하기"
      width="500px"
      height="250px"
      onClose={() => reset(initialValues)}
    >
      <div className="flex flex-col justify-between">
        <div className="mt-6 flex flex-col">
          <div className="mb-3 flex items-center">
            <Label className="mr-2 w-14 text-center" htmlFor="roomsPage-roomName">
              방 이름
            </Label>
            <Input
              className="w-60"
              id="roomsPage-roomName"
              type="text"
              placeholder="방 이름"
              {...register('name', { required: true })}
            />
          </div>
          <div className="mb-3 flex items-center">
            <Label className="mr-2 w-14 text-center" htmlFor="roomsPage-maxPeople">
              최대 인원 (2~4)
            </Label>
            <Input
              className="w-60"
              id="roomsPage-maxPeople"
              type="number"
              min={2}
              max={4}
              placeholder="최대 인원 (2~4)"
              {...register('maxPeople', { required: true })}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="h-10 w-20" onClick={handleSubmit(onUpdateRoomClick)}>
            수정하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};
