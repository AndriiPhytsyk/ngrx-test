import { Action } from "@ngrx/store";
import { NavigationEnd } from "@angular/router";

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
  readonly type = GO;

  constructor(public payload: {path: any[], query?: any, extras?: any}) {
  }
}

export class Back implements Action {
  readonly type = BACK;

  constructor() {
  }
}

export class Forward implements Action {
  readonly type = FORWARD;

  constructor() {
  }
}

export type Actions = Go | Back | Forward;
