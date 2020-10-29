import { Unit } from './Unit';
export interface Item {
  id?: string;
  name: string;
  unit?: ?Unit;
  quantity: number;
  alternative_names?: ?string[];
  imgSrc?: ?string;
}
