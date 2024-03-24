import React from 'react';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Modal } from '@/components/Modal';
import { useRandomRoomName } from '@/hooks/useRandomRoomName';

export interface CreateRoomForm {
  readonly name: string;
  readonly maxPeople: number;
}

interface CreateRoomModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
  readonly onCreateRoomClick: SubmitHandler<CreateRoomForm>;
  readonly form: {
    readonly register: UseFormRegister<CreateRoomForm>;
    readonly handleSubmit: UseFormHandleSubmit<CreateRoomForm>;
    readonly reset: UseFormReset<CreateRoomForm>;
    readonly errors: FieldErrors<CreateRoomForm>;
  };
}

export const createRoomFormSchema = yup.object().shape({
  name: yup.string().required(),
  maxPeople: yup.number().required().min(2).max(4)
});

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  close,
  onCreateRoomClick,
  form: { register, handleSubmit, reset }
}) => {
  const name = useRandomRoomName();

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title="방 만들기"
      width="500px"
      height="250px"
      onClose={() =>
        reset({
          name,
          maxPeople: 2
        })
      }
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
          <Button className="h-10 w-20" onClick={handleSubmit(onCreateRoomClick)}>
            방 만들기
          </Button>
        </div>
      </div>
    </Modal>
  );
};
