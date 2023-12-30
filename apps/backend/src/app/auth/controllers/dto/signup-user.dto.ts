import { tags } from 'typia';

export class SignupUserDto {
  id!: string;

  password!: string & tags.Minimum<6>;

  nickname!: string;
}
