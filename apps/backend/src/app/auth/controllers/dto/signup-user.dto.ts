import { tags } from 'typia';

export class SignupUserDto {
  id!: string;

  password!: string & tags.MinLength<6>;

  nickname!: string;
}
