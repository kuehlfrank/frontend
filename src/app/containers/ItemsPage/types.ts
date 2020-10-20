import { Item } from 'types/Item';

export interface ItemsFormState {
  formItem: Item;
  loading: boolean;
  items: Item[];
  error?: ItemErrorType | null;
}

export enum ItemErrorType {
  ITEMS_NOT_FOUND = 1,
  GENERIC_ERROR = 99,
}

export type ItemsPageState = ItemsFormState;
