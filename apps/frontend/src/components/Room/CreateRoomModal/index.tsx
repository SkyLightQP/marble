import React from 'react';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
import { Modal } from '../../Modal';
import { Label } from '../../Label';
import { Input } from '../../Input';
import { Button } from '../../Button';

export interface CreateRoomForm {
  readonly name: string;
  readonly maxPeople: number;
}

interface CreateRoomModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly onCreateRoomClick: SubmitHandler<CreateRoomForm>;
  readonly form: {
    readonly register: UseFormRegister<CreateRoomForm>;
    readonly handleSubmit: UseFormHandleSubmit<CreateRoomForm>;
    readonly reset: UseFormReset<CreateRoomForm>;
  };
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  setIsOpen,
  onCreateRoomClick,
  form: { register, handleSubmit, reset }
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="방 만들기"
      width="500px"
      height="270px"
      onClose={() =>
        reset({
          name: '',
          maxPeople: 1
        })
      }
    >
      <div className="mt-6 flex flex-col">
        <div className="mb-3 flex items-center">
          <Label className="mr-2 w-14 text-center" htmlFor="roomsPage-roomName">
            방 이름
          </Label>
          <Input id="roomsPage-roomName" type="text" placeholder="방 이름" {...register('name', { required: true })} />
        </div>
        <div className="mb-3 flex items-center">
          <Label className="mr-2 w-14 text-center" htmlFor="roomsPage-maxPeople">
            최대 인원
          </Label>
          <Input
            id="roomsPage-maxPeople"
            type="number"
            min={1}
            max={4}
            placeholder="최대 인원"
            {...register('maxPeople', { required: true })}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button className="h-10 w-20" onClick={handleSubmit(onCreateRoomClick)}>
          방 만들기
        </Button>
      </div>
    </Modal>
  );
};
