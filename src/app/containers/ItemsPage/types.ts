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
  scanning: boolean;
  result?: string | null;
  scanModalShow: boolean;
  itemIdToDelete?: string;
  updatedItem?: Item | null | undefined;
  showEditModal: boolean;
  ingredientNames: string[];
}

export enum ItemErrorType {
  ITEMS_NOT_FOUND = 1,
  GENERIC_ERROR = 99,
}

export type ItemsPageState = ItemsFormState;
