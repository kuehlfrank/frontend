import { Unit } from './Unit';
export interface Item {
  id?: string;
  name: string;
  unit?: ?Unit;
  amount: number;
  alternative_names?: ?string[];
  imgSrc?: ?string;
}
