import { Unit } from './Unit';
export interface Item {
  name: string;
  unit?: ?Unit;
  quantity: number;
  alternative_names?: ?string[];
  imgSrc?: ?string;
}
