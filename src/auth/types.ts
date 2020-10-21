import { User } from 'types/User';

export interface AuthenticationState {
  user: User;
}

export enum ItemErrorType {
  ITEMS_NOT_FOUND = 1,
  GENERIC_ERROR = 99,
}

export type AuthenticationProviderState = AuthenticationState;
