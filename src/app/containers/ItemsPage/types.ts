import { Item } from 'types/Item';
import { Unit } from 'types/Unit';

export interface Code {
  code: string;
}

export interface CodeResult {
  codeResult: Code[];
}

export interface ItemsFormState {
  formItem: Item;
  validated: boolean;
  loading: boolean;
  items: Item[];
  units: Unit[];
  error?: ItemErrorType | null;
  token?: string | null;
  userId?: string | null;
  scanning: boolean;
  result?: string | null;
  scanModalShow: boolean;
}

export enum ItemErrorType {
  ITEMS_NOT_FOUND = 1,
  GENERIC_ERROR = 99,
}

export type ItemsPageState = ItemsFormState;
