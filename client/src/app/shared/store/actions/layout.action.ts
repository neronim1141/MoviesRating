import { Action } from '@ngrx/store';
import { type } from '../../utility';

export const LayoutActionTypes = {
  TOGGLE_SIDENAV: type('[Layout] Toggle Sidenav'),
  OPEN_SIDENAV: type('[Layout] Open Sidenav'),
  CLOSE_SIDENAV: type('[Layout] Close Sidenav')
};

/**
 * Settings Actions
 */

export class ToggleSidenav implements Action {
  type = LayoutActionTypes.TOGGLE_SIDENAV;

  constructor(public payload: boolean) {}
}
export class OpenSidenav implements Action {
  type = LayoutActionTypes.OPEN_SIDENAV;
  payload = true;
}
export class CloseSidenav implements Action {
  type = LayoutActionTypes.CLOSE_SIDENAV;
  payload = false;
}

export type LayoutActions = ToggleSidenav;
