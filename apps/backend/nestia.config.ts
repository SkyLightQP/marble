import { INestiaConfig } from '@nestia/sdk';

export const NESTIA_CONFIG: INestiaConfig = {
  input: ['src/app/**/controllers/*.controller.ts'],
  output: 'src/api',
  distribute: '../../packages/api'
};
export default NESTIA_CONFIG;
