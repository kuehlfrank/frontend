import { Item } from 'types/Item';

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
  error?: ItemErrorType | null;
  token?: string | null;
  userId?: string | null;
  scanning: boolean;
  results: CodeResult;
}

export enum ItemErrorType {
  ITEMS_NOT_FOUND = 1,
  GENERIC_ERROR = 99,
}

export type ItemsPageState = ItemsFormState;
